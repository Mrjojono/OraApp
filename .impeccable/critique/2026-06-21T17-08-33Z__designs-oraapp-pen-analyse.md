---
target: Analyse page designs/oraapp.pen
total_score: 24
p0_count: 0
p1_count: 0
p2_count: 0
timestamp: 2026-06-21T17-08-33Z
slug: designs-oraapp-pen-analyse
---
## Design Health Score: 24/40 — Acceptable (+3 depuis v1)

| # | Heuristic | Score (Δ) | Key Issue |
|---|-----------|-----------|-----------|
| 1 | Visibility of System Status | 3 (—) | Month selector added, still no loading states |
| 2 | Match System / Real World | 3 (—) | Clear labeling throughout |
| 3 | User Control and Freedom | 3 (+1) | Month selector + chevrons enable navigation/drill |
| 4 | Consistency and Standards | 3 (—) | Cohesive with Dashboard |
| 5 | Error Prevention | 2 (—) | Read-only, limited concern |
| 6 | Recognition Rather Than Recall | 4 (+1) | Chevrons signal tappability clearly |
| 7 | Flexibility and Efficiency | 2 (+1) | Month navigation added |
| 8 | Aesthetic and Minimalist Design | 3 (—) | 5 cards vs 6, cleaner |
| 9 | Error Recovery | 0 (—) | N/A read-only |
| 10 | Help and Documentation | 1 (—) | AdviceCard only |
| **Total** | | **24/40** (+3) | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment**: No AI-slop flags. The dark + coral direction is intentional and maintained.

**Deterministic scan**: N/A (.pen format).

## Cognitive Load: 0/8 — LOW ✓

## What's Improved Since v1

1. **✅ Gauge fixed**: 177px = 45% of 394px. No longer undermines credibility.
2. **✅ Month selector**: `◀ Juin 2026 ▶` floating right of the title. Gives the page a temporal dimension.
3. **✅ Drill-down affordance**: `>` chevron on every category row. Users now see they can tap for details.
4. **✅ Summary integrated**: No longer a card — sits flush as a header section. Reduces card count 6→5.
5. **✅ Nested cards fixed**: Rec/Var inner strokes removed. Still visually distinct via fill, but no redundant borders.

## Remaining Observations (P3)

- "Sain" badge: green #30D158 on #30D15820 bg → estimated ~3.5:1. Borderline WCAG AA fail for small text.
- Title "Analyse" still terse — "Analyse des dépenses" would be more descriptive.
- No empty/loading states designed (out of scope for current mockup).
- Categories chevrons are affordances only — no actual drill-down page exists yet.
