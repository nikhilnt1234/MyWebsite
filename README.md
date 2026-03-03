# Mission Control Portfolio

Single-page portfolio built with Next.js App Router, TypeScript, Tailwind, shadcn-style UI primitives, lucide-react, and framer-motion.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Updates

All portfolio content is centralized in `lib/data.ts`.

Update the `PORTFOLIO` object for:
- profile and hero copy
- case studies and AI lab content
- sketch-to-system and contact details
- chat starter prompts and labels

## Environment Variables

Copy `.env.example` to `.env.local` and set values:

```bash
cp .env.example .env.local
```

### Server-only variables (safe for secrets)
- `OPENAI_API_KEY`
- `OPENAI_MODEL` (optional)
- `PORTFOLIO_LLM_PROVIDER` / `PORTFOLIO_LLM_API_KEY` / `PORTFOLIO_LLM_MODEL` (optional compatibility keys)

These are read only on the server (Route Handlers / server code).

### Public variables (browser-visible)
- `NEXT_PUBLIC_SITE_URL`

Any variable prefixed with `NEXT_PUBLIC_` is bundled to the client. Do not store secrets there.

## API + Runtime Notes

- Chat API route: `app/api/portfolio-chat/route.ts`
- Route handlers under `app/api/*/route.ts` deploy as serverless functions on Vercel.
- Chat route is configured for Node runtime (`runtime = "nodejs"`).
- If no LLM key is configured, the route returns safe deterministic profile/fallback answers (no crash).

## Deploy to Vercel

### Option 1: GitHub + Vercel UI (recommended)
1. Push this repo to GitHub.
2. In Vercel, click **New Project**.
3. Import the GitHub repository.
4. In **Project Settings → Environment Variables**, add your env vars from `.env.example`.
5. Deploy.

Vercel will create preview deployments for PRs and production deployments for your default branch.

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel
vercel --prod
```

When prompted, set the same environment variables used locally.

### Custom Domain
1. Open your Vercel project.
2. Go to **Settings → Domains**.
3. Add your domain.
4. Add/verify DNS records at your domain provider (A/CNAME as instructed by Vercel).
5. Wait for SSL issuance and propagation.

## CI

GitHub Actions workflow: `.github/workflows/ci.yml`

Runs on pull requests and pushes to `main`:
- install dependencies
- lint
- typecheck
- build

## Scripts

- `npm run dev` — start dev server
- `npm run lint` — run ESLint
- `npm run typecheck` — run TypeScript checks
- `npm run build` — production build
- `npm run start` — run production server
# MyWebsite
