# Codex Project Rules

## Goals
- Keep the site a single-page "Digital Twin Studio" product-demo portfolio.
- Maintain the premium glass/blur aesthetic and neutral palette.
- Preserve accessibility: focus states, aria labels for icon buttons, keyboard-friendly controls.

## Content + Data
- All copy and content must come from `lib/data.ts`.
- Components should accept data via props; avoid hard-coded strings except tiny UI labels.

## Structure
- Portfolio components live in `components/portfolio/`.
- UI primitives (shadcn-style) live in `components/ui/`.
- Page assembly stays in `app/page.tsx`.

## Engineering
- Favor simple, typed, reusable components.
- Keep dark mode via Tailwind `dark` class strategy.
- Use framer-motion for subtle entrance transitions.
- Update README instructions when behavior changes.

## Quality
- Prefer `npm run lint`, `npm run typecheck`, `npm run build` before shipping when network/deps are available.
