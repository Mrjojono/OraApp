---
target: designs/oraapp.pen
total_score: 20
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 1
timestamp: 2026-06-21T13-45-10Z
slug: designs-oraapp-pen
---
# Critique: Orabank OraApp — Dashboard + Analyse

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading/empty/error states visible |
| 2 | Match System / Real World | 3 | Financial terminology correct, "Bonjour, Joan" incomplete (API returns "Joan Doe") |
| 3 | User Control and Freedom | 2 | No back/undo visible; Pencil designs are static |
| 4 | Consistency and Standards | 3 | Good visual consistency between screens, but AlertBanner/AdviceCard layer missing |
| 5 | Error Prevention | 1 | No visual constraints or input validation shown anywhere |
| 6 | Recognition Rather Than Recall | 3 | Clear labels, Phosphor icons labeled; dashboard metrics obvious |
| 7 | Flexibility and Efficiency | 1 | Static screen only; no interactions designed |
| 8 | Aesthetic and Minimalist Design | 3 | Clean Premium Utilitarian Minimalism; no visual noise |
| 9 | Error Recovery | 1 | No error states or recovery paths designed |
| 10 | Help and Documentation | 1 | No contextual help, onboarding, tooltips, or guidance |
| **Total** | | **20/40** | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment**: The designs do not look AI-generated. The Premium Utilitarian Minimalism direction (warm monochrome #F7F6F3, 1px borders, DM Sans, Playfair Display sparingly) avoids the common "dark mode SaaS" or "glassmorphism" tells. The bento layout with metric cards is appropriate for a financial dashboard and does not feel templated. However, two patterns are close to the line:
- The greeting "Bonjour" is good, but without the complete username from API (`username`: "Joan Doe") it feels incomplete
- The bottom NavBar is a standard pattern, but the Phosphor icon choice keeps it from feeling generic

**Deterministic scan**: Detector on DESIGN.md returned zero findings (expected for a markdown spec).

## Overall Impression

The design foundation is solid — Premium Utilitarian Minimalism suits a financial monitoring app targeting young African professionals. The Dashboard flows logically (balance → metrics → score → transactions) and the colour usage (green only for positive data, red for expenses) communicates clearly without decoration. The Analyse screen mirrors the same pattern with appropriate expense-specific content.

The single biggest gap: **the advice/recommendation layer is entirely missing from both screens.** The API provides rich advice data (`GET /advice` gives SPENDING_SPIKE, SAVINGS_DROP, OVERDRAFT_RISK, etc.) and the Score screen should show recommendations — but none of this is visible yet.

## What's Working

1. **Visual hierarchy**: The Dashboard has a clear information gradient (balance → metrics → score → transactions). The eye naturally goes to the Playfair Display balance amount first, then the bento metrics, then the score card.
2. **Color discipline**: Green #5EAA31 is reserved for positive financial signals (revenue, good score). Red #D84C3E for expenses and warnings. The warm monochrome background avoids the sterile white-finance look.
3. **Card design**: 1px #EAEAEA borders with 8px radius, no shadows — clean, editorial, hardware. No nested cards.

## Priority Issues

- **[P1] No advice/recommendation layer**: The API returns `GET /advice` with types like SPENDING_SPIKE, OVERDRAFT_RISK, SAVINGS_DROP — but neither Dashboard nor Analyse display these. Also missing: `GET /score/recommendations` and `GET /score/explanation` endpoints. Fix: Add AdviceCard components to Dashboard (after BentoRow, after NetSection) and Analyse (after RatioCard, after RecCard). Create Score screen with RecommendationList.

- **[P1] No empty/loading/error states**: Neither screen has states for 0 transactions, loading skeleton, error with retry, or first-time user. The API clearly has edge cases (0 expenses, no data yet). Fix: Define skeleton frames for each section, an error banner with retry CTA, and an empty state illustration for each card type.

- **[P2] "Bonjour" incomplete**: The Dashboard greeting says "Bonjour," without the full name. The API `POST /auth/me` returns `username: "Joan Doe"`. Fix: Display full username.

- **[P2] No score detail navigation**: The ScoreCard on Dashboard is a summary only. There's no path to the full Score screen. The tab bar has a Score tab in the NavBar but no content designed for it yet. Fix: Make ScoreCard tappable → navigates to Score screen.

- **[P3] Transaction list anti-pattern**: The "Dernières transactions" section has no dividers (by DESIGN.md spec), but 4 items stacked vertically with no visual separation may feel cramped when more items are present. The API returns variable-sized data. Fix: Verify at 8+ items the list remains readable; consider 1px bottom border at 5+ items.

## Persona Red Flags

**Alex (Power User)**: No shortcuts, no bulk actions. Must scroll through all transactions individually. Score card on Dashboard is static — wants to tap through to details. 4-tab nav is efficient but no swipe gesture between tabs.

**Jordan (First-Timer)**: No onboarding designed yet. "Analyse" tab label is French — native but could confuse if the app is used in a bilingual context. No contextual help explaining "Ratio BCEAO" or "Score composants".

**Sam (Accessibility)**: No visible focus indicators. Color-only meaning for positive/negative amounts (green/red). NavBar icons are labeled with text (good). No screen reader testing possible at this stage.

## Minor Observations

- Analyse frame height is 1100px (content overflows due to 50px Pencil layout offset) — clean up when exporting to code
- Phosphor icons are well-chosen: calendar, funnel, house, music-note, bell all appropriate
- CategoryItem progress bars at 6px height, 3px radius — should match ScoreCard bar at 4px height, 2px radius for consistency
- The ratio card shows "Seuil BCEAO: 33%" — good copy but could link to an explanation BottomSheet

## Questions to Consider

- "What if the Dashboard's ScoreCard was draggable to reveal the full Score screen?"
- "Does the bottom NavBar need 4 items or could a 5th 'Conseils' tab centralize all advice?"
- "What would the first-time experience look like when all transactions are zero?"

## Run Notes

- Target: designs/oraapp.pen (Pencil design file)
- Slug: designs-oraapp-pen
- Ignore list: none
- Assessment A: Design review (LLM, Pencil layout data)
- Assessment B: Detector on DESIGN.md — no findings (markdown file)
- Browser: Not applicable (Pencil file, no HTML)
