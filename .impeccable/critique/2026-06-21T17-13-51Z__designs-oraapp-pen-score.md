---
target: Score page designs/oraapp.pen
total_score: 23
p0_count: 0
p1_count: 0
p2_count: 3
p3_count: 2
timestamp: 2026-06-21T17-13-51Z
slug: designs-oraapp-pen-score
---
## Design Health Score: 23/40 — Acceptable

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Score visible, history shows progression, but no score composition explanation |
| 2 | Match System / Real World | 3 | Clear French labels, "Très bien" badge, familiar categories |
| 3 | User Control and Freedom | 2 | Read-only, no history range filter |
| 4 | Consistency and Standards | 4 | Matches Dashboard/Analyse card system and TabBar perfectly |
| 5 | Error Prevention | 2 | Read-only, limited concern |
| 6 | Recognition Rather Than Recall | 3 | Color-coded categories, bar chart with score labels |
| 7 | Flexibility and Efficiency | 1 | No shortcuts or customization |
| 8 | Aesthetic and Minimalist Design | 3 | Clean but title flush-left vs card padding mismatch; 113px bottom gap |
| 9 | Error Recovery | 0 | N/A |
| 10 | Help and Documentation | 2 | AdviceCard + badge context; no score calculation explanation |
| **Total** | | **23/40** | **Acceptable** |

## Anti-Patterns Verdict

- ✅ No gradient text, glassmorphism, or side-stripe borders
- ✅ No numbered section markers or uppercase eyebrows
- ✅ No hero-metric template (the score IS the metric, earned placement)
- ✅ No nested cards
- ⚠️ ScoreHero (integrated) + 2 cards (CatImpact, History) + 1 Advice = 4 sections. Good density. Better than Analyse's original 6.
- ⚠️ History bars with only 3 months: thin data story.

## Cognitive Load: 0/8 — LOW

## What's Working

1. **ScoreHero integration**: 48px display score + badge + gauge + trend + CTA in one compact section. No card, no clutter. Strong hierarchy.

2. **Color-coded history progression**: Avr(gray) → Mai(amber) → Juin(coral) tells a visual story without reading numbers. Bars with score labels on top are clear.

3. **Consistency**: All 3 pages now share the same card system (#1A1A1A fill, 14px radius, #2C2C2E stroke, 24px padding). TabBar identical. Visual language locked.

## Priority Issues

### [P2] Large empty gap at bottom (113px)
**What**: Content ends at screen y:802 but TabBar starts at y:915. ~11.6% of the screen is empty space between content and tab bar.
**Why it matters**: Makes the page feel incomplete or under-designed. Users scrolling down hit dead space.
**Fix**: Add a "Composition du score" section explaining the 5 categories' contribution, or increase card sizes/spacing.
**Suggested command**: `layout`

### [P2] Title alignment inconsistent with cards
**What**: Title "Score" is flush left (x:0 within Content) while card content starts at x:24 (padding). The Analyse page has the same issue.
**Why it matters**: A small but noticeable inconsistency. The title looks disconnected from the card content.
**Fix**: Add left padding to Content (padding:[0,24,0,24]) or shift the title to align with card content.
**Suggested command**: `layout`

### [P2] No score composition explanation
**What**: "75/100" appears with no breakdown of how it's calculated. Users see a number but don't know what it means or how to improve.
**Why it matters**: The score is OraApp's core metric. Without understanding its composition, users can't act on it. The AdviceCard addresses one behavior (loisirs) but doesn't connect back to the score.
**Fix**: Add a small "Score calculé à partir de 5 catégories" explanation, or integrate it into the CatImpact card title.
**Suggested command**: `clarify`

### [P3] History bars — thin dataset, no trend line
**What**: Only 3 monthly bars. The progression is clear but a connecting line or more months would strengthen the narrative.
**Why it matters**: Users can't see longer-term trends. 3 months is barely a trend.
**Fix**: Extend to 6 months (or show a dotted projection for next month).
**Suggested command**: `shape`

### [P3] Category rows — 5 elements per row on 346px
**What**: Each category row has: dot(8px) + gap(10) + name + gap(10) + label + bar + barfill. That's 7 visual elements in ~346px.
**Why it matters**: Dense. The label text ("Epargne reguliere", "Depense elevee") is secondary to the bar — could be truncated or moved.
**Fix**: Shorten labels to 1-2 words, or use icon instead of text label.
**Suggested command**: `layout`

## Persona Red Flags

**Alex (Power User)**: No way to change history range (3 months only). Can't tap a history bar to see details. Score page is read-only — Alex would expect to tap categories, explore history, compare months.

**Casey (Mobile User)**: Large 48px score number — thumb zone at bottom ✓. 113px empty gap means Casey has to scroll further to reach TabBar. Category rows dense on 346px — might mis-tap.

**Jordan (First-Timer)**: "75/100" and "Très bien" are clear. But "Impact par catégorie" with bars — Jordan might not understand what the bars represent (contribution vs spending). No explanation of score calculation. AdviceCard helps but assumes context.

## Minor Observations
- AdviceCard bg #1A3A2A is darker than the standard #3A2A1A (amber advice) — good tonal distinction for positive vs warning messages
- "Recommandations →" CTA in ScoreHero and "Voir les conseils personnalisés →" in AdviceCard — similar CTAs, slightly different copy. Could be unified
- History bars at 40px width: with 16px gap, they're clear but could be 48px for more visual weight
- The gauge "75/100" → 260px fill in 346px container = exact match ✓

## Questions
1. **Bottom gap**: Veux-tu que j'ajoute une section "Composition du score" pour remplir l'espace, ou j'étale les cartes existantes avec plus d'espacement ?
2. **Title alignment**: Je corrige l'alignement du titre "Score" pour qu'il matche le padding des cartes (24px) ?
