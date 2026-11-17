# RAZORDELCSS

## DEVELOPMENT GOVERNANCE CHARTER

**Project:** RazorDelCSS  
**Organization:** NEURAL-Y  
**Document Type:** Development Governance Charter  
**Document Version:** 2.0  
**Effective Date:** 17 November 2026  
**Supersedes:** Charter v1.3 (11 October 2026)  
**Status:** Draft for public declaration

---

## 1. PURPOSE

This Charter defines the development direction, release expectations, acceptance criteria, and governance principles for RazorDelCSS.

RazorDelCSS is a TypeScript-based styling language and compiler. It is intended to make design and styling easier to express while validating source code at compile time and generating standard output.

This Charter gives contributors, users, and adopters a clear view of the project's priorities and how progress will be evaluated.

---

## 2. DEVELOPMENT DIRECTION

RazorDelCSS will develop through three major capability stages:

| Version | Name | Primary focus |
| --- | --- | --- |
| **V1** | Compiler Foundation | Compiler architecture, core components, design/styling components, and broad CSS property support |
| **V2** | Developer Experience | Better diagnostics and guidance, improved compilation output, and concise styling logic |
| **V3** | Integrated GUI Design | Built-in screen/GUI design and management capabilities |

Each version builds on the capabilities of the previous version. The roadmap describes intended development priorities; a feature is not considered complete merely because it appears in this Charter.

---

## 3. CORE PRINCIPLES

1. **Validation first.** Analyze and validate styling before generating output.
2. **Checks always run.** Configuration may determine whether a diagnostic stops compilation or is reported while compilation continues. It must not silently disable validation.
3. **Standard output.** Generated styles should remain usable outside RazorDelCSS. Where applicable, output should be standard CSS and SVG.
4. **No unnecessary runtime dependency.** The core compilation workflow should produce usable output without requiring RazorDelCSS code to run in the browser.
5. **Deterministic builds.** The same source and configuration should produce the same output. Compile-time functions must have clearly controlled behavior.
6. **Readiness over calendar.** Target dates guide planning; they do not justify releasing knowingly unstable features.
7. **Honest claims.** Property coverage, compatibility, performance, and adoption claims must be supported by tests or published evidence.
8. **Clarity over cleverness.** Reduce repetitive developer effort without making the language difficult to understand.
9. **Incremental capability.** New design features should fit the compiler architecture rather than becoming disconnected features.

---

## 4. RELEASE AND VERSIONING MODEL

### 4.1 Version stages

V1, V2, and V3 describe major development stages and capability milestones. They do not, by themselves, define package version numbers. Package releases should follow the project's published versioning policy.

### 4.2 Compatibility

The project should preserve valid existing source wherever practical. Any syntax or output change that breaks existing projects must be documented with a migration path.

### 4.3 Readiness

A version stage is ready when its acceptance criteria have been met, its documentation is available, and maintainers consider the implementation stable enough to release.

A stage may be delayed when its acceptance criteria are incomplete. Delays and changes in scope should be documented rather than hidden.

---

## 5. V1 — COMPILER FOUNDATION

**Primary objective:** Establish a sound compiler architecture and introduce the components needed to express design and CSS styling through RazorDelCSS.

### Scope

- Define and implement the compiler architecture and its major components.
- Develop the core processing pipeline, including lexical analysis, parsing, semantic analysis/validation, and output generation, as appropriate to the language design.
- Introduce and document the core components used to describe design and styling.
- Expand CSS property support, targeting **500+ CSS properties**.
- Define how RazorDelCSS properties and components map to generated CSS.
- Establish consistent diagnostics for invalid or unsupported source.
- Maintain reliable CSS output and any already-supported SVG output.
- Provide documentation, examples, and automated tests for the public language surface.

### Acceptance checklist

- [ ] The compiler architecture and component responsibilities are documented.
- [ ] The core compiler pipeline is implemented and covered by tests.
- [ ] Core design and styling components have documented syntax and behavior.
- [ ] Support for 500+ CSS properties is implemented and verified through a documented property-coverage list and tests.
- [ ] Supported properties compile to the expected CSS output.
- [ ] Invalid, unsupported, and incompatible values produce useful diagnostics.
- [ ] Representative source programs have snapshot or equivalent output tests.
- [ ] The quick start and language reference match the released implementation.
- [ ] Continuous integration passes on the supported runtime versions.
- [ ] No known critical bug causes data loss, crashes on valid input, or silently incorrect output.

**Coverage note:** The 500+ property target refers to supported CSS property coverage. It does not imply that every CSS feature, browser-specific behavior, selector, at-rule, or value grammar is automatically supported. The supported surface must be documented precisely.

