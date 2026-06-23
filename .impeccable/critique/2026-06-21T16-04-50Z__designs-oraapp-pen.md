---
target: designs/oraapp.pen
total_score: 21
p0_count: 0
p1_count: 2
p2_count: 3
p3_count: 0
timestamp: 2026-06-21T16-04-50Z
slug: designs-oraapp-pen
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading/sync states, no data freshness indicator |
| 2 | Match System / Real World | 3 | Banking terms correct, "OraScore" needs explanation |
| 3 | User Control and Freedom | 2 | No drill-down or customization, tab bar is the only navigation |
| 4 | Consistency and Standards | 3 | Cards consistent, floating tab bar unconventional for banking |
| 5 | Error Prevention | 2 | Read-only mockup, no error states shown |
| 6 | Recognition Rather Than Recall | 3 | Icons+labels on everything, familiar categories |
| 7 | Flexibility and Efficiency | 1 | No shortcuts, no customization, single view |
| 8 | Aesthetic and Minimalist Design | 3 | Clean dark mode, but 5 categories + insight overloads dashboard |
| 9 | Error Recovery | 1 | No error states, no recovery paths |
| 10 | Help and Documentation | 1 | No tooltips, no help, "OraScore" unexplained |
| **Total** | | **21/40** | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment**: The Revolut-inspired dark mode direction avoids the most common AI tells (cream backgrounds, pill-shaped cards, gradient text). The coral accent on dark bg is a legitimate choice. However, the layout is still card-stack linear — section after section with no visual break beyond internal padding. The floating tab bar with rounded corners reads as "designed" but doesn't match mobile banking conventions where full-width tab bars are the standard. The insight card's yellow icon (#FFC043) clashes with the coral (#FF5A5F) accent and breaks the color system.

**Deterministic scan**: Skipped — target is a Pencil design file, not markup. No HTML/CSS to scan.

## Overall Impression

Dark mode direction is strong. The coral accent works on dark bg. But the dashboard tries to show too much at once (balance, 4 quick actions, score card, 5 budget categories, insight) without visual prioritization. Missing the critical cashflow metrics (credits/debits/net flow) that make a financial dashboard useful. The color system has an inconsistency: yellow insight icon vs coral accent.

## What's Working

1. **Balance prominence**: The 44px Playfair Display balance with "+12%" change immediately answers the user's first question ("how much money do I have?").
2. **Card consistency**: Dark cards (#1A1A1A) on dark bg (#0D0D0D) with subtle borders create coherent visual rhythm.
3. **Score focus**: The OraScore with gauge bar and "+21 pts" trend gives clear, actionable feedback on financial health.

## Priority Issues

**[P1] Missing cashflow metrics**: The dashboard shows balance and budget breakdown but lacks the essential cashflow summary (total credits, total debits, net flow). Per the API, these are the primary data points users check.
- **Why**: Users open a financial dashboard to see "what came in vs what went out." Without this, the dashboard is incomplete.
- **Fix**: Replace the 4 quick actions row (Score/Objectifs/Conseils/Plus) with a 3-column cashflow stats row: Revenus (+450k), Dépenses (-385k), Flux net (+65k).
- **Suggested command**: `$impeccable layout`

**[P1] No data freshness or sync indicator**: There's no "last updated" timestamp, loading skeleton, or sync indicator.
- **Why**: Financial data that's hours stale is worse than useless. Users need to know if what they see is real-time.
- **Fix**: Add a subtle "Dernière sync: il y a 2 min" label at the top or a small sync dot in the status bar.
- **Suggested command**: `$impeccable polish`

**[P2] Insight icon color breaks the accent system**: The lightbulb uses #FFC043 (yellow) while the app accent is #FF5A5F (coral).
- **Why**: Color inconsistency erodes polish. Every colored element should belong to the palette.
- **Fix**: Use coral #FF5A5F for the lightbulb icon, or create a semantic color role for insight/info icons.
- **Suggested command**: `$impeccable colorize`

**[P2] Floating tab bar is unconventional for banking**: Users expect a full-width tab bar attached to the bottom, not a floating capsule. Floating capsule tabs are more common in social/creative apps.
- **Why**: Banking apps should follow established mobile conventions to build trust and predictability.
- **Fix**: Full-width tab bar attached to bottom, with subtle top border. Keep the coral accent on active tab.
- **Suggested command**: `$impeccable layout`

**[P2] 5 budget categories overwhelm the dashboard**: Logement, Alimentation, Transport, Loisirs, Autre — 5 items with bars and percentages is a lot for a dashboard overview.
- **Why**: The dashboard should answer "what matters most" not show everything. 3 categories max for dashboard; the rest go to the Analyse screen.
- **Fix**: Show top 3 categories on dashboard, "Voir tout →" link to Analyse.
- **Suggested command**: `$impeccable distill`

## Persona Red Flags

**Alex (Power User)**: No quick-glance cashflow metrics. Must scroll through 5 budget bars to find net flow. Will abandon the dashboard for a spreadsheet.

**Jordan (First-Timer)**: Sees "OraScore 75" and "Très bien" but doesn't know what the score means, how it's calculated, or what to do about it. No tooltip, no explanation link, no next action. Hesitates before tapping anything.

**Casey (Mobile/Distracted)**: Floating tab bar at 16px from bottom is unreachable by thumb. On a crowded bus, will accidentally tap the wrong section while trying to reach the floating nav.

## Minor Observations

- "Sur 25-30 ans · Profil investisseur" text in Score card is confusing — is this the user's age bracket or investment timeline?
- Quick action "Plus" (dots-three icon) is a mystery meat button — user doesn't know what it does without tapping
- "+21 pts ce mois" in green is good, but no context on what a good score increase looks like

## Questions to Consider

- "If a user opens this dashboard for 5 seconds, what's the one thing they must see?"
- "Does the floating tab bar build trust or reduce it?"
- "What would make the OraScore actionable rather than just informative?"
