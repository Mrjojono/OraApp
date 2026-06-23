---
target: designs/oraapp.pen — card/immersion critique
total_score: 14
p0_count: 2
p1_count: 2
p2_count: 2
p3_count: 0
timestamp: 2026-06-21T14-14-19Z
slug: designs-oraapp-pen
---
# Critique: Orabank OraApp — Card Problem + Immersion Gap

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading/empty/error states |
| 2 | Match System / Real World | 3 | OK terminology |
| 3 | User Control and Freedom | 2 | NavBars now fixed, but still static |
| 4 | Consistency and Standards | 1 | Card-with-border pattern applied uniformly — same visual grammar everywhere, no hierarchy |
| 5 | Error Prevention | 1 | No validation shown |
| 6 | Recognition Rather Than Recall | 2 | Cards look same → user can't distinguish sections visually |
| 7 | Flexibility and Efficiency | 1 | Static only |
| 8 | Aesthetic and Minimalist Design | **0 → 1** | Card-with-borders creates visual noise, not immersive. Sections are modular boxes pasted onto warm bg — no cohesion. User complained directly: "desordonner coller n'importe comment" |
| 9 | Error Recovery | 1 | No error states |
| 10 | Help and Documentation | 1 | No help |
| **Total** | | **14/40** | **Poor** |

## Anti-Patterns Verdict

**LLM assessment**: The biggest AI slop tell here is the **uniform card grid** pattern — every content section wrapped in a white frame with 1px #EAEAEA border. On Dashboard alone: BentoRow (2 cards) → ScoreCard (card) → NetSection (card) → TransactionList (card). That's 4-5 near-identical visual containers stacked vertically. The user is right: it feels "collé n'importe comment" because there's no visual rhythm — same spacing, same radius, same border between sections that serve completely different purposes (balance vs score vs transactions).

The 50px offset compounds this: sections that should flow into each other have random 50px gaps, making it look like elements were dropped onto the canvas without a grid.

The Premium Utilitarian Minimalism direction I chose was **too safe** — it defaulted to the "clean white cards on tinted bg" pattern which is itself a 2023-2024 AI design standby. I should have pushed toward something more distinctive.

**Deterministic scan**: Skipped (Pencil file, no HTML).

## Overall Impression

The user's gut reaction is correct: the card-with-border approach creates a fragmented, modular feel that undermines the immersive financial experience Orabank should deliver. Every section is visually isolated. There's no sense of place — scrolling from balance to score to transactions doesn't feel like moving through a cohesive app, it feels like flipping through index cards.

The single biggest opportunity: **eliminate borders entirely, use full-bleed background color zones to define sections, let content breathe**.

## Priority Issues

- **[P0] Card-with-border monoculture**: Every content section is a white card with 1px border on warm bg. Balance, score, categories, recommendations, advice — all the same visual container. No hierarchy, no differentiation. Sections feel interchangeable. **Fix**: Remove all card borders. Use background color changes (alternating green zones, dark zones, transparent zones) to define sections. Content should flow edge-to-edge with internal padding but no container visible. **$impeccable distill**

- **[P0] No immersive quality**: The app has full-bleed 390px width available but every section is artificially constrained inside a 358px card with 16px margins. Content never touches the edges. The Orabank brand green is only used on the NavBar active tab and a few text elements — the screen should feel like Orabank, not a white card on beige. **Fix**: Use brand green as section backgrounds with white text. Alternate between green sections, dark sections, and transparent/light sections. Create a visual journey. **$impeccable bolder**

- **[P1] Same visual weight for everything**: On Dashboard, the balance (most important) is a card same as "Dernières transactions" (least important). No visual hierarchy between high-signal and low-signal content. **Fix**: The balance amount should be display typography on a full-width green or dark band. Secondary sections (transactions, tips) should recede visually with lighter backgrounds or tighter spacing. **$impeccable layout**

- **[P1] Auth steps on one screen vs separate screens**: Current Onboarding frame shows 4 steps stacked vertically on one page, but the real flow should be: one screen per step with transitions. Each step is a full-screen experience (account number → contact info → OTP → password), not a list of cards. The 4-dot indicator is correct but the content should fill the screen. **Fix**: Create 4 separate Login flow screens, each with a single focused action. **$impeccable onboard**

- **[P2] NavBar is the only bottom-to-top anchor**: Currently the NavBar has a 1px top border which continues the card language. Without cards, the NavBar becomes the single persistent visual anchor — make it distinct (full-width green or dark background, no border). **Fix**: Remove NavBar border, give it a solid brand-colored background. **$impeccable layout**

- **[P2] 50px offset still creating random gaps**: Even after height fixes, the 50px offset means section spacing is inconsistent. **Fix**: Export to code with proper gap values rather than trying to fix within Pencil. **$impeccable adapt**

## Persona Red Flags

**Jordan (First-Timer)**: Opens the app, sees 4-5 identical white bordered boxes stacked on a beige background. Can't tell which section matters most. The balance card looks the same as the transactions card. Would ask "where do I look first?" — and the answer shouldn't be "they're all equal."

**Casey (Mobile User)**: Scrolling through card after card is tedious. Each card has the same 16px horizontal margin, so content never fills the screen. On a 390px phone, each card is 358px with 16px gutters on each side — that's 32px of dead horizontal space per section. Borderless full-bleed would make the app feel 30% more spacious.

## Minor Observations

- Profile has ~300px empty space below the NavBar — needs content (linked accounts, app version, support)
- Onboarding steps should be separate full-screen flows, not cards in a vertical stack
- Bottom sheets (Filter, Score Breakdown, Info, Transaction) all use the same card+stroke pattern — should be borderless with a bottom curve and drag handle
- The green header "Bonjour, Joan" could be a full-bleed green band, not a card

## Questions to Consider

- "What if every screen had a dominant brand color block instead of white cards on beige?"
- "What if the bottom NavBar were the only UI 'container' and everything else floated freely?"
- "What if sections were defined by typography scale + background tint rather than borders?"