---

## 6. V2 — DEVELOPER EXPERIENCE AND COMPILATION QUALITY

**Primary objective:** Make RazorDelCSS more expressive and comfortable to use, while improving diagnostics and the quality and usefulness of generated output.

### Scope

- Improve error messages, warnings, and diagnostic context.
- Provide helpful explanations and guidance so developers can understand and correct styling mistakes.
- Improve compilation output for correctness, consistency, readability, and maintainability where applicable.
- Introduce concise, one-line ways to express common styling or design logic.
- Keep concise syntax understandable and predictable; avoid shorthand that creates ambiguity.
- Improve the developer workflow based on feedback and real usage.
- Document compatibility, formatting, and migration behavior for new syntax and output changes.

### Acceptance checklist

- [ ] Diagnostics identify the issue and provide actionable guidance where possible.
- [ ] Errors and warnings include source locations and stable identifiers where applicable.
- [ ] New concise/one-line syntax has a documented grammar and clear semantics.
- [ ] Concise syntax compiles to the same intended result as its expanded equivalent.
- [ ] Tests cover valid, invalid, ambiguous, and boundary cases for new syntax.
- [ ] Generated output is tested for correctness and stability.
- [ ] Output changes and compatibility implications are documented.
- [ ] Examples demonstrate how the new features reduce repetitive code without hiding behavior.
- [ ] Documentation and quick-start material are updated for every new public feature.
- [ ] No known critical compiler or output correctness bugs remain at release.

---

## 7. V3 — INTEGRATED GUI DESIGN AND MANAGEMENT

**Primary objective:** Extend RazorDelCSS beyond source-based styling by introducing built-in capabilities for visual screen/GUI design and management.

### Scope

- Introduce an integrated visual environment for screen and GUI design.
- Provide ways to create, inspect, and manage GUI elements and layouts.
- Connect visual design operations to RazorDelCSS components and styling logic.
- Define how visual changes are represented in project source and compiler inputs.
- Support a workflow that allows developers to move between visual editing and code-based editing.
- Preserve understandable, maintainable output and avoid making projects dependent on an opaque visual-only format.
- Establish documentation for the GUI design workflow and its relationship to the compiler.

### Acceptance checklist

- [ ] The GUI design architecture and its relationship to the compiler are documented.
- [ ] Users can create and manage a documented set of screen/GUI elements.
- [ ] Layout and styling changes can be inspected and represented through a documented project format or source workflow.
- [ ] Visual edits and code edits have clearly defined synchronization behavior.
- [ ] Generated or updated styling output is deterministic and covered by tests.
- [ ] Users can continue working with generated standard output outside the visual environment.
- [ ] The visual workflow has practical examples and user documentation.
- [ ] Known limitations and unsupported GUI behaviors are documented.
- [ ] No known critical data-loss or project-corruption bugs remain at release.

**Scope note:** Specific GUI widgets, screen-management features, layout systems, and editing interactions will be defined through implementation proposals and documented milestones. This Charter does not assume an unconfirmed feature list.

---

## 8. RELEASE READINESS

A version stage is released only when its acceptance checklist is complete and maintainers agree that the implementation is stable.

- A stage may be released earlier than its planning target if it is ready.
- A stage must not be released in a knowingly unstable state merely to meet a date.
- If a target date is missed, the reason and revised plan should be recorded.
- Features that are incomplete must be identified as planned, experimental, or deferred; they must not be presented as completed capabilities.

Target dates, when published, are planning commitments rather than guarantees.

---

## 9. ADOPTION AND QUALITY INDICATORS

RazorDelCSS should evaluate progress through actual use and technical quality, not popularity alone.

Useful indicators include:

- Public projects using RazorDelCSS.
- External contributors with merged pull requests.
- Issues and feature requests from users outside the maintainer team.
- Successful use across supported operating systems and runtime versions.
- Test coverage of documented syntax and compiler output.
- Reports of real-world compatibility and developer experience.

GitHub stars may be treated as a public signal of interest. They must never gate a release or substitute for technical quality.

---

## 10. SUPPORT POLICY

- The latest stable release line should receive bug fixes and compatibility updates.
- Security and critical fixes should follow the project's published support commitments.
- When support for an older release is discontinued, the change should be announced and documented.
- Experimental features must be clearly identified and must not be represented as stable APIs.

---

## 11. COMPATIBILITY, DEPRECATION, AND BREAKING CHANGES

