<div align="center">

<img src="https://raw.githubusercontent.com/NEURAL-Y/RazorDel-Css/main/public/RAZOR%20DEL.png" alt="RazorDelCSS" width="440"/>

# RazorDelCSS

**A TypeScript-based styling language and compiler.**
**Program your styling. Catch mistakes before the browser does.**

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active--development-orange)](#development-status)
[![TypeScript](https://img.shields.io/badge/built%20with-TypeScript-3178c6?logo=typescript&logoColor=white)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#contributing)

[Quick Start](#quick-start) • [Language Tour](#language-tour) • [Architecture](#architecture) • [Roadmap](https://github.com/NEURAL-Y/RazorDel-CSS/blob/main/docs/development_charter.md) • [Contributing](#contributing)

</div>

---

Traditional CSS is powerful, but at scale it becomes a battle against repetition, cascade context, and increasingly creative combinations of properties. RazorDelCSS isn't another CSS-in-JS wrapper or utility-class collection — it's a real compiler (lexer → semantic analyzer → IR → output) that brings functions, types, OOP abstractions, and compile-time validation to styling, then emits clean, standard CSS.

The browser doesn't need to understand RazorDelCSS. **The developer does.**

```text
write code → analyze → detect error → fix error → compile → browser
```
instead of
```text
write code → compile → browser → "why doesn't this work?" → three hours disappear
```

---

## Quick Start

> ⚠️ Pre-1.0 and under active development — syntax and APIs will change. See [Development Status](#development-status).

```bash
git clone https://github.com/NEURAL-Y/RazorDel-Css.git
cd RazorDel-Css
npm install
npm run compile -- path/to/file.rdc
```

```ts
// button.rdc.ts
const primary = "#4f46e5";

function spacing(value: number) {
    return `${value}px`;
}

component Button {
    padding: spacing(12);
    background: primary;
}
```

Compiles to standard, browser-ready CSS.

---

## Language Tour

RazorDelCSS styling is written as TypeScript: variables, functions, and classes instead of repeated declarations.

**Functions** make styling logic reusable:

```ts
function scale(value: number, factor: number) {
    return value * factor;
}

.card {
    width: scale(100, 2);
}
```

**Classes** organize styling into abstractions instead of loose, unrelated rules:

```ts
class ButtonStyle {
    radius = 8;
    padding = 12;

    primary() { /* styling logic */ }
}
```

**Higher-level layout** replaces low-level property combinations with clearer concepts:

```ts
container: flex;
align-items: center;
content: space-between;
```

**Drawing and animation** get their own models rather than being forced through CSS:

```ts
draw {
    circle { radius: 20; position: center; }
}

animation ButtonPulse {
    duration: 300ms;
    scale { from: 1; to: 1.05; }
}
```

📖 Full syntax reference, more examples, and the OOP styling guide: [`docs/language.md`](docs/language.md) *(WIP)*.

---

## Compile-Time & Context-Aware Validation

RazorDelCSS analyzes styling *before* generating output — catching both invalid attributes and missing context (e.g. `align-items` without a flex/grid container) that plain CSS would silently let through:

```text
RazorDelCSS Error

Invalid attribute: `line`
`line` is not a valid attribute of `border`.

Expected attributes: width, style, color, radius
Location: components/button.rdc:4:9
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

The compiler understands the **meaning and context** of styling instructions before generating output — it's more than a syntax transform. Deeper dive: [`docs/architecture.md`](docs/architecture.md) *(WIP)*.

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
- [ ] User-defined functions & OOP abstractions
- [ ] Higher-level layout system
- [ ] Animation system
- [ ] Canvas / drawing system
- [ ] Compile-time diagnostics & inline documentation
- [ ] Language Server Protocol support, editor integration, autocomplete
- [ ] Compiler optimizations & production-ready output

Track progress in [Issues](https://github.com/NEURAL-Y/RazorDel-Css/issues) / [Discussions](https://github.com/NEURAL-Y/RazorDel-Css/discussions).

## Development Status

RazorDelCSS is under active, early-stage development. Language, compiler architecture, and tooling are all expected to change. Expect experimental features and breaking changes between versions.

## Contributing

1. Fork the repo and branch from `main`.
2. Make focused commits; add tests where relevant.
3. Open a PR describing the change and motivation.

Picking up a roadmap item? Open an issue first — the compiler architecture is still settling, and early alignment saves rework.

## License

Released under the [Apache License 2.0](LICENSE).

---

<div align="center">

**Program your styling. Catch mistakes early. Compile for the browser.**

</div>
