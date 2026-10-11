# RAZORDELCSS

## DEVELOPMENT GOVERNANCE CHARTER

**Project:** RazorDelCSS
**Organization:** NEURAL-Y
**Document Type:** Development Governance Charter
**Document Version:** 1.3
**Effective Date:** 11 October 2026
**Supersedes:** Charter v1.2 (05 October 2026)
**Status:** Public Declaration

---

## 1. PURPOSE

This Charter defines how RazorDelCSS is developed, released, supported, and governed.

RazorDelCSS is a TypeScript-based styling language and compiler. It validates styling at compile time and emits standard CSS and SVG. This Charter exists so that contributors, users, and adopters can see what the project commits to, how progress is measured, and how decisions are made.

---

## 2. CHANGES FROM CHARTER v1.2

| Area | v1.2 | v1.3 |
| --- | --- | --- |
| Release model | Three separate major generations (v1, v2, v3) with overlapping support | **One release line (1.x)** developed in three additive **stages** |
| Dates | Hard deadline ("no later than") | **Target** dates; readiness decides (see §8) |
| Adoption | GitHub star targets, partly tied to release readiness | **Adoption indicators**; stars are a public signal and never gate a release (see §9) |
| Exit criteria | Not defined | **Acceptance checklist** per stage (§5–§7) |
| Support | Overlapping lifecycles per generation | **Latest release line** supported (§10) |
| Governance | Not defined | Decision-making, language-change process, security reporting (§12–§14) |
| Scope | CSS compiler | Validation-first compiler with CSS and SVG output, aligned with the project README |
| Developer-defined aliases | Listed in v3 scope | **Dropped** (§17) |

Stage 1, Stage 2, and Stage 3 correspond to v1, v2, and v3 in Charter v1.2.

---

## 3. CORE PRINCIPLES

1. **Validation first.** The compiler analyzes styling before generating output. Catching mistakes before the browser is the project's central promise.
2. **Checks always run.** Configuration may change whether a problem stops the build or is reported while compilation continues. Checks themselves cannot be disabled.
3. **Zero runtime.** Output is standard CSS and SVG. No RazorDelCSS code ships to the browser.
4. **Always ejectable.** Because output is plain CSS and SVG, a team can stop using RazorDelCSS and keep working with the generated files.
5. **Deterministic builds.** Functions executed at compile time must be pure (no file-system or network access), so the same input always produces the same output.
6. **Readiness over calendar.** Dates are targets. A stage is not released in a knowingly unstable state to satisfy a date.
7. **Honest metrics.** Adoption is measured by real use. Artificial manipulation of any metric does not count as achievement.
8. **Clarity over cleverness.** Reduce unnecessary developer effort without reducing source-code clarity.

---

## 4. RELEASE MODEL

### 4.1 One release line

RazorDelCSS develops on a single release line, **1.x**. Each stage adds capabilities to the line.

### 4.2 Versioning

The project follows Semantic Versioning once 1.0.0 is released:

* **Patch (1.x.y):** bug fixes, no behavior change.
* **Minor (1.x.0):** backward-compatible additions, including new stages and new CSS capabilities.
* **Major (x.0.0):** reserved for breaking changes to syntax, compiler behavior, or output guarantees.

Before 1.0.0 the project is pre-release; syntax and APIs may change without notice, as stated in the README.

### 4.3 Stages

| Stage | Name | Target date | Primary outcome |
| --- | --- | --- | --- |
| **1** | Foundation | **25 Dec 2026** | A working vertical slice: parser → analyzer → CSS and SVG output, plus a standalone CSS validator |
| **2** | Productivity | **31 Jul 2027** | Incremental adoption and editor tooling |
| **3** | Observability | **31 Jan 2028** | Compiler state, observability, and data graphs |

Stages are additive. Stage 2 includes Stage 1; Stage 3 includes Stages 1 and 2.

---

## 5. STAGE 1 — FOUNDATION

**Objective:** prove the core claim that compile-time, context-aware validation catches real styling mistakes, and emit correct CSS and SVG.

**Scope**

* Lexer, parser, and semantic analyzer.
* `box` and `container` with `height`, `width`, `color`, and `pos_x`.
* `canvas` with `color`, `shape_selector`, and `animation`, compiling to CSS and to SVG.
* Diagnostics: error and warning messages with rule ID, file location, and expected values.
* `rdc check` for plain `.css` files with context-aware rules.
* Documentation and release infrastructure.

**Acceptance checklist**

