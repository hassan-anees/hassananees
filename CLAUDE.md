# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (astro dev)
npm run build     # Type-check + build (astro check && astro build)
npm run preview   # Preview production build
```

No linting or testing scripts are configured.

## Architecture

**Stack:** Astro 5, Tailwind CSS 3, TypeScript, deployed to Cloudflare Pages via GitHub Actions.

**Routing:**
- `src/pages/index.astro` — Home (Hero, About, Speaking, RecentWork, OpenSource sections)
- `src/pages/work.astro` — Work/experience page
- `src/pages/writing/[...page].astro` — Paginated blog list (5 posts/page)
- `src/pages/posts/[...slug].astro` — Individual blog post pages

**Content Collections:** Blog posts live in `src/content/posts/` as `.md`/`.mdx` files. The schema is defined in `src/content.config.ts` with fields: `title`, `pubDate`, `description`, `author`, `image`, `tags`, `draft`. Draft posts are hidden in production (`import.meta.env.PROD`).

**Layouts:**
- `src/layouts/Layout.astro` — Root layout (fonts, Umami analytics, Alpine.js v2)
- `src/layouts/BlogLayout.astro` — Blog post layout (medium-zoom for images, auto-figcaptions from alt text)

**Key integrations:**
- `astro-icon` — Iconify icons (devicon, mdi, logos, meteocons sets)
- `astro-expressive-code` — Syntax highlighting in posts
- `@astrojs/sitemap` — Auto-generated sitemap
- `astro-seo` — Meta/OG/Twitter card tags via `Head.astro`
- Alpine.js — Interactive components (Speaking gallery modal, mobile menu)

**Styling:** Tailwind with `@tailwindcss/typography` for prose. Font is Urbanist (`@fontsource-variable/urbanist`). Custom typography overrides are in `tailwind.config.js`.

**Deployment:** Manual via GitHub Actions (`deploy-cloudflare.yml`, `workflow_dispatch`). The "Publish" button in the nav links to this GitHub Action.

**CMS:** Decap CMS configured in `.pages.yml` for managing blog posts through a UI.
