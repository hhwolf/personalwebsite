# BUILD_LOG

Running log for the personal website build. Newest entries at the bottom.

## Context

- Goal: a personal site to store and showcase projects (GitHub + live links), essays, and a summary of Henry, usable as a link on application materials. Custom domain later.
- Design inspiration: https://jcedrik.com (structure and motion). Palette and type are our own: "Obsidian & Ember".
- Decisions made with Henry (2026-10-03): Next.js + Tailwind v4 + GSAP/Motion on Vercel; same structure/motion as the inspiration with our own palette; scaffold with placeholders; essays as MDX in the repo; sections: journey timeline, skills playground, résumé download (no gallery). Unanswered and defaulted: hero shows "Henry He" with an editable tagline; projects live in one `projects.ts`.
- Plan file: `~/.claude/plans/system-instruction-you-are-working-cuddly-crayon.md`.

## 2026-10-04 — M0 Scaffold

- `npx create-next-app@latest` (TypeScript, Tailwind, ESLint, App Router, `src/`, `@/*`, npm, Turbopack) into a temp dir, then copied in because the workspace already had a `.context/` folder.
- Added `typecheck` script, ignored `.context/` and `.gstack/`.
- Installed: next 16.3.8, react 19.2.8, tailwindcss 4.3.3, @tailwindcss/typography 0.5.20, gsap 3.15.0, @gsap/react 2.1.2, motion 14.0.0, lenis 1.3.26, matter-js 0.20.0 (+ @types), next-mdx-remote 6.0.0, rehype-pretty-code 0.14.5, shiki 4.5.0, remark-gfm 4.0.1, rehype-slug 6.0.0.

## 2026-10-04 — M1/M2 Static shell, content, SEO

- Design tokens in `globals.css` (`@theme`), fonts via `next/font/google` bridged with `@theme inline`.
- Data files: `site.ts`, `projects.ts` (4 samples), `journey.ts` (4), `skills.ts` (24 across 4 categories).
- Sections as server components; essays via `next-mdx-remote/rsc` with `parseFrontmatter`, remark-gfm, rehype-slug, rehype-pretty-code (theme `vesper`). Frontmatter validated at build.
- Routes: `/`, `/essays`, `/essays/[slug]` (static, `dynamicParams=false`), `sitemap.xml`, `robots.txt`, site + per-essay OG images, `icon.svg`, 404.
- Gates: build ✓, lint ✓ (after fixing a `<a>`→`<Link>` and a JSX comment-text lint), typecheck ✓. Status codes verified with curl (200s, bogus slug 404).

## 2026-10-04 — M3/M4 Motion

- GSAP + ScrollTrigger + SplitText registered in `lib/gsap.ts`; Lenis driven by the GSAP ticker in `SmoothScroll.tsx`.
- Preloader (outline name wipe → ember fill → slide up, once per tab session), hero SplitText line reveal after preloader, `[data-reveal]` batch reveals gated by `html.js` + `prefers-reduced-motion`, journey line scrub, project parallax, progress rail, MENU overlay (Motion, focus trap, Esc, Lenis lock), magnetic buttons.
- Bug found and fixed: the Lenis provider originally rendered a fragment on the server and `ReactLenis` after hydration. That tree-shape change remounted every child, so the preloader mounted, set its "seen" flag, unmounted, remounted and skipped itself. Fix: always render `ReactLenis` and rely on `respectReducedMotion`.
- Bug found and fixed: after a long scroll jump, a reveal batch of ~40 elements with a 0.07s stagger left on-screen items invisible for 2s+. Fix: elements already above the viewport are shown instantly; stagger is capped at 0.6s total.
- Lint: replaced `setState` in effects with `useSyncExternalStore` (reduced-motion media query) and pathname-keyed menu state.

## 2026-10-04 — M5 Skills playground

- `SkillsPlayground.tsx`: matter.js loaded via dynamic import inside an effect; DOM pills synced to bodies in a rAF loop; MouseConstraint with wheel listeners removed so the page still scrolls; paused offscreen/hidden; walls rebuilt on resize; double-click shakes; filter chips remove/drop bodies. Server and non-qualifying clients render a Motion `layout` grid instead. Gate: `(pointer: fine) and (min-width: 768px) and (prefers-reduced-motion: no-preference)`.