- [ ] Every documented syntax form has at least one passing snapshot test.
- [ ] `box`, `container`, and `canvas` compile to correct, validated CSS.
- [ ] `canvas` compiles to valid standalone SVG for every supported `shape_selector` value.
- [ ] `rdc check <file.css>` ships with at least 10 documented context-aware rules.
- [ ] Every diagnostic includes rule ID, `file:line:column`, and expected values.
- [ ] The validator has been run on at least 20 public open-source CSS codebases, and the method and results are published.
- [ ] A language reference covers every public API; the quick start is verified on Windows, macOS, and Linux.
- [ ] Continuous integration passes on supported Node.js LTS versions.
- [ ] No known P0 (data-corrupting or crash-on-valid-input) bugs.
- [ ] At least one real project is built with RazorDelCSS in public.
- [ ] `LICENSE`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, and `SECURITY.md` are present.

---

## 6. STAGE 2 — PRODUCTIVITY

**Objective:** make RazorDelCSS adoptable inside existing projects and comfortable to write.

**Scope**

* `Options` class: legacy CSS blocks, file-scoped variables and functions, and `on_error` modes (`continue` or `stop`). Checks always run.
* Orientation-first responsive layout: `auto_fit` and `manually_fit`, with a documented, deterministic fitting algorithm.
* `font.load` font loader with compile-time file and fallback checks and a preload manifest.
* Composite properties that map one RazorDelCSS property to multiple CSS properties, documented and predictable.
* Editor tooling: VS Code extension with inline diagnostics and hover documentation.
* Web playground (no install).
* Source maps from generated CSS and SVG back to source.
* First framework integration (Vite plugin), then React and Angular workflows.
* Published stability and deprecation policy (§11).

**Acceptance checklist**

- [ ] Existing CSS compiles in `legacy` blocks and is still validated; output for unmodified rules is unchanged.
- [ ] `auto_fit` behavior is specified in the documentation and covered by tests.
- [ ] `font.load` reports missing files, missing fallbacks, and unused fonts at compile time.
- [ ] Source maps resolve generated output to the correct source location in browser developer tools.
- [ ] The VS Code extension is published and shows diagnostics inline.
- [ ] The playground is publicly available.
- [ ] The Vite plugin is published and documented.
- [ ] Compile-time function purity is enforced and tested.
- [ ] Zero known P0 bugs; documentation current for every public API.

---

## 7. STAGE 3 — OBSERVABILITY

**Objective:** deepen the compiler's internal capabilities and make its behavior inspectable.

**Scope**

* Compiler state storage.
* Container and class association.
* Execution observability and compilation status reporting.
* Property-level validation.
* Advanced diagnostics.
* `canvas.graph()` data charts, rendered as static SVG at compile time: `line`, `bar`, `area`, `scatter`, with point, line, axis, and color styling and accessibility checks. Further chart types follow after the first four are stable.
* Language Server Protocol support with autocomplete.

**Acceptance checklist**

- [ ] Compilation status and per-property validation results are inspectable through documented output.
- [ ] `canvas.graph()` validates data fields, axis scales, and color contrast at compile time, and emits valid SVG.
- [ ] Graph output is generated at compile time with no browser runtime.
- [ ] LSP provides autocomplete and diagnostics in at least one editor beyond VS Code, or a documented LSP client guide.
- [ ] Zero known P0 bugs; documentation current for every public API.

---

## 8. RELEASE READINESS

A stage is released when its acceptance checklist is complete and the maintainers agree it is stable.

* A stage may be released **earlier** than its target date if its checklist is complete.
* A stage is **not** released in a knowingly unstable state to satisfy a date.
* If a target date is missed, the delay is recorded under §16, not removed from history.

Target dates are planning commitments to users about intent, not guarantees.

---

## 9. ADOPTION INDICATORS

Adoption is measured by use, not by star count.

| Indicator | Stage 1 | Stage 2 | Stage 3 |
| --- | --- | --- | --- |
| Public projects using RazorDelCSS | 1 | 10 | 25 |
| External contributors with merged pull requests | 1 | 5 | 15 |
| Maintainers with merge rights | 1 | 2 | 3 |
| Issues filed by people other than maintainers | 5 | 25 | 100 |
| Playground or `rdc check` sessions per month | — | 100 | 1,000 |

These are targets, not release gates.

**GitHub stars** remain a public signal of interest. The project's aspirational milestones are **100** (Stage 1), **500** (Stage 2), and **1,000** (Stage 3). Stars never gate a release, never substitute for technical quality, and are not counted if artificially inflated.

---

## 10. SUPPORT POLICY

* The **latest minor release** of the current major version receives bug fixes and compatibility updates.
* When a new major version is released, the **previous major version** receives security and critical fixes for **12 months**.
* Stages do not create separate support lifecycles, because they are minor releases on the same line.

Support periods may be extended by a later governance declaration.

