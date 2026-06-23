---
target: "designs/oraapp.pen (5 screens: Dashboard + Analyse + Score + Revenue + Profile)"
total_score: 15
p0_count: 1
p1_count: 3
p2_count: 3
p3_count: 1
timestamp: 2026-06-21T14-05-09Z
slug: designs-oraapp-pen
---
# Critique: Orabank OraApp — Dashboard + Analyse + Score + Revenue + Profile (5 screens)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading/empty/error states visible across any screen |
| 2 | Match System / Real World | 3 | Financial terminology correct (BCEAO ratio, Garman-Forgue threshold, OraScore "BON"); "Bonjour, Joan" still shows first name only |
| 3 | User Control and Freedom | 1 | Dashboard + Analyse NavBars are empty frames — user cannot navigate. Profile has no NavBar, no logout. Only Score and Revenue have functional NavBars |
| 4 | Consistency and Standards | 1 | NavBar pattern broken on 3/5 screens. Dashboard + Analyse NavBars empty. Score NavBar (absolute y:846) overlaps RecCard content. Revenue NavBar (absolute y:978) is partially clipped by frame bottom |
| 5 | Error Prevention | 1 | No visual constraints, validation, or guardrails shown |
| 6 | Recognition Rather Than Recall | 2 | Clear labels and icons; but Score AdviceCard (y:1059) renders below NavBar (y:896) — users won't discover it |
| 7 | Flexibility and Efficiency | 1 | Static screens only; no shortcuts, no interactions |
| 8 | Aesthetic and Minimalist Design | 2 | Premium Utilitarian Minimalism undermined by layout defects: clipped dividers in Profile settings, history chart bars partially clipped, NavBar overlaps |
| 9 | Error Recovery | 1 | No error states or recovery paths designed |
| 10 | Help and Documentation | 1 | No contextual help, tooltips, onboarding, or bottom sheets designed |
| **Total** | | **15/40** | **Poor — major UX overhaul required** |

## Anti-Patterns Verdict

