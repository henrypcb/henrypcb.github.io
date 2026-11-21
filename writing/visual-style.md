This page is a reference for how writing looks on this site: the type, the figures, and the rules behind them. Everything here is placeholder content, so the numbers and labels mean nothing. It exists to show the style, and as something to copy from.

## Principles

- **Two inks.** Black for the point, grey for context. Never more than three things on one figure.
- **Name, don't key.** Labels sit on the lines and bars themselves. A dash or a hatch, never shade alone, tells series apart.
- **Hairlines.** One baseline, a faint grid, no boxes, no shadows, no rounded panels.
- **Speak in italics.** Notes on a figure are set in Georgia italic, like a note in the margin. Labels are set in small capitals.

## Diagrams

Loops and flows explain how one thing feeds another. Each step is numbered, and a dashed arrow marks the step that deserves attention.

```figure
type: loop
title: How a referral loop compounds
steps: New customers | Use the product | Value created | Refer a friend
weak: 4
note: each turn feeds the next
caption: Steps are numbered; the dashed arrow marks the step to watch.
source: Placeholder
```

## Change over time

Lines are for trends. The series that carries the point is solid black; anything it is compared against is grey and dashed. Hover to read exact values.

```figure
type: line
title: Monthly customers, with and without the loop
x: Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec
series: With loop | 20,23,27,32,38,45,53,62,72,84,97,112
series: Without | 20,22,24,26,28,30,32,34,36,38,40,42
unit: k
note: Jul | the loop starts to pull away
caption: Illustrative data. Thousands of customers, January to December.
source: Placeholder
```

## Comparisons

Bars compare sizes. One bar is inked to carry the point and the rest stay grey and hatched. Only the inked bar is labelled with its value.

```figure
type: bars
title: Where new customers came from
bar: Referrals | 38
bar: Search | 27
bar: Comparison sites | 21
bar: Social | 14
unit: %
note: nearly twice search
caption: Share of new customers, per cent.
source: Placeholder
```

## A single number

When one number is the point, show the number and say what it means. No chart is needed.

```figure
type: number
value: 3.2×
text: Placeholder. A short line saying what the number means and why it matters.
```

## Words

Body text is set in a light sans-serif at a comfortable reading width. Emphasis uses **bold** for weight and *italics* for voice, and [links](https://example.com) are underlined quietly.

> A pull quote is set in Georgia italic, with a single hairline to its left. Use one or two in a piece, at most.

### A smaller heading

Smaller headings are set in spaced capitals, for breaking a section into parts.

1. Numbered lists are for steps in order.
2. Bullet lists are for points that sit side by side.

---

## Adding a figure

Each figure is a short block in the piece's text file. Start the block with a line of three backticks followed by the word figure, end it with a line of three backticks, and put the details in between, one per line. For example, a bar chart:

```text
type: bars
title: Where new customers came from
bar: Referrals | 38
bar: Search | 27
unit: %
note: nearly twice search
caption: Share of new customers, per cent.
source: Placeholder
```

The four types and what each takes:

- **loop** takes steps separated by a vertical bar, plus optional weak (the number of the step whose arrow is dashed), note and centre.
- **line** takes x labels separated by a vertical bar, one series line per series (name, a vertical bar, then the values separated by commas), plus optional unit and note (the x label, a vertical bar, then the text).
- **bars** takes one bar line per bar (name, a vertical bar, value), plus optional unit, highlight (the name of the bar to ink) and note.
- **number** takes a value and a line of text.

Every figure can also take a title, a caption and a source.