---

## 11. COMPATIBILITY, DEPRECATION, AND BREAKING CHANGES

* Within a major version, existing valid source continues to compile to equivalent output.
* A feature is **deprecated** for at least one minor release and at least **90 days** before removal, with a compile-time warning and a documented migration path. Where practical, an automated codemod is provided.
* Breaking changes ship only in a major version.
* Output changes that alter rendered results are treated as breaking, except to fix a bug.

---

## 12. DECISION-MAKING AND ROLES

* **Founding maintainer (NEURAL-Y)** holds final decision authority while the project has one maintainer.
* Once there are **two or more maintainers**, decisions are made by consensus; if consensus is not reached, by majority of maintainers.
* **Maintainers** may merge pull requests and triage issues. Contributors who sustain high-quality contributions may be invited as maintainers.
* Decisions affecting the language, compiler behavior, or output follow the language-change process in §13.

---

## 13. LANGUAGE CHANGE PROCESS

Changes to syntax, semantics, or output follow a lightweight RFC process:

1. Open an issue labeled `rfc` describing the problem, proposed design, alternatives, and compatibility impact.
2. Allow at least **14 days** for public comment.
3. A maintainer records the decision and its rationale in the issue.
4. Accepted changes are added to the roadmap, tests, and documentation before release.

Small bug fixes and documentation changes do not require an RFC.

---

## 14. SECURITY

* Vulnerabilities are reported through GitHub's private vulnerability reporting, as described in `SECURITY.md`.
* Reports receive an acknowledgment, and fixes ship through the support policy in §10.
* Compile-time function execution is restricted to pure functions without file-system or network access (§3.5). Any weakening of that restriction requires an RFC.

---

## 15. COMMUNITY-INFORMED DEVELOPMENT AND CSS EVOLUTION

Priorities are informed by issues, feature requests, bug reports, pull requests, framework requirements, real-world usage, and community discussion. Popularity is a signal, not authority. Every request is evaluated for feasibility, compatibility, maintainability, performance, reliability, and architectural impact.

RazorDelCSS continuously evaluates changes to the CSS platform. New CSS properties, selectors, functions, and APIs may be added in a patch or minor release where technically appropriate. Stage boundaries do not restrict CSS support.

---

## 16. MISSED OBJECTIVES AND CARRY-FORWARD

If a technical, schedule, or adoption objective is not achieved, the project shall:

1. Record the unmet objective.
2. Evaluate the cause.
3. Review relevant community feedback.
4. Reassess priorities.
5. Carry appropriate objectives into later planning and revise dates where justified.

Delays remain part of the documented development history.

---

## 17. DROPPED AND DEFERRED

| Item | Status | Reason |
| --- | --- | --- |
| Developer-defined aliases | Dropped | Fragments the language, adds tooling cost, duplicates TypeScript functions |
| Browser-runtime charting libraries | Not supported | Conflicts with the zero-runtime principle |
| Node-edge `network` graphs | Deferred (post Stage 3) | Requires a separate layout engine |
| Cross-file sharing of `Options` members | Deferred | Same-file scope first |
| Remote font loading (for example, Google Fonts) | Deferred | Privacy and third-party request concerns; self-hosted fonts first |

---

## 18. FORMAL DECLARATION

Effective **11 October 2026**, NEURAL-Y establishes this Charter as the declared governance framework for RazorDelCSS and supersedes Charter v1.2.

The project commits to:

* Developing on a single 1.x release line in three additive stages;
* Targeting Stage 1 by **25 December 2026**, Stage 2 by **31 July 2027**, and Stage 3 by **31 January 2028**, subject to §8;
* Releasing each stage only when its acceptance checklist is complete;
* Measuring adoption by the indicators in §9;
* Keeping validation checks always on and output free of runtime dependencies;
* Following the compatibility, deprecation, and security policies above; and
* Documenting missed objectives rather than removing them.

This Charter remains in effect until superseded by a later Development Governance Charter.

---

## DECLARATION RECORD

**Project:** RazorDelCSS
**Organization:** NEURAL-Y
**Document:** Development Governance Charter
**Charter Version:** 1.3
**Effective Date:** 11 October 2026
**Declaration Identifier:** `NEURAL-Y/RZCSS/GOV/2026/10/11`
**Status:** PUBLIC
**Verification:** Published as a signed Git tag (`charter-v1.3`); the tag signature is the authoritative record of this declaration.

---

## FINAL GOVERNANCE STATEMENT

> **RazorDelCSS shall validate before it emits, release when ready, measure adoption by real use, and treat every stage as a measurable technical progression.**

**NEURAL-Y**
**RazorDelCSS Development**
**11 October 2026**
