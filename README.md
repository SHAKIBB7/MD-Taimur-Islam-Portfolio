# MD Taimur Islam — Developer Portfolio

Premium, production-ready developer portfolio. Next.js App Router + TypeScript + Tailwind CSS 4 + Framer Motion + React Three Fiber on the frontend; PostgreSQL + Prisma as the content backend. All personal content lives in the database (seeded from a single typed data module) — never hardcoded in the UI.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env        # then edit DATABASE_URL if needed

# 3. Start a local PostgreSQL (Docker)
docker compose up -d

# 4. Create schema + seed content from the CV data module
npx prisma migrate dev --name init
npm run db:seed

# 5. Run
npm run dev                 # http://localhost:3000
```

No database? The site still runs — the content service falls back to the canonical data in `src/data/cv-content.ts` and the contact API degrades gracefully. This keeps CI, preview deploys, and first-time setup unblocked.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Develop / production build / serve |
| `npm run lint` / `typecheck` / `format` | Code quality |
| `npm test` / `npm run test:e2e` | Vitest unit tests / Playwright e2e |
| `npm run db:migrate` / `db:seed` / `db:studio` | Prisma workflows |

Git hooks: run `npx husky init` once, then put `npx lint-staged` in `.husky/pre-commit`.

## Architecture

```
src/
├── app/            # Routes, layouts, API, sitemap/robots, error/loading states
├── components/
│   ├── ui/         # Reusable primitives (Button, Card, Badge, Section, Reveal…)
│   └── layout/     # Header, Footer, ThemeToggle
├── features/       # Feature modules (hero, projects, experience, skills, contact…)
├── services/       # Content service — the ONLY module that reads from Prisma
├── data/           # cv-content.ts: canonical typed content (seed + fallback)
├── types/          # Domain types (UI depends on these, never Prisma models)
├── animations/     # Motion system: shared variants, easing, viewport config
├── providers/      # ThemeProvider (dark/light/system, FOUC-safe)
├── hooks/          # useDeviceCapability (gates 3D on low-end devices)
├── lib/            # prisma singleton, env validation (zod), utils
└── config/         # Site config (nav, URL)
prisma/             # Schema + idempotent seed
e2e/                # Playwright tests
```

Key decisions:

- **Clean separation of data and UI.** Pages consume domain types from `src/types/content.ts`. Swapping Postgres for a CMS later means changing only `src/services/content.ts`.
- **Editing content**: update `src/data/cv-content.ts`, run `npm run db:seed`. Add a project (any category — Android, Flutter, Python, Desktop, Open Source, Future) and the UI adapts automatically: filters, cards, detail pages, sitemap. Android projects support Play Store links, versions, and changelogs via the same model.
- **Motion system** lives in `src/animations` and thin client wrappers (`Reveal`), so server components stay server-rendered and animation logic never mixes with business logic.
- **3D hero** (`features/hero/hero-scene.tsx`) is code-split, capped-DPR, single-draw-call, and disabled automatically for reduced-motion users, low-core/low-memory devices, and missing WebGL — with a CSS gradient fallback.
- **Theming** via CSS design tokens in `globals.css`; components use semantic tokens only. Dark/light/system with a pre-hydration script to prevent flash.
- **Security**: zod validation on both sides of the contact form, per-IP rate limiting, length-capped inputs, security headers in `next.config.ts`, no unsafe HTML from user input.
- **Accessibility**: semantic landmarks, skip link, focus-visible styles, `aria-current` nav, labeled forms with `role="alert"` errors, `prefers-reduced-motion` respected globally.
- **SEO**: Metadata API with per-page canonical URLs, Open Graph/Twitter cards, Person JSON-LD, `sitemap.xml`, `robots.txt`.

## Deployment (Vercel)

1. Push to GitHub, import the repo in Vercel.
2. Provision Postgres (Vercel Postgres/Neon/Supabase) and set env vars:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
3. Run once against production DB: `npx prisma migrate deploy && npm run db:seed`.
4. Deploy. CI (GitHub Actions) runs lint, typecheck, tests, and build on every PR.

## Customization

- **Content** → `src/data/cv-content.ts` (then `npm run db:seed`)
- **Colors/typography** → design tokens in `src/app/globals.css`
- **Navigation** → `src/config/site.ts`
- **Animation timing** → `src/animations/variants.ts`
- **New content types** → add a Prisma model + domain type + section component; follow the existing pattern in `src/features/`

## Contributing

Feature branches → PRs into `main`. Conventional Commits (`feat:`, `fix:`, `docs:`…). CI must be green before merge.