## 2026-10-04 — M6 QA

Tooling: gstack `/browse` for screenshots (`.context/`), Playwright (from the gstack install) for scripted checks (`.context/qa/`), Lighthouse via npx against `next start` on :3100.

Bugs found by QA and fixed:
- **Wheel scrolling was dead.** The Lenis ticker was wired through `lenisRef.current.lenis` in a mount effect, but ReactLenis creates its instance in a later effect, so the ref was empty and `lenis.raf` never ran. Lenis still intercepted wheel events, so the page could not be scrolled with a mouse wheel. Fix: a `LenisDriver` child uses `useLenis()` (context) and wires the ticker when the instance exists.
- Menu → section links did not scroll: `lenis.scrollTo` was called while the overlay still held Lenis stopped. Fix: defer one frame and pass `force: true`.
- Route change with a hash (essay page → `/#skills`) landed mid-page: Lenis caches page dimensions, and the essay page's smaller scroll limit clamped the jump. Fix: `lenis.resize()` before an `immediate`, `force` scroll on route change.
- Hero `SplitText` `onSplit` ran once with zero lines before fonts settled, producing two "GSAP target not found" warnings. Fix: guard on `lines.length`.
- Lighthouse a11y 94 → 100: `#4a4845` text failed contrast (2.2:1) so all text now uses `ash-400` (5.5:1); `ash-600` is borders only. Added a `<main>` landmark.
- Preloader shortened (~3.4s → ~2.3s) to pull mobile LCP earlier.

Results on the final build:
- Gates: `npm run build` ✓ (all routes static/SSG), `npm run lint` ✓, `npm run typecheck` ✓.
- Console: 0 GSAP warnings, 0 hydration messages on `/` and `/essays/*`.
- Reduced motion (emulated): preloader skipped, all reveals visible, hero visible, physics stage replaced by grid.
- Mobile (iPhone 13 emulation): no horizontal overflow, grid fallback, menu → section scroll works.
- Desktop: menu keyboard flow (Enter opens and focuses first link, Esc closes and returns focus), pill drag moves the body, wheel over the playground scrolls the page, menu → section and essay → `/#skills` land correctly.
- Lighthouse desktop: perf 98 / a11y 100 / best practices 100 / SEO 100, CLS 0, LCP 0.8s.
- Lighthouse mobile: perf 93 / a11y 100 / best practices 100 / SEO 100, CLS 0, LCP 3.0s (hero text after the preloader).

Known limitations / follow-ups:
- OG images use Satori's default font, not Instrument Serif (needs a TTF in `src/assets/fonts/`).
- Project tiles are numbered placeholders until screenshots are added.
- All copy is placeholder; see README for where to edit.
- `site.url` defaults to a Vercel placeholder until the domain exists (`NEXT_PUBLIC_SITE_URL`).

## 2026-10-04 — Signature intro, custom cursor, left rail

Henry asked for three jcedrik details that the first pass left out.
- **Signature intro**: preloader now writes the name in a script font (Great Vibes via `next/font`) behind a soft gradient mask swept by GSAP (`--reveal` CSS var), then tints ember and lifts. The hero gets a small script monogram at top center.
- **Custom cursor** (`Cursor.tsx`): ember dot + lagging ring on `(hover: hover) and (pointer: fine)` with motion allowed; ring grows over links/buttons and becomes a "DRAG" badge over the skills stage (`data-cursor="drag"`). Native cursor hidden via `html.has-cursor`.
- **Left rail** (`LeftRail.tsx`, lg+): 3px edge progress bar scrubbed by ScrollTrigger, vertical outlined "PORTFOLIO", year, and name.
- Bug found: in dev, React Strict Mode runs effects twice; the preloader set its "seen" flag at start, so the second run skipped the intro. That is why the intro never showed on localhost. Flag now set in `onComplete`. Production was unaffected.
- Bug found: cursor cleanup read refs that React had already nulled; nodes are now captured when the effect starts.
- Added `suppressHydrationWarning` on `<html>` because the inline `js` class script and Lenis/cursor classes legitimately differ from the server markup (dev-only warning).

