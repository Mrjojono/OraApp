---
target: designs/oraapp.pen
total_score: 22
p0_count: 0
p1_count: 2
p2_count: 2
p3_count: 0
timestamp: 2026-06-21T16-22-55Z
slug: designs-oraapp-pen
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Sync indicator added ✓, still no loading states |
| 2 | Match System / Real World | 3 | Banking terms correct, "OraScore" still unexplained |
| 3 | User Control and Freedom | 2 | No drill-down for budget/score, tab bar is the only navigation |
| 4 | Consistency and Standards | 3 | Coral consistent across all icons ✓ (insight fixed), floating tab bar still unconventional |
| 5 | Error Prevention | 2 | Static mockup, no error states shown |
| 6 | Recognition Rather Than Recall | 3 | Icons+labels on everything ✓, familiar categories |
| 7 | Flexibility and Efficiency | 1 | No shortcuts, no customization, single view |
| 8 | Aesthetic and Minimalist Design | 3 | Clean dark mode, 3 budget categories is better ✓, still dense |
| 9 | Error Recovery | 1 | No error states demonstrated |
| 10 | Help and Documentation | 1 | No tooltips, "OraScore" unclear for first-timers |
| **Total** | | **22/40** | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment**: Dark mode with coral accent avoids common AI tells. The layout now flows logically (solde → quick actions → score → budget → insight → tab bar). The sync indicator is a good touch. The floating tab bar with 16px corner radius still reads as more social-app than banking-app, but it's a deliberate stylistic choice. Main remaining issues: the dashboard is content-dense (5 sections plus tab bar), and there's no clear next-action for the user after glancing at their score.

**Deterministic scan**: Skipped — target is a Pencil design file.

## What's Working

1. **Logical hierarchy**: Balance first, then quick actions, then score, then budget detail. The user scans top-to-bottom naturally.
2. **Sync indicator**: "+12% ce mois · Sync il y a 2 min" is subtle but builds trust — user knows data is current.
3. **Coral accent consistency**: All interactive elements (insight icon, score bar, tab active, "Voir tout") now use the same coral #FF5A5F. Palette holds together.

## Priority Issues

**[P1] No actionable next step**: After seeing "OraScore 75 — Très bien", what does the user DO? There's no CTA, no "Comment améliorer", no link to recommendations.
- **Why**: A score without an action is trivia. Users need to know what to do next.
- **Fix**: Add a "Voir mes recommandations →" link at the bottom of the Score card, or make the score card tappable to navigate to the Score screen.
- **Suggested command**: `$impeccable polish`

**[P1] Dashboard is content-dense**: 5 sections (solde, quick actions, score, budget, insight) + tab bar = 6 distinct content blocks on one 844px screen.
- **Why**: Users on mobile need focus. 6 blocks compete for attention.
- **Fix**: Merge the insight card into the budget section (show the advice as part of the budget breakdown) or reduce quick actions to 3.
- **Suggested command**: `$impeccable distill`

**[P2] Quick action "Plus" is a mystery**: "Plus" with dots-three icon doesn't tell the user what it does before tapping.
- **Why**: Hidden affordances increase cognitive load. Users hesitate.
- **Fix**: Replace "Plus" with a specific action like "Aide" (question icon) or remove it entirely (3 actions is cleaner).
- **Suggested command**: `$impeccable clarify`

**[P2] Score gauge doesn't show max**: The bar shows 75 but doesn't indicate the max (100) or what "full" looks like.
- **Why**: A progress bar without a clear endpoint creates ambiguity.
- **Fix**: Add a subtle label "75/100" or a small "Excellent" endpoint label at the right end of the gauge.
- **Suggested command**: `$impeccable layout`

## Minor Observations

- "Améliorez votre épargne pour passer à Excellent" is good advice but vague — how much to save?
- Budget category amounts ("154 000") lack currency symbol for consistency with the balance display
- The tab bar active tab uses coral at 20% opacity (`#FF5A5F20`) — this is a good subtle highlight
- No avatar or user indicator in the header (Revolut shows user avatar/initials)

## Questions to Consider

- "What's the one thing you want the user to do after seeing their score?"
- "Does the dashboard answer 'how am I doing?' or 'what should I do?' — both?"
- "If a user has 5 seconds, what must they see?"
