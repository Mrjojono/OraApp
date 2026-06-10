---
name: Earthen Digital Refined
colors:
  surface: '#f6fbef'
  surface-dim: '#d7dcd0'
  surface-bright: '#f6fbef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f5e9'
  surface-container: '#ebf0e4'
  surface-container-high: '#e5eade'
  surface-container-highest: '#dfe4d8'
  on-surface: '#181d16'
  on-surface-variant: '#424939'
  inverse-surface: '#2d322a'
  inverse-on-surface: '#edf2e7'
  outline: '#727a67'
  outline-variant: '#c1c9b4'
  surface-tint: '#3a6a00'
  primary: '#3a6a00'
  on-primary: '#ffffff'
  primary-container: '#9fe35d'
  on-primary-container: '#376400'
  inverse-primary: '#96d954'
  secondary: '#47672d'
  on-secondary: '#ffffff'
  secondary-container: '#c5eba3'
  on-secondary-container: '#4b6c31'
  tertiary: '#824d70'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffbce5'
  on-tertiary-container: '#7c476a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1f66d'
  primary-fixed-dim: '#96d954'
  on-primary-fixed: '#0e2000'
  on-primary-fixed-variant: '#2b5000'
  secondary-fixed: '#c8eea5'
  secondary-fixed-dim: '#acd28c'
  on-secondary-fixed: '#0c2000'
  on-secondary-fixed-variant: '#304f18'
  tertiary-fixed: '#ffd8ed'
  tertiary-fixed-dim: '#f5b3db'
  on-tertiary-fixed: '#350a2a'
  on-tertiary-fixed-variant: '#683658'
  background: '#f6fbef'
  on-background: '#181d16'
  surface-variant: '#dfe4d8'
  surface-white: '#FFFFFF'
  forest-depth: '#0E2100'
  mint-subtle: '#E2EBD6'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  margin-mobile: 20px
  margin-desktop: 40px
  gutter: 24px
  container-max-width: 1200px
---

## Brand & Style
The design system evolves into a high-clarity, "Wise-inspired" aesthetic that prioritizes functional minimalism and human-centric financial clarity. The brand personality is authoritative yet accessible, shedding the density of traditional fintech for an airy, open, and precision-oriented interface.

The design style is **Tactile Minimalism**. It relies on solid layers, distinct tonal shifts, and sharp execution rather than blurs or complex gradients. The visual language emphasizes high contrast and generous white space to evoke a sense of transparency and ease, ensuring that complex financial data feels manageable and inviting.

## Colors
The palette shifts toward a "white-first" hierarchy to maximize perceived lightness. **Surface White (#FFFFFF)** is the primary canvas, used for all main containers and backgrounds to avoid the "oppressive dark" feel of earlier iterations. 

- **Primary (Wise Lime):** Reserved for critical actions, success states, and key brand moments. It acts as a high-visibility signal against neutral backgrounds.
- **Secondary (Deep Navy/Green):** Provides grounding and depth. Used for high-contrast text, primary navigation elements, and structural borders.
- **Neutral (Off-white/Mint):** `F0F5E9` serves as the `surface-container` color, creating soft distinction between the white background and secondary content areas without introducing heavy shadows.

## Typography
The typography strategy leverages **Plus Jakarta Sans** as the workhorse for headlines and body text to achieve a modern, welcoming, and highly legible feel. **Inter** is utilized strictly for utility roles—labels, data tables, and micro-copy—where its neutral, systematic character ensures maximum clarity at small scales.

Refining the scale involves increased line-heights and tighter letter-spacing for large headlines to maintain a "Wise-like" professional punch. Headlines should always use the `Secondary` color for maximum contrast against white surfaces.

## Layout & Spacing
The system uses a **Fixed Grid** model for desktop to ensure content remains centered and readable, transitioning to a fluid model for mobile. 

- **Whitespace:** Padding is intentionally generous (minimum 32px between major sections) to create an "airy" feel.
- **Floating Navbar:** The navigation bar persists as a floating element with a white background and a subtle 1px border (`#E2EBD6`), rather than a shadow, maintaining the tactile minimalist theme.
- **Responsive Reflow:** On mobile, margins reduce to 20px, and multi-column grids collapse into a single-column stack with standardized 16px vertical spacing between cards.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines**. 
- **Level 0 (Background):** Pure White (#FFFFFF).
- **Level 1 (Cards/Sections):** Off-white (#F0F5E9) with a 1px solid border in Mint-subtle (#E2EBD6).
- **Level 2 (Interaction):** High-contrast shifts. For example, a button or card might shift from a 1px border to a solid primary color fill on hover.

Avoid all backdrop blurs and soft ambient shadows. The hierarchy must feel "stacked" and physical, relying on the contrast between the white background and the subtle green-tinted containers.

## Shapes
Shapes are defined by **Rounded (0.5rem)** corners, providing a friendly but structured appearance. This "medium" roundedness ensures that UI elements like buttons and input fields feel approachable without the playfulness of a full pill-shape. 

Secondary containers and large cards should utilize `rounded-lg` (1rem) to soften the large blocks of color and maintain the human-centric aesthetic.

## Components
- **Buttons:** Primary buttons are solid Wise Lime with Deep Navy text. Secondary buttons are transparent with a Deep Navy 1px border. No gradients or shadows; interaction is shown via a darken/lighten tonal shift of the fill color.
- **Floating Navbar:** Use a 1px border (`mint-subtle`) for definition. Icons should be monoline and 24px, paired with `label-sm` text.
- **Input Fields:** Utilize the white surface with a `mint-subtle` 1px border. On focus, the border transitions to a 2px Deep Navy stroke for high-contrast accessibility.
- **Chips/Status Tags:** Use low-saturation backgrounds (e.g., a very pale version of the status color) with high-saturation text to maintain the clean, functional look.
- **Cards:** White or Off-white fill only. Use "Interpretive Advice" blocks with `title-md` headlines and `body-md` descriptions, ensuring text remains the focal point of the component.