## 2026-10-04 — Real content from résumé and GitHub

- Source: Henry's résumé PDF (Sept 2026) and the public repos on github.com/hhwolf with their READMEs. LinkedIn is behind a login wall and was not used.
- `site.ts`: name, tagline, Brown email, Providence location, GitHub + LinkedIn. Nav label "Essays" → "Writing".
- `projects.ts`: 10 projects (FitCheck/DivHacks winner, Threadline, Mini Desktop, FF Dash, fpl-predict, The Snap League, Kindred, Decluttered, GreenSite, Kalshi NBA pricing) with GitHub links and Vercel deployments where they exist. Descriptions and "challenge" lines are drawn from each README only.
- `journey.ts`: 9 entries from the résumé (Brown, Asteria Labs, Northeastern, MIT Energy Initiative, Cambridge, Tencent Spark Camp, Canadian Solar, Andover, OpenAir).
- `skills.ts`: categories now Languages / Web / Data & ML / Tools, populated from the résumé and repo languages.
- New `publications.ts` + `PublicationList` rendered in the Writing section and on `/essays`; the arXiv preprint links out.
- About section rewritten with a real bio and facts (studying, focus, chess rating).
- The two sample essays are now `draft: true` so no placeholder writing appears under Henry's name; the section shows an empty-state line until a real essay lands.
- `public/resume.pdf` replaced with the real résumé.
- Assumptions to confirm with Henry: class year "Brown '30", "Open to opportunities" status, and that hosting the résumé (which includes a phone number) publicly is intended.

## 2026-10-05 — Project screenshots and résumé redaction

- All five Vercel deployments return 402 "Deployment Paused", so live captures were impossible. Cloned each repo to `/tmp/shots`, installed, ran the dev servers on :5101–:5107, and captured at 1600×1000 with Playwright (The Snap League needed `--use-angle=swiftshader` for WebGL). Where the repo ships better author screenshots (FitCheck `docs/demo/01-variant.png`, Mini Desktop `docs/hero.png`) those were used, downscaled to 1600 wide. Kindred's three phone screenshots from `docs/` were composed into one landscape image.
- Seven projects now have images; FF Dash (needs ESPN credentials), fpl-predict (CLI), and the Kalshi analysis (no figures in repo) keep the numbered placeholder tile.
- Résumé: the phone number and its separator were removed from the PDF content stream with pypdf (glyph-level edit, verified by text extraction), then streams recompressed. The original stays only in `.context/attachments/` (gitignored).

## 2026-10-06 — Deployed to Vercel (Asteria team)

- Henry asked to deploy to "the pro account". The CLI token could not query team plans, so the Asteria team (`asteria-79792469`, hosts app.asterialabs.ai) was taken as the Pro account; the "ast" team is the Hobby one with paused projects.
- `vercel link --project personalwebsite` + `vercel deploy --prod`. Production alias: https://personalwebsite-flax-eta.vercel.app (the bare `personalwebsite.vercel.app` belongs to someone else).
- `NEXT_PUBLIC_SITE_URL` set in Production and redeployed; canonical and sitemap verified. `site.url` fallback updated to the same alias.
- Linking from this Conductor worktree created `.env.local` (gitignored) with a Vercel OIDC token.

## 2026-10-06 — Domain henryrhe.com