**LLM assessment**: The design direction (Premium Utilitarian Minimalism — warm monochrome #F7F6F3, 1px #EAEAEA borders, DM Sans + Playfair Display, Phosphor icons, no shadows/gradients) successfully avoids the SaaS/glassmorphism AI tells. The bento vertical-flow layout is appropriate for a mobile financial app. The color discipline (green #5EAA31 for positive signals only) is strong.

However, the NavBar infrastructure degradation is a critical regression: what was a fully functional 4-tab bottom bar in the first 2 screens is now broken or empty on 3 of 5 screens. This is the single most user-facing defect — the app's primary navigation mechanism is non-functional on most screens.

**Deterministic scan**: Detector on DESIGN.md returned 0 findings (markdown spec). Detector on changed source files found 3 issues: Bebasneue font used in code but absent from DESIGN.md, and undocumented color #C5EBA3 used twice in app/(tabs)/index.tsx — design drift from the spec.

**Visual overlays**: Not applicable (Pencil design file, no browser-based HTML surface).

## Overall Impression

The scope of screens has grown from 2 to 5, which is good progress. Each new screen (Score, Revenue, Profile) brings appropriate content from the API — Score has hero + history + recommendations, Revenue has income sources + frequency + savings rate, Profile has user info + stats + settings. The advice/recommendation layer is now visible on Analyse, Score, and Revenue.

But the 50px Pencil layout offset has caused a cascade of NavBar placement failures that broke the app's primary navigation. This must be fixed before any other polish. The NavBar is the spine of a mobile app; without it working consistently, the design cannot be evaluated as a cohesive product.

## What's Working

1. **Score screen content structure**: ScoreHero (Playfair Display 75 + "BON" badge + progress bar + 2 metrics) is the strongest new section. The strengths/weaknesses card, history chart (6-month trend), and 3-tier recommendations (HIGH/MEDIUM/LOW) map well to the API's GET /score endpoints.

2. **Revenue savings card**: "Seuil Garman-Forgue: 10%" with "Score: 80" badge is a nice touch — real financial domain specificity that avoids generic fintech UI. The 80% bar fill for Salaire is visually clear.

3. **Profile settings list**: Clean icon + label + chevron pattern. Bell, Eye, Lock, Info icons are well-chosen. The divider line pattern (1px #EAEAEA at item bottom) maintains the editorial 1px language.

## Priority Issues

- **[P0] NavBar broken on 3/5 screens**: Dashboard NavBar (y:826 with width:358, no children), Analyse NavBar (y:970, no children). Score NavBar overlaps RecCard content (absolute y:846 renders at ~y:896 while RecCard runs from y:851-1059). Revenue NavBar at y:978 renders outside the frame content area (1080-90 padding = 990 effective bottom). **Fix**: Rebuild NavBars inline on Dashboard and Analyse (children with 4 tabs). Move Score NavBar to absolute y:1040 (renders at y:1090, below AdviceCard at y:1059+77=1136, within 1244-90=1154). Move Revenue NavBar to y:876 (renders at y:926, within 1080-90=990). **$impeccable layout**

- **[P1] 50px systemic layout offset**: Every frame with padding:[60,16,90,16] shifts children +50px. This causes all NavBar absolute y values to render 50px lower than specified, and text nodes in flow to appear with 50px extra gap. **Fix**: Apply systematic offset compensation when exporting to code, or rebuild frames with reduced padding. **$impeccable layout**

- **[P1] No onboarding, login, or bottom sheets**: The full user journey requires: 4-step onboarding (account number → contact → OTP → password), login (email + password), and bottom sheets (filter, transaction detail, score breakdown, category detail, help/info). None exist yet in the Pencil design. **Fix**: Create Onboarding frame (x=3497), Login frame (x=3887), and Bottom Sheet frames adjacent to each screen. **$impeccable craft**, **$impeccable onboard**

- **[P2] Score AdviceCard renders below NavBar**: AdviceCard at y:1059 appears after NavBar at y:896. Users scrolling the Score screen will hit the NavBar before seeing the "Bon reflexe !" advice. Advice content should be discoverable before navigation controls. **Fix**: Move AdviceCard above NavBar in flow, or increase frame height so there's visible space below AdviceCard before NavBar. **$impeccable layout**

- **[P2] Profile screen incomplete**: No NavBar, no logout button, no secondary actions (download data, share, help). The settings section ends at y:556 in a 1080px frame — the bottom 500px is empty. The divider lines are fully clipped (y:46 in 46px items). **Fix**: Add NavBar with Profil tab active. Add logout CTA. Fix divider positioning. **$impeccable craft**

- **[P3] History chart bars partially clipped**: March-June bars in the Score history chart show "partially clipped" due to bar height (val*1.1) exceeding the 80px chart container. **Fix**: Reduce bar height multiplier or increase chart height. **$impeccable layout**

## Persona Red Flags

**Alex (Power User)**: NavBars are empty on 2 screens — Alex would abandon immediately. No way to reach Profile from Dashboard. The Score screen has rich data but no tap-to-drill-down on any section. Would expect to tap the score number to see component breakdown, or tap a recommendation to see action steps. Tab bar has no swipe gesture support.

**Jordan (First-Timer)**: No onboarding designed. Would open Dashboard, see empty NavBar tabs, and not know how to proceed. Score screen shows "BON" badge but doesn't explain what constitutes a good score. Profile settings are just icons — no hint what "Confidentialite" or "Securite" settings contain. Revenue screen shows "Seuil Garman-Forgue" — Jordan has never heard of this.

**Riley (Stress Tester)**: Empty Dashboard + Analyse NavBars would trigger "what happens if I tap an empty tab?" testing. Profile settings with no logout button — Riley would test if closing the app then reopening maintains session. No error states to stress test. AdviceCard with broken "piggy-bank" icon fallback to "coin" — inconsistency caught.

## Minor Observations

- Revenue AdviceCard uses fallback "coin" icon because "piggy-bank" doesn't exist in Phosphor set — verify icon name or use alternative
- Profile divider lines are technically "fully clipped" at their current y:46 within 46px items — the 1px line is invisible
- Score screen allows scrolling but AdviceCard (y:1059) may not be reachable within 1244px frame
- Bebasneue font and #C5EBA3 color used in code but not documented in DESIGN.md — design drift
- The 4 category bars on Revenue (80/12/5/3%) have inconsistent colors: $primary for Salaire, $accent_blue for Freelance, $warning_text for Investissements, $negative_text for Autres — consider using a more intentional multi-category palette

## Questions to Consider

- "Should the AdviceCard on Score screen be sticky below the Recommendations, or should it float above the NavBar?"
- "What fills the 500px gap below Profile settings — should additional sections (linked accounts, security status, data export) exist there?"
- "Is the Revenue screen a standalone screen or a sub-screen of Analyse? If sub-screen, should the NavBar show 'Analyse' or 'Revenus' as active?"
- "If every screen has the same 4-tab NavBar, why can't there be a single reusable component — and how will Pencil handle this dependency?"