- Existing valid source should continue to compile to equivalent output within a compatible release line.
- A deprecated feature should receive a warning and a documented migration path before removal.
- Breaking changes to syntax, compiler behavior, or output guarantees must be documented and released under the project's major-version policy.
- Output changes that alter rendered results should be treated as potentially breaking, except where correcting a documented bug.
- New shorthand syntax must have predictable expansion and must not silently change the meaning of existing source.

---

## 12. DECISION-MAKING AND ROLES

- The founding maintainer, NEURAL-Y, holds final decision authority while the project has one maintainer.
- As the maintainer team grows, maintainers should make decisions through documented discussion and consensus where practical.
- Maintainers may merge pull requests, triage issues, and approve releases.
- Contributors who consistently make high-quality contributions may be invited to take on maintainer responsibilities.
- Significant language or architecture changes should be discussed publicly before implementation.

---

## 13. LANGUAGE AND ARCHITECTURE CHANGE PROCESS

Significant changes to syntax, semantics, compiler architecture, or generated output should follow a lightweight proposal process:

1. Describe the problem and the intended improvement.
2. Explain the proposed design and relevant alternatives.
3. Identify compatibility, performance, and maintenance implications.
4. Allow community feedback where practical.
5. Record the decision and rationale.
6. Update the roadmap, tests, and documentation before release.

Small bug fixes and documentation corrections do not require a formal proposal.

---

## 14. SECURITY AND RELIABILITY

- Security vulnerabilities should be reported privately through the project's published security-reporting process.
- Compile-time operations must have clearly defined permissions and side effects.
- Features that read local files, load external resources, or execute user-provided logic must be reviewed for security and reproducibility.
- Any expansion of compile-time access should be documented and reviewed before release.
- Compiler crashes, project corruption, and silently incorrect generated output should be treated as high-priority defects.

---

## 15. COMMUNITY-INFORMED DEVELOPMENT

Development priorities may be informed by:

- User issues and feature requests.
- Bug reports and pull requests.
- Real-world project requirements.
- Framework and tooling compatibility.
- Community discussion and feedback.

Popularity is a signal, not authority. Requests should be evaluated for feasibility, compatibility, maintainability, performance, reliability, and architectural impact.

The CSS platform evolves continuously. New CSS properties and capabilities may be added as appropriate, with their support status and limitations documented.

---

## 16. MISSED OBJECTIVES AND CARRY-FORWARD

If a technical, schedule, or adoption objective is not achieved, the project should:

1. Record the unmet objective.
2. Evaluate the reason.
3. Review relevant user and contributor feedback.
4. Reassess scope and priorities.
5. Carry appropriate work into later planning and revise targets where justified.

Development history should remain transparent. Missed targets should not be silently removed from the record.

---

## 17. DEFERRED AND UNCONFIRMED SCOPE

The following details are intentionally not fixed by this Charter and require later design decisions:

- The complete list and exact syntax of V1 design/styling components.
- The exact CSS property coverage list and handling of browser-specific properties.
- The grammar and exact forms of V2 one-line styling logic.
- The precise V2 compilation-output enhancements.
- The V3 GUI widget catalogue, layout engine, screen-management model, and visual editor interactions.
- Any release dates not formally declared by NEURAL-Y.

These items should be specified through documentation, proposals, and implementation milestones rather than assumed in advance.

---

## 18. FORMAL DECLARATION

This document is proposed as **RazorDelCSS Development Governance Charter v2.0** for NEURAL-Y.

Upon formal adoption, it supersedes Charter v1.3 and establishes the following development direction:

- **V1:** Build the compiler architecture and core components, introduce design and styling components, and target support for 500+ CSS properties.
- **V2:** Improve the developer experience through better diagnostics and guidance, enhanced compilation output, and concise one-line styling logic.
- **V3:** Introduce integrated screen/GUI design and management capabilities.
- Release each stage only when its acceptance criteria are met.
- Preserve validation, reliability, compatibility, and clear documentation as core project commitments.
- Record changes in scope and missed objectives transparently.

This Charter remains in effect until superseded by a later Development Governance Charter.

---

## DECLARATION RECORD

**Project:** RazorDelCSS  
**Organization:** NEURAL-Y  
**Document:** Development Governance Charter  
**Charter Version:** 2.0  
**Effective Date:** 17 November 2026  
**Declaration Identifier:** `NEURAL-Y/RZCSS/GOV/2026/11/17`  
**Status:** DRAFT — pending formal adoption

---

## FINAL GOVERNANCE STATEMENT

> **RazorDelCSS shall build a reliable compiler foundation, make styling clearer and more productive, and evolve toward integrated visual design — without compromising validation, predictable output, or developer control.**

**NEURAL-Y**  
**RazorDelCSS Development**  
**17 November 2026**
