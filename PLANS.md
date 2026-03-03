# ExecPlan — Mission Control Portfolio (Persona-Aligned)

## Concept
A Mission Control interface tuned for enterprise retail + AI + device-heavy workflows. Emphasize ownership, constraints, and production readiness.

## Architecture
- Next.js App Router + TypeScript + Tailwind + shadcn/ui + framer-motion.
- Single-page sections assembled in `app/page.tsx`.
- Mission Control components in `components/missioncontrol/`.
- Global interactive components: `components/CommandPalette.tsx`, `components/SystemMap.tsx`, `components/CaseStudyScroller.tsx`.
- Motion presets in `styles/motion.ts`.
- All content centralized in `lib/data.ts`.

## Data Model
- `PORTFOLIO.profile`, `PORTFOLIO.hero`, `PORTFOLIO.recruiterSummary`.
- `PORTFOLIO.impact`, `PORTFOLIO.caseStudies`, `PORTFOLIO.systemMap`.
- `PORTFOLIO.aiLab`, `PORTFOLIO.sketchToSystem`, `PORTFOLIO.contact`.
- `PORTFOLIO.commandPalette`, `PORTFOLIO.dock`, `PORTFOLIO.agent`.

## Milestones
1. Replace `lib/data.ts` with persona-aligned content.
2. Update components to render new fields (hero, impact, system map, AI demos, case studies, sketches).
3. Verify command palette actions and section anchors.
4. Run lint + build, commit changes.
