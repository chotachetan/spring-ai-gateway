# Repository Guidelines

## Project Structure & Module Organization
The Next.js source lives in `app/`, organized by route groups—group related pages, layouts, and API handlers together. Shared UI primitives sit in `components/`, and reusable hooks and utilities belong in `hooks/` and `lib/` respectively. Static assets and icons are served from `public/`, while global styles and Tailwind tokens remain in `styles/` and `components.json`. When adding new modules, keep feature-specific files co-located to simplify imports and SSR boundaries.

## Build, Test, and Development Commands
- `pnpm dev` – start the local Next.js dev server with hot reload.
- `pnpm build` – run the production build to verify bundling and type safety.
- `pnpm start` – serve the pre-built app with Node.js for smoke testing.
- `pnpm lint` – execute `next lint`; run before every push to catch TS, ESLint, and accessibility issues.

## Coding Style & Naming Conventions
Use TypeScript (`.ts`/`.tsx`) with two-space indentation, descriptive camelCase for variables/functions, and PascalCase for React components. Co-locate styles via Tailwind utility classes; prefer composition over bespoke CSS. Keep client components marked with `"use client"` and prefer server components otherwise. Follow existing alias patterns and avoid deep relative imports when a barrel export exists.

## Testing Guidelines
Automated tests are not yet wired in; introduce component tests with Vitest or Jest under `__tests__/` adjacent to the code they cover. Mirror filenames (`Button.test.tsx` for `Button.tsx`) and favor scenario-focused assertions. For integration or e2e flows, add Playwright specs under `tests/e2e/` and run them against `pnpm dev`. Document any new scripts in `package.json`.

## Commit & Pull Request Guidelines
Recent commits are short sentence-case messages; move toward imperative summaries (`Add gateway telemetry route`) and include context in the body if needed. Reference Jira/GitHub issues with `[#123]` when applicable. Pull requests should link related tickets, outline testing evidence, and screenshot UI updates. Ensure lint passes locally and request review from domain owners before merging.

## Environment & Configuration Tips
Keep secrets in `.env.local` (ignored by Git) and document required keys in `README`. When adding external services, wrap configuration reads with runtime validation in `lib/env.ts` via Zod. For new environment flags, provide sensible fallbacks to keep `pnpm dev` usable without secrets.
