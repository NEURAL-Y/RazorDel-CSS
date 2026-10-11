<div align="center">

<img src="https://raw.githubusercontent.com/NEURAL-Y/RazorDel-Css/main/public/RAZOR%20DEL.png" alt="RazorDelCSS logo" width="440"/>

# RazorDelCSS

**A TypeScript-based styling language and compiler.**
**Program your styling. Catch mistakes before the browser does.**

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active--development-orange)](#development-status)
[![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)
[![Issues](https://img.shields.io/github/issues/NEURAL-Y/RazorDel-Css)](https://github.com/NEURAL-Y/RazorDel-Css/issues)
[![Stars](https://img.shields.io/github/stars/NEURAL-Y/RazorDel-Css?style=social)](https://github.com/NEURAL-Y/RazorDel-Css)

[Quick Start](#quick-start) • [Language Tour](#language-tour) • [Validation](#compile-time--context-aware-validation) • [Architecture](#architecture) • [Roadmap](#roadmap) • [Contributing](#contributing)

</div>

---

## Table of Contents

- [Why RazorDelCSS](#why-razordelcss)
- [Features](#features)
- [Quick Start](#quick-start)
- [Language Tour](#language-tour)
  - [Boxes and containers](#boxes-and-containers)
  - [Color](#color)
  - [Positioning](#positioning)
  - [Canvas (CSS and SVG)](#canvas-css-and-svg)
  - [Responsive layout (orientation-first)](#responsive-layout-orientation-first)
  - [Fonts](#fonts)
  - [Variables and functions](#variables-and-functions)
  - [Classes](#classes)
  - [Layout](#layout)
  - [Drawing and animation](#drawing-and-animation)
- [Compile-Time & Context-Aware Validation](#compile-time--context-aware-validation)
- [Architecture](#architecture)
- [What RazorDelCSS Is / Isn't](#what-razordelcss-is--isnt)
- [Roadmap](#roadmap)
- [Development Status](#development-status)
- [FAQ](#faq)
- [Contributing](#contributing)
- [License](#license)

---

## Why RazorDelCSS

Traditional CSS is powerful, but at scale it becomes a battle against repetition, cascade context, and increasingly creative combinations of properties. RazorDelCSS isn't another CSS-in-JS wrapper or utility-class collection. It is a real compiler (lexer → semantic analyzer → IR → output) that brings **functions, types, OOP abstractions, and compile-time validation** to styling, then emits clean, standard CSS.

The browser doesn't need to understand RazorDelCSS. **The developer does.**

```text
write code → analyze → detect error → fix error → compile → browser
```

instead of

```text
write code → compile → browser → "why doesn't this work?" → three hours disappear
```

## Features

| | |
|---|---|
| **Programmable styling** | Variables, functions, and classes instead of copy-pasted declarations |
| **Object-style API** | Create a `box` or `container`, then style it with methods: `box.color(...)`, `box.pos_x(...)` |
| **Canvas with dual output** | One `canvas` definition compiles to CSS (animated elements) *or* standalone SVG |
| **Orientation-first responsive layout** | Define `landscape` / `portrait` states in a class; `auto_fit()` and `manually_fit()` replace hand-written breakpoints |
| **Font loader** | `font.load()` replaces hand-written `@font-face`: format detection, file checks, preload manifest |
| **Compile-time validation** | Invalid attributes and missing context (e.g. `align-items` with no flex/grid parent) fail at build, not in the browser |
| **Higher-level layout** | Clear concepts replace low-level property combinations |
| **Drawing and animation models** | First-class `draw` and `animation` blocks, not forced through CSS |
| **Clean output** | Emits standard, browser-ready CSS with no runtime dependency |
| **Editor-first diagnostics** | Docs, autocomplete, and errors designed to surface inline while you write |

---

## Quick Start

> ⚠️ **Pre-1.0 and under active development.** Syntax and APIs will change. See [Development Status](#development-status).

**Requirements:** Node.js 18+ and npm.

```bash
git clone https://github.com/NEURAL-Y/RazorDel-Css.git
cd RazorDel-Css
npm install
npm run compile -- path/to/file.rdc
```

**Your first file:**

```ts
// card.rdc
const card = box(height=144px, width=344px);

card.color(apply=background, color_code="#4f46e5");
card.pos_x(189px);
```

**Compiles to:**

```css
.card {
  height: 144px;
  width: 344px;
  background-color: #4f46e5;
  position: absolute;
  left: 189px;
}
```

---

## Language Tour

RazorDelCSS styling is written as TypeScript: variables, functions, and classes instead of repeated declarations.

### Boxes and containers

`box` and `container` are the primary building blocks. Both take named size arguments:

```ts
const card  = box(height=144px, width=344px);
const shell = container(height=144px, width=344px);
```

Styling is applied by calling methods on the instance.

### Color

`color` takes an explicit **target** (`apply`) and a **value** (`color_code`), so intent is never ambiguous:

```ts
card.color(apply=background, color_code="#4f46e5");
```

The analyzer rejects unknown targets and malformed color codes at compile time (see [Validation](#compile-time--context-aware-validation)).

### Positioning

Axis-specific position methods replace multi-property offset juggling:

```ts
card.pos_x(189px);
```

Because a horizontal offset only makes sense in a positioned context, the analyzer checks the surrounding layout and reports when the offset has no effect.

### Canvas (CSS and SVG)

`canvas` defines a drawing surface sized to the area it occupies on screen. The same definition drives normal CSS animation **and** SVG output.

```ts
const stage = canvas(width=400px, height=300px);

stage.color(apply=background, color_code="#0f172a");
stage.shape_selector(circle);          // predefined, CSS-based shape
stage.animation(on, delay=200ms);      // on | off, plus start delay
```

| Method | Purpose |
|---|---|
| `canvas(width, height)` | Size of the drawing area on screen |
| `canvas.color(apply, color_code)` | Color for a chosen target |
| `canvas.animation(on \| off, delay)` | Toggle animation and set its start delay |
| `canvas.shape_selector(shape)` | Pick a predefined CSS shape (`circle`, `ellipse`, `inset`, `polygon`, ...) |

**CSS target** (`--target css`):

```css
.stage {
  width: 400px;
  height: 300px;
  background-color: #0f172a;
  clip-path: circle(50%);
  animation-delay: 200ms;
}
```

**SVG target** (`--target svg`):

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <circle cx="200" cy="150" r="150" fill="#0f172a"/>
</svg>
```

Shapes resolve to their SVG equivalents where one exists, so a single source produces both outputs. The analyzer flags targets that don't apply to the chosen output, for example `fill` in CSS mode.

### Responsive layout (orientation-first)

Instead of hand-writing `min-width` / `max-width` breakpoints, define a layout class with a `landscape` and a `portrait` state. Each state carries its own `width`, `height`, and spacing (`x`, `y`, `z`).

```ts
class CardLayout {
    landscape = { width=344px, height=144px, x=16px, y=8px,  z=1 };
    portrait  = { width=300px, height=200px, x=8px,  y=16px, z=1 };
}

const card = box(height=144px, width=344px);   // initial size

card.auto_fit(CardLayout);        // compiler derives and applies per-orientation rules
card.manually_fit(CardLayout);    // applies exactly what you defined, nothing derived
```

| Method | Behavior |
|---|---|
| `auto_fit(layout)` | Takes the whole layout class, fits the element to each orientation, and separates siblings using the `x`, `y`, `z` spacing you set |
| `manually_fit(layout)` | Uses only the values you define in your class. You add or remove width, height, and margin entries yourself; nothing is generated |

**Compiles to:**

```css
@media (orientation: landscape) {
  .card { width: 344px; height: 144px; margin: 8px 16px; z-index: 1; }
}
@media (orientation: portrait) {
  .card { width: 300px; height: 200px; margin: 16px 8px; z-index: 1; }
}
```

Spacing maps as `y` → vertical margin, `x` → horizontal margin, `z` → stacking order (`z-index`). Using `auto_fit` and `manually_fit` on the same element is a compile-time error.

### Fonts

`font.load()` registers a font file and returns a typed handle. No `@font-face` to write: the compiler detects the format, generates the rules, and checks the file exists.

```ts
const inter     = font.load("./fonts/Inter.woff2",      family="Inter", weight=400, display=swap);
const interBold = font.load("./fonts/Inter-Bold.woff2", family="Inter", weight=700, display=swap);

title.font(interBold, size=32px, fallback=sans);
body.font(inter,      size=16px, fallback=sans);
```

| Argument | Purpose |
|---|---|
| `src` (first argument) | Path to `woff2`, `woff`, `ttf`, or `otf`; format is inferred from the extension |
| `family` | Name used in `font-family` |
| `weight` / `style` | A number (or range for variable fonts) and `normal` / `italic` |
| `display` | `swap`, `block`, `fallback`, `optional` (default `swap`) |
| `fallback` (on `.font()`) | Generic fallback stack: `sans`, `serif`, `mono`, `system` |

**Compiles to:**

```css
@font-face {
  font-family: "Inter";
  src: url("./fonts/Inter.woff2") format("woff2");
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: "Inter";
  src: url("./fonts/Inter-Bold.woff2") format("woff2");
  font-weight: 700;
  font-display: swap;
}
.title { font-family: "Inter", system-ui, sans-serif; font-size: 32px; }
.body  { font-family: "Inter", system-ui, sans-serif; font-size: 16px; }
```

The compiler also emits a preload manifest (`<link rel="preload" as="font" ...>`) for fonts used above the fold. Missing files, unused fonts, and a missing fallback are compile-time diagnostics.

### Variables and functions

Make styling logic reusable:

```ts
const primary = "#4f46e5";

function scale(value: number, factor: number) {
    return value * factor;
}

const hero = box(height=scale(72, 2) + "px", width=344px);
hero.color(apply=background, color_code=primary);
```

### Classes

Organize styling into abstractions instead of loose, unrelated rules:

```ts
class ButtonStyle {
    radius = 8;
    padding = 12;

    primary() { /* styling logic */ }
}
```

### Layout

Higher-level layout replaces low-level property combinations with clearer concepts:

```ts
container: flex;
align-items: center;
content: space-between;
```

### Drawing and animation

Drawing and animation get their own models rather than being forced through CSS:

```ts
draw {
    circle { radius: 20; position: center; }
}

animation ButtonPulse {
    duration: 300ms;
    scale { from: 1; to: 1.05; }
}
```

📖 Full syntax reference and the OOP styling guide: [`docs/language.md`](docs/language.md) *(WIP)*.

---

## Compile-Time & Context-Aware Validation

RazorDelCSS analyzes styling *before* generating output, catching both invalid attributes and missing context that plain CSS would silently let through.

**Invalid attribute:**

```text
RazorDelCSS Error

Invalid attribute: `line`
`line` is not a valid attribute of `border`.

Expected attributes: width, style, color, radius
Location: components/button.rdc:4:9
```

**Missing context:**

```text
RazorDelCSS Warning

`align-items` has no effect: parent is not a flex or grid container.
Location: components/nav.rdc:7:5
```

**Target mismatch:**

```text
RazorDelCSS Error

Invalid target: `fill` cannot be applied when compiling `stage` to CSS.
`fill` is valid for SVG output only.

Expected targets (css): background, text, border
Location: scenes/stage.rdc:3:14
```

Documentation, autocomplete, and diagnostics are designed to surface inline while you write, not in a separate tab. More examples: [`docs/diagnostics.md`](docs/diagnostics.md) *(WIP)*.

---

## Architecture

```text
        TypeScript RazorDelCSS
                 │
          Lexer / Parser
                 │
          Semantic Analyzer
                 │
    ┌────────────┼────────────┐
  Layout       Styling       Drawing
  Logic         Logic         Logic
    └────────────┼────────────┘
                 ▼
      Intermediate Representation
                 │
              Compiler
           ┌─────┴─────┐
       CSS Output   Drawing/Runtime
           └─────┬─────┘
              Browser
```

The compiler understands the **meaning and context** of styling instructions before generating output. It is more than a syntax transform. Deeper dive: [`docs/architecture.md`](docs/architecture.md) *(WIP)*.

---

## What RazorDelCSS Is / Isn't

<table>
<tr>
<td valign="top" width="50%">

**Is:**
- A TypeScript-based styling language & compiler
- A semantic, programmable styling system
- Built for early (compile-time) error detection
- A foundation for layout, animation, and drawing

</td>
<td valign="top" width="50%">

**Isn't:**
- A CSS minifier or utility-class collection
- A CSS-in-JS runtime library
- A replacement for the browser's rendering engine
- A renaming layer over existing CSS properties

</td>
</tr>
</table>

---

## Roadmap

- [ ] Core TypeScript-based parser
- [ ] Semantic analyzer & type system
- [ ] Styling intermediate representation
- [ ] CSS compiler
- [ ] `box` / `container` object API (`color`, `pos_x`, and more)
- [ ] `canvas` API with shared CSS and SVG output (`color`, `animation`, `shape_selector`)
- [ ] Orientation-based responsive system (`auto_fit`, `manually_fit`)
- [ ] Font loader (`font.load`, `.font()`, preload manifest)
- [ ] User-defined functions & OOP abstractions
- [ ] Higher-level layout system
- [ ] Animation system
- [ ] Canvas / drawing system
- [ ] Compile-time diagnostics & inline documentation
- [ ] Language Server Protocol support, editor integration, autocomplete
- [ ] Compiler optimizations & production-ready output

Full plan: [`docs/development_charter.md`](https://github.com/NEURAL-Y/RazorDel-Css/blob/main/docs/development_charter.md). Track progress in [Issues](https://github.com/NEURAL-Y/RazorDel-Css/issues) and [Discussions](https://github.com/NEURAL-Y/RazorDel-Css/discussions).

## Development Status

RazorDelCSS is under active, early-stage development. Language, compiler architecture, and tooling are all expected to change. Expect experimental features and **breaking changes between versions**. Not recommended for production use yet.

---

## FAQ

**Is this CSS-in-JS?**
No. Nothing runs in the browser. RazorDelCSS compiles ahead of time to plain CSS.

**Do I need to know TypeScript?**
Basic familiarity helps: variables, functions, and classes are the core of the language.

**Why not Sass or Less?**
Preprocessors add variables and nesting but don't understand CSS semantics. RazorDelCSS validates property context at compile time and adds layout, drawing, and animation models.

**Can I use it with existing CSS?**
The output is standard CSS, so it drops into any build pipeline or stylesheet.

---

## Contributing

Contributions are welcome.

1. Fork the repo and branch from `main`.
2. Make focused commits; add tests where relevant.
3. Open a PR describing the change and motivation.

Picking up a roadmap item? **Open an issue first.** The compiler architecture is still settling, and early alignment saves rework.

Found a bug or have an idea? [Open an issue](https://github.com/NEURAL-Y/RazorDel-Css/issues/new) with a minimal `.rdc` reproduction and the output you expected.

## License

Released under the [Apache License 2.0](LICENSE).

---

<div align="center">

**Program your styling. Catch mistakes early. Compile for the browser.**

⭐ If RazorDelCSS interests you, star the repo to follow development.

</div>
