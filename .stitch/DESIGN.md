# Design System: Roast & Ritual

## 1. Visual Theme & Atmosphere
Premium dark coffee e-commerce. Near-black backgrounds with warm tint, gold accents. Gallery-airy density with confident asymmetric layouts. The atmosphere is warm, intimate, and luxurious — like a dimly lit coffee lounge with leather chairs. Dark-first with optional light mode.

## 2. Color Palette & Roles
- **Warm Pitch** (#0D0A08) — Primary background, near-black with warm tint
- **Deep Espresso** (#1C1512) — Card surfaces, sidebars, container fill
- **Roast Gold** (#D4A04A) — Primary accent, CTAs, highlights, active states, focus rings
- **Chestnut** (#7C4F34) — Secondary elements, borders, dividers
- **Warm Caramel** (#A67B5B) — Tertiary accents, decorative elements
- **Cream White** (#F5F0EB) — Primary body text, warm cream tone
- **Warm Mocha** (#B8A89A) — Secondary text, captions, metadata, placeholders
- **Terracotta** (#C85A3E) — Error states, sale badges, destructive actions

## 3. Typography Rules
- **Headline/Display:** Inter — Track-tight, weight-driven hierarchy, bold weights for impact
- **Body:** Inter — Relaxed leading, cream white (#F5F0EB) primary, warm mocha (#B8A89A) secondary
- **Scale:** Display (clamp 3rem-5rem), H1 (2.5rem), H2 (2rem), H3 (1.5rem), Body (1rem), Small (0.875rem)
- **Letter-spacing:** Headlines -0.02em, body normal

## 4. Component Stylings
- **Buttons:** Gold (#D4A04A) fill for primary, chestnut outline (#7C4F34) for secondary. Rounded-lg corners. Hover brightens gold by 10%. Active state subtle scale down.
- **Cards:** Deep espresso (#1C1512) fill, chestnut (#7C4F34) 1px borders. Rounded-lg. Subtle shadow tinted to background.
- **Inputs:** Deep espresso fill, chestnut border. Gold focus ring. Label above. Error text in terracotta below.
- **Badges:** Terracotta for sale/error, gold for featured, chestnut for neutral.
- **Loaders:** Gold shimmer matching layout shape. No circular spinners.
- **Navigation:** Dark background, gold accent for active item, cream text.

## 5. Layout Principles
- Max-width 1400px centered container
- CSS Grid primary layout system
- Single column collapse below 768px
- Full-height sections use min-h-[100dvh]
- Asymmetric hero layouts preferred
- Generous vertical rhythm (clamp(4rem, 8vw, 8rem) section gaps)

## 6. Motion & Interaction
- Smooth CSS transitions (0.2s ease) on hover states
- Gold shimmer loading states
- Subtle scale feedback on interactive elements
- Staggered reveal for product grids

## 7. Anti-Patterns (Banned)
- No pure black (#000000) — use #0D0A08 instead
- No neon/outer glow shadows
- No generic 3-column equal card layouts
- No emojis
- No AI copywriting clichés ("Elevate", "Seamless", "Unleash")
- No generic placeholder names
- No broken image links — use picsum.photos or SVG
- No overlapping elements
- No fabricated statistics or fake metrics
