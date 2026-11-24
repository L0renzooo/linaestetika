# LINA ESTETIKA — website (iteration 2: multi-page)

Slovak website for LINA ESTETIKA, aesthetic medicine in Senec. Next.js 16 (App Router) · React 19 · TypeScript 6 · Tailwind CSS 4 · GSAP 3 (ScrollTrigger, SplitText) · Lenis · selected React Bits components.

```powershell
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Routes

| Route | Content |
|---|---|
| `/` | Hero (SpecularButton CTA), treatment ticker, interactive face map, category cards, LINA Signature (CardSwap), approach, pricing preview, contact |
| `/osetrenia` | Catalogue — category filter + search (`?kategoria=` / `?oblast=` supported) |
| `/osetrenia/[slug]` | 8 detail pages (static): botulotoxin, nadmerne-potenie, kyselina-hyaluronova, pery, biorevitalizacia, polynukleotidy, profhilo, sculptra |
| `/cennik` | Full price list grouped by Bookio category |
| `/damy`, `/pani` | Audience intros + area filter (shared treatment data) |
| `/kontakt` | Contact, booking, booking FAQ |
| `/vysledky` | Results policy; gallery renders only when approved entries exist in `src/data/results.ts` |

## Single sources of truth

- `src/config/site.ts` — Bookio URL, address, hours, phone.
- `src/data/services.ts` — **the only place prices exist** (23 Bookio services, verified 2026-11-24). Used by the homepage preview, cards, detail pages, face map and `/cennik`.
- `src/data/treatments.ts` — treatment page content, categories, area tags, face-map zones.
- `src/data/signature.ts` — LINA Signature editorial pathways (no prices).
- `docs/bookio-service-audit.md` — Bookio audit, discrepancies, open questions.

To update a price: change it in `services.ts` (and the audit date). Nothing else needs touching.

## Booking

All "Rezervovať termín" buttons open `https://services.bookio.com/linaestetika/widget?lang=sk` in a new tab. Bookio has no documented service-specific links, so none are constructed. Iframe embedding loads but adds its own scrollbar and cookie banner, so it's not used.

## React Bits (vendored in `src/components/reactbits/`, MIT + Commons Clause)

| Component | Where |
|---|---|
| SpecularButton | Homepage hero booking CTA (single WebGL instance; patched to render a real `<a>`) |
| CardSwap | LINA Signature on `/` and `/damy`, synced with an accessible text list |
| AnimatedList | Variant selector on Botulotoxín, Pery, Profhilo detail pages |

Demo-only `@hugeicons` imports were removed; lint rules for upstream ref patterns are scoped off for that folder only.

## Motion

GSAP via `useGSAP` (auto cleanup) inside `gsap.matchMedia` (reduced motion respected): SplitText line reveals, hero image clip/scale reveal + parallax, staggered scroll reveals, mega-menu open/close, face-map & variant panel transitions, FAQ height animation, scroll-linked process timeline. Lenis runs on the GSAP ticker, syncs ScrollTrigger, resets on route change and honours `data-lenis-prevent`. Hidden-until-animated content has a CSS failsafe (visible after 2.5 s if JS fails).

## Image credits

All editorial photos are stored locally in `public/images/editorial/` (downloaded 2026-11-24, 1800 px, optimised by `next/image`).
Unsplash License (free commercial use, no attribution required). Illustrative models only — not clients, staff or results.
The Unsplash source page of every image is recorded in `src/data/images.ts` (`source` field).

Art direction: warm, bright, soft daylight, natural skin. The LINA Signature trio (`eye-closeup`, `lips-natural`, `neck-hand`)
was chosen as one set (light warm skin tones, neutral light backgrounds). Hero: `hero-blonde`.

## Interaction components (iteration 3)

- `components/home/Hero.tsx` — portrait dissolves into the peach background via CSS mask (`.hero-mask` in globals.css).
- `components/home/ExpandingCards.tsx` — desktop flex-grow expanding cards (hover/focus); mobile/tablet snap carousel with active card + dots.
- `components/layout/MobileMenu.tsx` — GSAP-choreographed menu (single timeline, play/reverse), `inert` background, scroll lock, focus return.

## Open items (see handoff)

Domain (`siteConfig.url`), Bookio discrepancies D1–D11, phone publication consent, reviews source, approved results, client approval of all treatment copy, font licence (files in `/public/fonts`), own photography.
