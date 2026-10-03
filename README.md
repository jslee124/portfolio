# Mori — Developer portfolio

A minimal, responsive portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. The homepage puts Forge and Kestri first, with dedicated engineering case studies at `/projects/forge` and `/projects/kestri`.

## Development

Use Node.js 20.9 or newer (Node.js 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. To verify and run a production build:

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

## Customize

- `data/site.ts`: name, GitHub, email, LinkedIn, and grouped technologies. Email and LinkedIn are hidden until populated; no fake contact details are displayed.
- `data/projects.ts`: project metadata, case study copy, architecture labels, engineering decisions, and source links.
- `app/page.tsx`: hero and about copy. The supplied Computer Science student description is used; no availability or internship status is assumed.
- `app/globals.css`: semantic colors, responsive layout, and motion. Light/dark mode follows the system preference with no client-side theme script.
- `app/icon.svg`: personal favicon.
- `app/opengraph-image.tsx`: generated PNG social card.

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your actual deployed origin **before building**. This enables accurate absolute social image URLs, canonical URLs, and sitemap entries. Without it, the sitemap is intentionally empty and Next.js uses its development fallback origin for social metadata. Do not publish with a placeholder domain.

## Architecture

All page and presentation components are Server Components. Project routes are statically generated from typed project data; unknown projects return 404. No database, API backend, authentication, CMS, analytics, or animation dependencies are needed. Geist fonts are packaged locally, so builds and visitors do not depend on Google Fonts.

The site uses semantic sections, keyboard-visible focus, a skip link, responsive layouts, and reduced-motion preferences. Architecture diagrams are readable HTML lists rather than screenshots.

## Content sources

The case studies summarize the supplied brief and project documentation:

- [Forge README](https://github.com/jslee124/forge) and its architecture, context, security, and evaluation documentation.
- [Kestri README](https://github.com/jslee124/kestri) and its architecture documentation, checked against the local source checkout because public network reads were unavailable during implementation.

The diagrams simplify responsibilities rather than claiming independent services. Permission policy is not described as OS sandboxing. Local Kestri operation still uses external Telegram, model, and research services. First-person motivation and learning copy is an editorial draft for the owner to refine.

## Verification record

The first implementation passed `npm run lint`, `npm run typecheck`, and `npm run build`. The production server was checked in Chromium at 375, 768, and 1440 pixels with both light and dark preferences, across all three pages (18 combinations). Checks covered HTTP responses, horizontal overflow, section anchors, and axe-core WCAG A/AA rules. Keyboard skip navigation, project-to-project navigation, the unknown-project 404, and the generated social PNG also passed. Desktop and mobile screenshots were reviewed. Automated accessibility checks supplement visual and keyboard review; they do not constitute a full accessibility audit.

`npm audit --omit=dev` reported zero vulnerabilities. The full audit reported five high-severity findings in the ESLint development dependency chain, rooted in the `braces` nested-pattern denial-of-service advisory ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)). At implementation time, the registry's latest `braces` release was still affected. Do not use the suggested forced downgrade of Next's ESLint configuration as a substitute for an upstream fix. Recheck during dependency updates.

External repository/document links are supplied from the project sources. Kestri's public availability could not be verified through the network during this run. Confirm its intended public visibility before sharing the portfolio with recruiters.
