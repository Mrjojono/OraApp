---
target: app/(tabs)/profile.tsx
total_score: 26
p0_count: 0
p1_count: 1
p2_count: 3
timestamp: 2026-06-23T14-20-09Z
slug: app-tabs-profile-tsx
---
# Profile Page Critique — OraApp

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Settings rows show "coming soon" alert but no real navigation |
| 2 | Match System / Real World | 4 | Banking domain language is appropriate and familiar |
| 3 | User Control and Freedom | 3 | Logout is clear, no back-needed traps; but no undo on logout |
| 4 | Consistency and Standards | 4 | Matches Analysis page design system perfectly |
| 5 | Error Prevention | 3 | No destructive actions (edit is read-only); logout has no confirmation |
| 6 | Recognition Rather Than Recall | 4 | All sections are visible and scannable at a glance |
| 7 | Flexibility and Efficiency | 1 | No accelerators; one rigid scroll path |
| 8 | Aesthetic and Minimalist Design | 3 | Clean layout but header paddingBottom: 24 is redundant with the 16px gap |
| 9 | Error Recovery | 1 | No error states; if AuthContext fails, page shows fallback text silently |
| 10 | Help and Documentation | 1 | Settings rows show "bientôt disponible" but no actual help pages |
| **Total** | | **26/40** | **Acceptable** |

## Anti-Patterns Verdict

**Not AI-generated.** The page is consistent with the app's dark fintech design system and doesn't rely on common AI tells (no gradient text, no glassmorphism, no side-stripe borders, no identical card grids).

**Deterministic scan**: Clean — no findings from the bundled detector.

## Overall Impression

The profile page is structurally solid and visually consistent with the rest of OraApp. It follows the established surface/outline/accent token vocabulary and the scroll layout matches Analysis. The hierarchy (Header → Info → Stats → Settings → Logout) follows a logical reading order: identity first, then personal data, then financial summary, then controls.

The page is a read-only representation for now — nothing is editable, no settings actually navigate anywhere. That's appropriate for a v1 but will need depth as the product matures.

## What's Working

1. **Token consistency** — Every component uses `tokens.surface`, `tokens.outline`, `tokens.accent` etc. No color drift. Feels like part of the same product as Analysis.
2. **Section ordering** — Most important info (name, avatar) at top → personal details → financial summary → settings → logout at bottom. Natural reading flow.
3. **Hardware-accelerated interactions** — Pressable with accentContainer feedback on settings rows. RN-reanimated not needed here; native Pressable is correct for simple state changes.

## Priority Issues

### [P1] Stats values are fully hardcoded
**Why**: "800K F", "500K F", "150K F", "75/100" are static. A profile page showing financial aggregates (deposits, loans, savings) implies they come from the user's actual account. Hardcoded values erode trust.
**Fix**: Connect to API endpoints or at minimum show a "coming soon" state on each stat.
**Suggested command**: `$impeccable harden`

### [P2] No logout confirmation
**Why**: Tapping "Se déconnecter" immediately logs out with no confirmation. This is a destructive action — if the user taps accidentally, they lose their session with no recovery.
**Fix**: Add a confirmation Alert before calling `logout()`.
**Suggested command**: `$impeccable harden`

### [P2] Settings rows have no real destination
**Why**: All 4 settings rows show the same "bientôt disponible" alert. Users learn quickly that tapping any setting does the same thing, which undermines trust in the navigation.
**Fix**: Either ship at least one real settings screen, or replace chevrons with a "coming soon" badge to reset expectations.
**Suggested command**: `$impeccable polish`

### [P2] ProfileInfo separator still uses absolute positioning
**Why**: The `separator` style used `position: "absolute"` with `left/right: 16`. Updated to `borderBottomWidth`, but worth verifying the fix is applied.
**Fix**: Confirm using borderBottom instead of absolute View.
**Suggested command**: `$impeccable polish`

### [P3] Header paddingBottom: 24 conflicts with the parent gap: 16
**Why**: The ProfileHeader has `paddingBottom: 24`, but the parent ScrollView has `gap: 16`. The spacing between header and next section is effectively 24 + 16 = 40px, which is larger than all other section gaps.
**Fix**: Remove `paddingBottom: 24` from the header and let the parent `gap: 16` control spacing, matching the rest of the page.
**Suggested command**: `$impeccable layout`

## Persona Red Flags

**Alex (Power User)**:
- One rigid scroll path. No way to jump to a specific section (no section index, no pull-down search).
- Settings navigation hits the same alert 4 times. Alex will abandon after the second tap.

**Casey (Mobile User)**:
- Logout is at the very bottom — perfect thumb zone for a one-handed tap, but no confirmation makes accidental taps dangerous.
- All data is static, no pull-to-refresh. Casey can't verify if info is up-to-date.

**Sam (Accessibility)**:
- Lucide icons are decorative-only; no accessibilityLabels set on interactive elements.
- ChevronRight on settings rows implies navigation but goes nowhere — screen reader users will be confused.

## Minor Observations

- `Banknote` icon in ProfileStats is a banknote-with-dollar-sign. For CFA Franc (XOF), a generic `Wallet` or `Landmark` icon would be more regionally appropriate.
- The `muted` color (#555555) for ProfileInfo labels (Email, Téléphone, Compte) sits at 3.2:1 contrast against #1A1A1A surface — below the 4.5:1 WCAG AA standard for 11px text.
- ProfileStats rows are wrapped in a `card` View with `flexWrap: "wrap"` but only 2 items per row — a 2×2 grid via 2 fixed rows is simpler and avoids any flex-wrap edge cases.

## Questions to Consider

- "Is this page a read-only view or will the user eventually edit their name/email/phone?"
- "Should the stats (dépôts, prêts, épargne) live here on the Profile or would they be more useful on the Dashboard?"
- "What happens when a user has no account number yet (pending KYC) — what does the empty state look like?"
