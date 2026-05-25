## Vision

Reposition AURUM as a Pakistani heritage couture house — ivory, deep emerald, and antique gold; Mughal jaali and paisley motifs used with restraint; cinematic editorial photography of bridal and festive looks. A spinning, hand-crafted-feeling 3D gold medallion anchors the hero.

## Design tokens (locked)

- Palette: ivory `#FBF7EE`, deep emerald `#0E3B2E`, antique gold `#B8893A`, warm gold highlight `#E8C77A`, ink `#1A1410`
- Type: Cormorant Garamond (display, lighter weight) + Inter (body) — keep current stack but recalibrate sizes and tracking for editorial feel
- Ornament: thin gold hairlines, scalloped/cusped arch dividers, jaali pattern as subtle SVG background, paisley flourishes between sections
- Motion: slow reveals, gold-leaf shimmer on accents, no bouncy animation

## 3D hero ornament (Three.js)

- Rotating gold Mughal medallion: an extruded SVG path (8-fold radial paisley/jaali shape) given depth via `THREE.ExtrudeGeometry`, gold `MeshPhysicalMaterial` (high metalness, low roughness, clearcoat), studio HDRI-style 3-point lighting using simple directional + ambient lights, soft bloom via post-processing or a glow sprite behind.
- Auto-rotates slowly; gentle drag-to-spin on pointer; respects `prefers-reduced-motion`.
- Sits centered behind the AURUM wordmark; wordmark in front with `mix-blend` to feel inlaid.
- Lazy-loaded; SSR-safe (client-only via dynamic import + mounted check).
- Packages to add: `three`, `@react-three/fiber`, `@react-three/drei`.

## New page structure

1. Glassmorphism nav, gold wordmark, jaali icon set (kept refined)
2. Hero — 3D rotating gold medallion + headline "Woven for the Modern Maharani" + subhead + gold CTA "Discover the Atelier"
3. Heritage marquee — "Lahore · Karachi · Delhi · Dubai · London"
4. Featured collections — three pillars: Bridal Couture, Festive Pret, Heritage Menswear (large editorial cards with cusped-arch frames)
5. Signature pieces grid — 4 hero products in cusped-arch frames, gold hairline borders, hover reveals embroidery detail
6. The Atelier — split layout: emerald block with paisley flourish + image of hand embroidery; copy on craftsmanship (zardozi, dabka, tilla)
7. Lookbook — magazine-style asymmetric image collage with thin gold rules
8. Bespoke / Made-to-Measure — full-width emerald section with gold medallion repeat, CTA "Request a Private Appointment"
9. Press & testimonials from elite Pakistani / South Asian voices
10. Instagram feed (kept, restyled with arch frames)
11. Footer — emerald, gold hairlines, multi-column with cities, currency, languages (EN · UR · AR · FR)

## Implementation notes

- Update `src/styles.css` tokens (emerald + gold + ivory), add jaali SVG background utility, add cusped-arch clip-path utility, refine shimmer keyframes
- Replace `Nav.tsx` styling (kept structure), rewrite `ProductCard.tsx` to use cusped-arch frame
- New components: `Medallion3D.tsx` (R3F), `ArchFrame.tsx`, `JaaliBackground.tsx`, `PaisleyDivider.tsx`
- Rewrite `src/routes/index.tsx` with the new section order and copy
- Generate new editorial imagery via image tool: bridal couture model (deep red + gold), festive pret model (ivory + emerald + gold), menswear (sherwani), atelier hand-embroidery close-up, hero scene (regal interior with jharokha arches)
- Hero campaign image becomes a softer backdrop behind the 3D medallion (or removed in favor of solid emerald + jaali pattern — decide during build based on contrast)
- Keep existing routing; only `/` changes
- SEO meta updated: "AURUM — Heritage Couture, Reimagined"

## Out of scope

- Actual product detail pages, cart logic, auth
- Backend / Lovable Cloud
- Multi-language i18n implementation (selector is decorative)
