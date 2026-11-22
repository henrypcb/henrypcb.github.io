Most questions in product and growth are causal at heart: did this change make that happen? This guide covers ten ways to answer them, from simple experiments to methods for when an experiment isn’t possible.

Each method has a diagram of how it works, a plain-English explanation, when it fits, and the assumptions it rests on. If you’re not sure which one you need, the [Causal method finder](/projects/causal-method-finder) asks a few questions and points you to one.

---

### Experiments: when you can choose who gets it

## A/B test

Randomly split people into groups that see different versions, and compare their outcomes.

```figure
type: method
key: ab
```

**In plain terms.** Think of a fair coin deciding who tries a new recipe. Because chance alone splits people, the two groups are alike in every other way, so any difference in how things turn out comes from the change.

**When it fits.** You can decide who sees the change, and one person’s experience doesn’t affect another’s. Randomising makes the groups alike in every way except the change, so any difference in outcomes is caused by it.

**Assumptions to check:**

- Groups don’t influence each other.
- People stay in the group they were given, for example across devices.
- The outcome is measured the same way in every group.

## Holdout group

Keep a small, random group away from a change, or a series of changes, for months, and compare them with everyone else.

```figure
type: method
key: holdout
```

**In plain terms.** Like keeping one room of a house exactly as it was while you renovate the rest. Months later, comparing that room with the others shows what all the work really added up to.

**When it fits.** You need the long-run or combined effect, which short tests miss. Novelty wears off, habits form, and many small changes add up or cancel out in ways no single test shows.

**Assumptions to check:**

- The holdout is chosen at random and stays untouched.
- Nothing leaks to the holdout, such as marketing or support that mentions the change.
- The business accepts the cost of not giving some people the change.

## Switchback experiment

Switch the whole system between versions over time, for example every hour or day, in a random order, and compare the periods.

```figure
type: method
key: switchback
```

**In plain terms.** Like a restaurant trying a new menu on randomly chosen evenings. Everyone that evening gets the same menu, so diners can’t affect each other’s experience, and over many evenings the difference shows.

**When it fits.** The change acts on something shared, like pricing, supply or a matching algorithm. Splitting people would let the groups affect each other, but randomising time periods keeps the comparison clean.

**Assumptions to check:**

- Effects don’t carry over from one period to the next, or you leave a gap between them.
- Each period is long enough for the system to settle.
- There are enough periods to average out daily and weekly patterns.

## Geo experiment

Randomly choose whole regions, markets or stores to get the change, and compare them with the rest.

```figure
type: method
key: geo
```

**In plain terms.** Like trialling a new shop layout in randomly chosen towns. Each town gets one version, so customers in the same town never see a mix of the two.

**When it fits.** You can only switch the change on for whole areas, or people in the same area would influence each other. The area becomes the unit you randomise, which keeps groups apart.

**Assumptions to check:**

- Regions are separate enough that effects don’t spill over.
- There are enough regions to randomise meaningfully, ideally 20 or more.
- Regions are broadly comparable, or matched in pairs before randomising.

---

### When you can’t run an experiment

## Difference-in-differences

Compare how the outcome changed for those who got the change with how it changed, over the same period, for those who didn’t.

```figure
type: method
key: did
```

**In plain terms.** If two runners hold the same pace for miles and then one gets new shoes, the gap that opens up afterwards is down to the shoes, not to the runners being different.

**When it fits.** The change reached some groups on a known date, and there are comparable groups that didn’t get it. Their trend shows what would most likely have happened anyway.

**Assumptions to check:**

- Before the change, both groups were moving in parallel. Check this with past data.
- Nothing else changed for only one of the groups at the same time.
- Who got the change wasn’t decided by how their outcomes were expected to move.

## Synthetic control

Build a weighted blend of unaffected places or products that closely tracks the affected one before the change, and use it as the comparison afterwards.

```figure
type: method
key: synth
```

**In plain terms.** When only one city got the change, build a stand-in “twin” from a mix of other cities that moved just like it beforehand. After the change, the twin shows what would have happened without it.

**When it fits.** Only one, or a few, units got the change, and no single unaffected unit is a good match on its own. A blend of several often is.

**Assumptions to check:**

- The blend tracks the affected unit closely for a long period before the change.
- None of the units in the blend were affected by the change.
- No other one-off event hit only the affected unit.

## Regression discontinuity

Compare people just above a cutoff with people just below it, who are otherwise nearly identical.

```figure
type: method
key: rdd
```

**In plain terms.** Students who score 69 and 70 on an exam are almost identical, but only one of them passes. Comparing people just either side of a line shows the effect of being over it.

**When it fits.** The change was decided by a score or threshold, so people either side of the line make a natural comparison.

**Assumptions to check:**

- People can’t precisely control which side of the cutoff they land on.
- Nothing else changes at the same cutoff.
- Outcomes change smoothly with the score, apart from the jump caused by the change.

## Interrupted time series

Model the trend before the change, project it forward, and compare that projection with what actually happened.

```figure
type: method
key: its
```

**In plain terms.** Like predicting where a ball will land from the path it was already on. If the trend before the change was steady, the gap between that prediction and what actually happened is the effect.

**When it fits.** Everyone got the change at once and there’s no unaffected group, so the past is the only comparison available.

**Assumptions to check:**

- The trend before the change would have continued without it.
- Nothing else happened at the same time.
- There’s enough history to capture seasonal patterns.

## Matching

Pair people who chose to use it with similar people who didn’t, based on what they looked like beforehand, and compare outcomes.

```figure
type: method
key: matching
```

**In plain terms.** Compare each person who used it with a lookalike who didn’t: similar history, similar habits. It’s only fair if you’ve captured everything that matters, which is why it’s the shakiest of the ten.

**When it fits.** People chose whether to use it, so users and non-users differ. Matching on detailed data from before they chose makes the comparison fairer.

**Assumptions to check:**

- You’ve measured everything that drives both the choice and the outcome. This can’t be tested, and is the big risk.
- Every user has comparable non-users to match with.
- You only match on things measured before the choice.

## Instrumental variables

Use something that nudged some people to take it up, but doesn’t affect the outcome directly, to isolate the effect of using it.

```figure
type: method
key: iv
```

**In plain terms.** If a random invitation made some people more likely to try something, and the invitation changes nothing else, then comparing invited and uninvited people reveals the effect of trying it.

**When it fits.** People chose whether to use it, but a random or as-good-as-random nudge changed who did. That gives a clean source of variation to learn from.

**Assumptions to check:**

- The nudge genuinely changes take-up. Check it’s strong.
- The nudge affects the outcome only through take-up.
- Who got the nudge was as good as random.

---

## Choosing between them

The best method is usually the strongest one your situation allows. If you can choose who gets a change, run an experiment: it’s the most reliable answer you can get. If you can’t, look for something in how the change reached people, such as a cutoff, a date or a comparable group, and use the method built for it.

Whichever you choose, the assumptions matter more than the name. Check them before trusting the number. To find the right fit for a specific problem, try the [Causal method finder](/projects/causal-method-finder).
