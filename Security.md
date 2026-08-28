# Security Policy for RazorDelCSS

## Overview
RazorDelCSS is a JavaScript-based styling language that compiles to traditional CSS. Because it parses JavaScript-like syntax, evaluates functions, and generates CSS, security — especially supply-chain and injection safety — is a top priority.

We appreciate responsible disclosure.

## Supported Versions

| Version | Supported | Notes |
| :--- | :--- | :--- |
| `main` branch | ✅ | Active development |
| Latest release on GitHub | ✅ | Security patches provided |
| < 0.1.0 / older tags | ❌ | Please upgrade |

## How to Report a Vulnerability

**DO NOT open a public GitHub issue for security vulnerabilities.**

Please report privately via:

**1. GitHub Private Vulnerability Reporting (Preferred)**
Go to this repo → `Security` tab → `Report a vulnerability`

**2. Email**
`helloiamnew.main@gmail.com` or DM to the maintainer via GitHub: [@NEURAL-Y](https://github.com/NEURAL-Y)

Include:
- Description of the vulnerability
- Minimal reproduction (RazorDel code snippet + compiled output)
- Impact — what an attacker could achieve
- Environment: Node version, RazorDelCSS version/commit
- If possible, suggested fix

### What to include for RazorDelCSS-specific issues:

- **Parser / Compiler:** Malicious input that causes crash, infinite loop, ReDoS, or incorrect CSS that could lead to XSS (e.g., `javascript:` URL injection, expression injection)
- **Function Evaluation:** If user-defined JS functions in RazorDel can execute arbitrary code during compilation
- **Build Tool Integration:** Vulnerabilities when used via CLI / bundler plugin

## Our Response Process

1.  **Acknowledge** — within 48 hours
2.  **Triage** — we reproduce and assess severity within 5 days
3.  **Fix** — we develop a patch on a private branch
4.  **Release & Disclosure** — we publish a new release and a GitHub Security Advisory with CVE (if applicable) after the fix. You will be credited unless you want to remain anonymous.

We follow a **90-day coordinated disclosure** policy.

## Scope

**In Scope:**
- `parser/` — parsing of RazorDel syntax
- `compiler/` — compilation to CSS
- `analyzer/` — error detection logic
- Official CLI and bundler integration
- Any ReDoS / prototype pollution / code execution via compilation

**Out of Scope:**
- Vulnerabilities in generated CSS used in an unsafe way by downstream apps (e.g., user putting unsanitized content into CSS)
- DoS due to extremely large user-authored files (unless it causes process crash)
- Issues in dev dependencies or examples
- Social engineering

This is a CSS compiler, not a runtime sandbox. RazorDelCSS code is expected to be authored by developers, not untrusted end-users. If you plan to compile RazorDelCSS from untrusted users, you MUST run compilation in a sandboxed environment.

## Safe Harbor

We will not pursue legal action against you if you:
- Test only on your own installations
- Do not access, modify, or delete others' data
- Do not degrade service for other users
- Report in good faith without demanding compensation

## Security Best Practices for Users

1.  **Never compile untrusted RazorDelCSS** on your build server without isolation — it's JavaScript-based and may evaluate functions.
2.  Always review compiled CSS output before shipping.
3.  Pin your `RazorDel-Css` version and check Releases for security notes.
4.  If you build a plugin/loader for RazorDelCSS, ensure you disable arbitrary file system access.

## Security Updates

Security updates will be published via:
- GitHub Releases
- GitHub Security Advisories (GHSA)

Please watch this repo or enable Dependabot.

---

Thank you for helping make RazorDelCSS safer for everyone.

Maintained by NEURAL-Y
