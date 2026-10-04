# Personal website

Portfolio, essays, and a running archive of work. Built with Next.js (App Router), Tailwind v4, GSAP + ScrollTrigger, Motion, Lenis, matter.js, and MDX.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
npm run lint && npm run typecheck
```

## Edit content

Everything you will touch regularly lives in five places. No component changes needed.

| What | Where |
| --- | --- |
| Name, tagline, location, email, socials, résumé path, production URL | `src/data/site.ts` |
| Projects (title, description, tags, year, GitHub + live links, screenshot) | `src/data/projects.ts` |
| Journey timeline (education + experience) | `src/data/journey.ts` |
| Skills and categories | `src/data/skills.ts` |
| Essays | `content/essays/*.mdx` |

### Adding a project

Append an object to the array in `src/data/projects.ts`. To add a screenshot, drop an image in `src/assets/projects/` and import it:

```ts
import ledgerShot from "@/assets/projects/ledger.png";
// ...
{ title: "Ledger", image: ledgerShot, ... }
```

Projects without an image get a numbered placeholder tile.

### Adding an essay

Create `content/essays/my-essay.mdx`:

```mdx
---
title: "My essay"
date: "2026-10-04"
summary: "One or two sentences shown in lists and social previews."
tags: ["craft"]
---

Body in Markdown. Code blocks get syntax highlighting; add `title="file.ts"` or `{2-4}` after the language for a filename or highlighted lines.
```

The slug is the filename. Set `draft: true` in the frontmatter to hide an essay from the index and sitemap while you work on it. The build fails loudly if `title`, `date`, `summary`, or `tags` are missing.

### Résumé

Replace `public/resume.pdf`. The link text and path come from `site.resumePath`.

## Deploy

Push to GitHub and import the repo in Vercel; defaults work. When you connect a domain, set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` in the Vercel project (or edit `site.url`) so canonical URLs, the sitemap, and social cards use it.

## Design

"Obsidian & Ember": near-black `#0a0a0b`, warm off-white `#f2efe9`, one amber accent `#f2a33a`. Instrument Serif for display, Geist for body, Geist Mono for labels. Tokens live in `src/app/globals.css` under `@theme`.

Motion rules: scroll-linked or multi-step timelines use GSAP; React state transitions use Motion. Everything respects `prefers-reduced-motion`, and the page is fully readable with JavaScript disabled.

Signature details: the intro "signs" your name in Great Vibes (`--font-signature`), a custom dot-and-ring cursor replaces the native one on fine pointers (add `data-cursor="Label"` to any element to show a word in the ring), and a left rail shows scroll progress with vertical labels on large screens.
