// Sentence embeddings in the browser: all-MiniLM-L6-v2 (int8 ONNX) run with ONNX Runtime Web.
// Everything is served from this site. Nothing is sent anywhere, and there are no API keys or costs.
//
// Files (see assets/ml/NOTICE for sources and licences):
//   ort/ort.wasm.bundle.min.mjs, ort/ort-wasm-simd-threaded.wasm   ONNX Runtime Web 1.31.1 (MIT)
//   minilm/model.onnx, minilm/vocab.txt                           all-MiniLM-L6-v2, int8 (Apache-2.0)
//
// The tokenizer below reproduces Hugging Face's BertNormalizer (lowercase, strip accents, clean text,
// split Chinese characters), BertPreTokenizer and WordPiece, so the model sees the same token ids it
// was trained with. It was checked against Hugging Face's tokenizers library on a test corpus.

const BASE = new URL('.', import.meta.url).href;
const MAX_TOKENS = 256;            // the model's maximum sequence length
const MAX_CHARS_PER_WORD = 100;    // longer "words" become [UNK], as in WordPiece
const CLS = 101, SEP = 102, UNK = 100;

// ── Tokenizer ────────────────────────────────────────────────────────
const isWhitespace = c => c === ' ' || c === '\t' || c === '\n' || c === '\r' || /\p{Zs}/u.test(c);
const isControl = c => !(c === '\t' || c === '\n' || c === '\r') && /[\p{Cc}\p{Cf}]/u.test(c);
const isPunct = c => {
  const cp = c.codePointAt(0);
  return (cp >= 33 && cp <= 47) || (cp >= 58 && cp <= 64) || (cp >= 91 && cp <= 96) || (cp >= 123 && cp <= 126) || /\p{P}/u.test(c);
};
const isChinese = cp =>
  (cp >= 0x4E00 && cp <= 0x9FFF) || (cp >= 0x3400 && cp <= 0x4DBF) || (cp >= 0x20000 && cp <= 0x2A6DF) ||
  (cp >= 0x2A700 && cp <= 0x2B73F) || (cp >= 0x2B740 && cp <= 0x2B81F) || (cp >= 0x2B820 && cp <= 0x2CEAF) ||
  (cp >= 0xF900 && cp <= 0xFAFF) || (cp >= 0x2F800 && cp <= 0x2FA1F);

function normalize(text) {
  let out = '';
  for (const c of text) {
    const cp = c.codePointAt(0);
    if (cp === 0 || cp === 0xFFFD || isControl(c)) continue;
    if (isWhitespace(c)) { out += ' '; continue; }
    out += isChinese(cp) ? ` ${c} ` : c;
  }
  return out.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '');
}

function preTokenize(text) {
  const words = [];
  let cur = '';
  for (const c of text) {
    if (isWhitespace(c)) { if (cur) words.push(cur); cur = ''; }
    else if (isPunct(c)) { if (cur) words.push(cur); words.push(c); cur = ''; }
    else cur += c;
  }
  if (cur) words.push(cur);
  return words;
}

export function makeTokenizer(vocabText) {
  const vocab = new Map();
  vocabText.split('\n').forEach((w, i) => { if (w !== '' || i === 0) vocab.set(w.replace(/\r$/, ''), i); });
  function wordPiece(word) {
    const chars = Array.from(word);
    if (chars.length > MAX_CHARS_PER_WORD) return [UNK];
    const ids = [];
    let start = 0;
    while (start < chars.length) {
      let end = chars.length, found = -1;
      while (start < end) {
        let piece = chars.slice(start, end).join('');
        if (start > 0) piece = '##' + piece;
        if (vocab.has(piece)) { found = vocab.get(piece); break; }
        end--;
      }
      if (found < 0) return [UNK];
      ids.push(found);
      start = end;
    }
    return ids;
  }
  return function encode(text) {
    const ids = [CLS];
    for (const w of preTokenize(normalize(String(text)))) ids.push(...wordPiece(w));
    if (ids.length > MAX_TOKENS - 1) ids.length = MAX_TOKENS - 1;
    ids.push(SEP);
    return ids;
  };
}

// ── Model ────────────────────────────────────────────────────────────
let ready = null;

// Loads once; later calls reuse it. Rejects if the browser can't run it.
export function load() {
  if (!ready) {
    ready = (async () => {
      const ort = await import(BASE + 'ort/ort.wasm.bundle.min.mjs');
      // Point only at the engine file: the bundle carries its own loader, so nothing else is fetched
      ort.env.wasm.wasmPaths = { wasm: BASE + 'ort/ort-wasm-simd-threaded.wasm' };
      ort.env.wasm.numThreads = 1;   // GitHub Pages can't enable cross-origin isolation, so one thread
      const [vocabText, session] = await Promise.all([
        fetch(BASE + 'minilm/vocab.txt').then(r => { if (!r.ok) throw new Error('vocab'); return r.text(); }),
        ort.InferenceSession.create(BASE + 'minilm/model.onnx', { executionProviders: ['wasm'] })
      ]);
      return { ort, session, encode: makeTokenizer(vocabText) };
    })();
    ready.catch(() => { ready = null; });   // allow a retry later
  }
  return ready;
}

// Mean of the token vectors (ignoring padding), scaled to length 1: how sentence-transformers pools this model
export async function embed(texts) {
  const { ort, session, encode } = await load();
  const out = [];
  for (const text of texts) {
    const ids = encode(text), n = ids.length;
    const big = a => BigInt64Array.from(a, x => BigInt(x));
    const feeds = {
      input_ids: new ort.Tensor('int64', big(ids), [1, n]),
      attention_mask: new ort.Tensor('int64', big(ids.map(() => 1)), [1, n]),
      token_type_ids: new ort.Tensor('int64', big(ids.map(() => 0)), [1, n])
    };
    const res = await session.run(feeds);
    const h = res.last_hidden_state.data, d = 384;
    const v = new Float32Array(d);
    for (let t = 0; t < n; t++) for (let j = 0; j < d; j++) v[j] += h[t * d + j];
    let norm = 0;
    for (let j = 0; j < d; j++) { v[j] /= n; norm += v[j] * v[j]; }
    norm = Math.sqrt(norm) || 1;
    out.push(Array.from(v, x => x / norm));
  }
  return out;
}
