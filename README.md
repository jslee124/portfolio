# Mori — Developer portfolio

A terminal-inspired, responsive portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS. The homepage puts Forge and Kestri first, with dedicated engineering case studies at `/projects/forge` and `/projects/kestri`.

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

## Deployment

Production: https://morisama.vercel.app — Vercel project `morisoft1/mori-portfolio`.

`NEXT_PUBLIC_SITE_URL` is configured for the Production environment with this origin. The local `.vercel` project link and `.env.local` are ignored by Git. After signing in to the Vercel CLI, publish the current working tree with:

```sh
npx vercel deploy --prod --yes --scope morisoft1
```

GitHub automatic deployment is not connected yet: the Vercel account needs a GitHub login connection before the repository can be linked. CLI deployment works independently of that integration.

## Architecture

Pages and case study content are Server Components. Four client components add progressive interaction: `character-field.tsx` draws the hero, `terminal-command.tsx` handles local command feedback, and `navigation-signal.tsx` coordinates a brief transition shared by links and commands. `home-motion.tsx` adds one-time section/node entrances, a reading progress line, and pointer-following background light. `project-scene.tsx` is a server-rendered project section with ordinary scrolling. Content stays visible before enhancement; motion respects reduced-motion preferences and never changes connector positions. Project routes are statically generated from typed project data; unknown projects return 404. No database, API backend, authentication, CMS, analytics, or animation dependencies are needed. IBM Plex Mono fonts are packaged locally.

The homepage retains a full-width MORI character field and terminal navigation, with a visible identity statement and plain-language chapter headings: My projects, About me, and Technical skills. Project names have explicit product descriptions, and the enlarged skill list has its own `#skills` destination. Project summaries have a consistent reading order, followed by architecture sketches made from responsive HTML nodes and CSS connectors. Forge shows proposal → policy → approved execution, with run evidence recorded throughout. Kestri shows the distinct lifetimes of conversation, explicit memory, and agreed tasks, supported by durable PostgreSQL state. Diagram labels do not shrink with a scaled SVG; narrow layouts reflow the nodes rather than cropping them. Project sections have no sticky sequences or scroll-triggered text changes.

The character field gathers on entry, responds to pointer movement, and stops rendering when settled or offscreen. Reduced-motion preferences remove the gathering, pointer displacement, and navigation transition. Case study prose follows the system light/dark preference. The site retains semantic sections, keyboard focus, a skip link, readable HTML diagrams, and ordinary navigation links without JavaScript. Diagrams are explanatory architecture sketches rather than application screenshots or run transcripts.

## Content sources

The case studies summarize the supplied brief and project documentation:

- [Forge README](https://github.com/jslee124/forge) and its architecture, context, security, and evaluation documentation.
- [Kestri README](https://github.com/jslee124/kestri) and its architecture documentation, checked against the local source checkout because public network reads were unavailable during implementation.

The diagrams simplify responsibilities rather than claiming independent services. Permission policy is not described as OS sandboxing. Local Kestri operation still uses external Telegram, model, and research services. First-person motivation and learning copy is an editorial draft for the owner to refine.

## Verification record

The dynamic redesign passed `npm run lint`, `npm run typecheck`, and `npm run build`. The production preview was checked in the in-app browser for the character field, command navigation, normal project links, and responsive layouts. The readability revision replaces SVG scenes with HTML nodes and fixed-size text, checked at the annotated 801px width and desktop/mobile widths. Reduced-motion behavior is implemented in Canvas, CSS, and navigation; a fresh full accessibility audit and OS-level reduced-motion acceptance have not been performed for this redesign.

Commands: `help`, `whoami`, `projects`, `forge`, `kestri`, `about`, `skills`, `contact`, and `clear`; `open forge` and `open kestri` also work. Commands provide portfolio navigation only, with no shell execution, filesystem access, or backend.

The hero includes a retro computer console with a warm gray enclosure, green CRT-style screen, static scanlines, and tactile command keys. It keeps the last three command exchanges; `clear` clears those exchanges. Screen effects do not flash or animate, and the layout reflows for phones.

`npm audit --omit=dev` reported zero vulnerabilities. The full audit reported five high-severity findings in the ESLint development dependency chain, rooted in the `braces` nested-pattern denial-of-service advisory ([GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm)). At implementation time, the registry's latest `braces` release was still affected. Do not use the suggested forced downgrade of Next's ESLint configuration as a substitute for an upstream fix. Recheck during dependency updates.

External repository/document links are supplied from the project sources. Kestri's public availability could not be verified through the network during this run. Confirm its intended public visibility before sharing the portfolio with recruiters.

## Brand icons

Brand marks come from [Simple Icons](https://github.com/simple-icons/simple-icons), packaged locally as SVG paths in `components/brand-icons.tsx`. GitHub links include the GitHub mark, and named technologies retain visible text alongside decorative logos. Skill logos use brand colors; compact project tags follow their section color. The icons render on the server without client-side icon loading or external CDN requests.
