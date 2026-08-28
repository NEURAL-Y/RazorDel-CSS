# Contributing to RazorDel-Css

All contributions must be via Pull Request. No direct push to `main`.

## How to Contribute

1. Fork -> Branch `feat/your-feature` -> PR to `main`
2. One feature / fix per PR
3. Must include test or example if you change parser / compiler logic
4. CI must pass

## Core Community Member

### BOOTSTRAP PHASE - First 10 Core Members [ACTIVE NOW]

Since I am currently the only contributor, first 10 core members have special rule:

> **You need only 1 Quality PR to become Core.**

Quality PR means:
- Real feature, bug fix, parser rule, compiler improvement, or solid docs/tests
- Not a typo, formatting, or AI spam
- Reviewed and merged

Final invite decision during bootstrap stays with @NEURAL-Y.

This rule ends after 10 core members.

### After Bootstrap - Full Rules (Future Scale)

Once we have 10 core members, meet ONE condition:

**A) 1 Major Impact**
- New system: `container: flex/grid` engine, animation system, error analyzer
- Or architecture rewrite or >30% compile performance improvement

**B) 10 Middle-Level PRs**
- New parser rule, compiler transform, IR change, significant refactor

**C) 15 Small Improvements**
- Bug fixes, error message improvements, tests, docs
- Spam rule: typo / formatting / single-line = 0.5 PR

### Core Benefits

- Review other PRs
- Direct commit access to all non-main branches (`dev/*`, `feature/*`, `experimental/*`) with your name
- Refer other developers to core team
- Merge authority on `main`
- **Governance Power: Core community can change CONTRIBUTING.md and PR rules by voting**

### Governance - Voting to Change Rules

Core members can propose and change contributing and pull request rules:

- Any core member can open a Proposal PR to update `CONTRIBUTING.md` or merge policy
- Voting period: 7 days
- Pass condition:
    - If total core < 10: Requires >50% YES votes + owner approval
    - If total core >= 10: Requires >60% YES votes to pass
- Each core member = 1 vote
- Owner @NEURAL-Y has veto during bootstrap, advisory vote after

This makes RazorDel-Css community-owned.

### Merge Policy

- `main` is protected. PR only.
- If total core < 3: Requires 1 core approval to merge
- If total core >= 3: Requires 2 core approvals to merge
- Core can refer another core member for review before merging
- No force push allowed

### Branch Flow
dev--> main