- Bought on GoDaddy. Added `henryrhe.com` and `www.henryrhe.com` to the Vercel project (Asteria team). `NEXT_PUBLIC_SITE_URL` and the `site.url` fallback now point at https://henryrhe.com.
- DNS at GoDaddy must be changed by Henry: A `@` → 76.76.21.21 (replace the parking A records), CNAME `www` → cname.vercel-dns.com. Vercel issues the certificate automatically once DNS resolves.
- 2026-10-06 later: GoDaddy DNS changed (A @ → 76.76.21.21, CNAME www → cname.vercel-dns.com). Vercel verified via A record. The automatic certificate did not appear after 5 minutes, so `vercel certs issue henryrhe.com www.henryrhe.com` was run and succeeded (Let's Encrypt, valid to 2027-01-04). Verified against the edge directly: apex 200, www 200, http → https 308.
- Note: the local network this session ran on has a Fortinet DNS filter that intercepts the newly registered domain (resolves to a block page). All verification used DNS-over-HTTPS and `curl --resolve`. Henry may see the same block on that network until the filter's category for the domain updates.

## 2026-10-13 — Copy edits and Reading section

- Hero tagline split onto two lines; "chess master" → "chess National Master".
- About rewritten to Henry's wording; Andover line trimmed to the scholarship; Asteria framed as 2026 (timeline end date "2026"); Leo Celi sentence removed from the MIT entry.
- Skills trimmed to 16 (removed FastAPI, React, Postgres, scikit-learn, Vite, Three.js, Docker, LightGBM, Next.js); "Web" category folded away, Supabase moved to Tools.
- New section 06 "What I'm reading" (`src/data/reading.ts`, `Reading.tsx`): seven books as spines on a shelf. Contact becomes 07. Author attributions were added from the titles; "The Meaning of Your Life" left without an author since the title is ambiguous.

## 2026-10-13 — Hero title case + last three screenshots

- Hero tagline lines title-cased per Henry ("CS & Philosophy At Brown. / Founding Engineer, Climate Researcher, Chess National Master.").
- FF Dash: ran locally against a public ESPN league found by probing IDs (80001, "SMASHMOUTH FOOTBALL") with a throwaway password; captured the Lineup optimizer page because the Dashboard/Matchup pages show other people's team names and an email. Next dev badge hidden via CSS.
- fpl-predict: the repo's static `dashboard/index.html` served with `python -m http.server`, captured in dark scheme.
- Kalshi: the notebook has no figures; its markdown and pandas tables were rendered into a dark styled HTML page and the Revision 7 tracking table captured.
- All ten projects now have images. Temporary servers on :5108/:5109 stopped; clones remain in /tmp/shots.

## 2026-10-15 — Book ring

- Reading section is now a 3D ring (`BookRing.tsx`): books on `rotateY(i·360/n) translateZ(r)`, ring idles at ~3.6°/s, pointer drag spins it with momentum (works on touch via pointer events, `touch-pan-y` keeps vertical scrolling), hover pauses the ring and scales the book 1.18×. Radius adapts to container width. Reduced motion disables the idle spin only. Custom cursor shows "SPIN" over the stage.
- Verified: drag changed ring angle by ~300°, hover scale applied, no horizontal overflow on iPhone 13, no page errors.

## 2026-10-15 — Real covers, résumé removed, reviewer feedback

- Covers fetched from Open Library (six of seven; "The Meaning of Your Life" is ambiguous and keeps the typographic card). Three-Body and Illusion of Choice needed ISBN lookups; title search returned the wrong edition or nothing.
- Résumé removed from the site entirely (file, buttons in About/Footer/Menu, README). Henry's concern is doxxing. The PDF is still in git history of the public repo (commit 1701ac6 has the version with the phone number); flagged for a history purge.
- Feedback from Henry's friend: script font replaced with Instrument Serif italic for the preloader and monogram; "working on!" no longer ember; "at Brown" lowercase; comma after "In 2026"; hobbies sentence rewritten.
- Covers not showing for Henry (Safari): the card used `overflow:hidden` + `backface-visibility` on a container inside a preserve-3d ring, which WebKit drops. Reworked: no clipping container, `backface-visibility` + `translateZ(0)` on the leaf elements (`.book-card > *`), cover carries its own rounding, `loading="eager"` so lazy-loading never stalls on transformed elements.
- "working on" back to ember, no exclamation mark. "The Meaning of Your Life" attributed to Arthur C. Brooks; no cover source found yet (Open Library has no image, Google Books rate-limited).
- Verification limit: Playwright's WebKit build on this Mac renders without accelerated compositing, so even a minimal perspective demo comes out flat there. It confirmed the six covers load (6/6 img complete) but cannot prove Safari's 3D rendering. Chromium verified fully. Henry to confirm in real Safari after a hard refresh.
