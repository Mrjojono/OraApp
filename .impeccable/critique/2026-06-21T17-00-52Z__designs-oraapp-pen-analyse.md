---
target: Analyse page designs/oraapp.pen
total_score: 24
p0_count: 0
p1_count: 1
p2_count: 3
timestamp: 2026-06-21T17-00-52Z
slug: designs-oraapp-pen-analyse
---
## Design Health Score: 24/40 — Acceptable

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Data clearly presented, but no month/period indicator |
| 2 | Match System / Real World | 3 | French labels correct; "Ratio depenses/revenus" clear |
| 3 | User Control and Freedom | 2 | Read-only page; no way to filter by month or drill into categories |
| 4 | Consistency and Standards | 3 | Matches Dashboard cards; standard mobile vertical scroll |
| 5 | Error Prevention | 2 | Read-only; limited concern, but no empty/loading states designed |
| 6 | Recognition Rather Than Recall | 3 | Color-coded categories, clear labels |
| 7 | Flexibility and Efficiency | 1 | No shortcuts, filters, or customization |
| 8 | Aesthetic and Minimalist Design | 3 | Clean but 6 stacked cards = dense |
| 9 | Error Recovery | 0 | N/A for read-only — no error states |
| 10 | Help and Documentation | 1 | Only AdviceCard provides guidance |
| **Total** | | **21/36** (H9 excluded) | **Acceptable** |

## Anti-Patterns Verdict

**LLM assessment**: Feels intentionally designed — dark mode + coral accent avoids the generic SaaS-cream look. Card grouping is logical. The visual language is consistent with the Dashboard.

**Deterministic scan**: Not applicable — `.pen` isn't a markup format.

- ✅ No gradient text, glassmorphism, or side-stripe borders
- ✅ No numbered section markers (01/02/03)
- ✅ No tiny uppercase tracked eyebrows
- ✅ No hero-metric template
- ⚠️ Card-heavy — 6 stacked cards in one page
- ⚠️ RecVarCard has 2 cards inside it — borderline nested cards

## Cognitive Load: 0/8 failures — LOW

## Overall Impression

A clean, logical analyse page that mirrors the Dashboard's visual language. The flow from summary → categories → split → ratio → advice tells a story. The gauge bug undermines credibility.

## What's Working

1. **Information architecture**: Summary → Categories → Recurrent/Variable → Ratio → Advice is the right narrative arc.
2. **Color strategy in categories**: Each category gets a distinct hue — makes visual scanning fast.
3. **Consistent card system**: Same fill, radius, stroke, padding as Dashboard.

## Priority Issues

### [P1] Gauge bar width doesn't match percentage
The ratio gauge fill bar is 150px wide in a 394px container (~38%), but text says "45%".
**Fix**: Set fill bar width to 177 (394 × 0.45).

### [P2] No filter or period selector
No way to change month. Users can't compare with last month.
**Fix**: Add month picker or left/right arrows in header.

### [P2] Categories don't link to detail view
Unlike Dashboard's "Voir tout →", categories have no drill-down affordance.
**Fix**: Add tap affordance per category row.

### [P2] Card density — 6 stacked sections
Every section is an identically-styled card.
**Fix**: Merge Summary into header, or redesign RecVar as single card.

### [P3] Nested cards in RecVarCard
Recurrentes and Variables have full card styling inside a wrapper.
**Fix**: Remove inner card borders, use background tint instead.

## Persona Red Flags

**Alex (Power User)**: No filtering, no tap-to-drill, read-only = high abandonment.
**Sam (Accessibility)**: Coral dot #FF5A5F on #1A1A1A = 4.9:1 ✓. Green badge text #30D158 on #30D15820 bg — borderline WCAG AA fail for small text.
**Casey (Mobile User)**: TabBar in thumb zone ✓. RecVar two-column at ~173px each — text could wrap.

## Minor Observations
- Title "Analyse" could be more specific: "Analyse des dépenses"
- "Sain" badge contrast borderline
- No empty state for 0 transactions
- AdviceCard icon generic "lightbulb" — could be more specific
- Ratio interpretation copy is good UX writing
