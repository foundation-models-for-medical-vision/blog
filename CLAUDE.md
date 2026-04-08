# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Foundation Models for Medical Vision blog — a Next.js 15 blog for Jun Ma's research group at UHN (University Health Network). Built on the [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template.

## Commands

```bash
yarn dev          # Dev server on localhost:3000 (uses Turbopack)
yarn build        # Production build + postbuild (RSS + search index generation)
yarn serve        # Start production server
yarn lint         # ESLint with auto-fix (scans pages, app, components, lib, layouts, scripts)
yarn analyze      # Bundle size analysis (ANALYZE=true)
```

Package manager is **Yarn 3.6.1** (Berry). Lock file: `yarn.lock`.

## Architecture

- **Framework:** Next.js 15.5 App Router + React 19 + TypeScript 5.9
- **Content pipeline:** Contentlayer2 processes `.mdx` files from `data/` into type-safe JSON. Schema in `contentlayer.config.ts` defines two document types: `Blog` (from `data/blog/**/*.mdx`) and `Authors` (from `data/authors/**/*.mdx`). On build success, Contentlayer runs hooks to generate `app/tag-data.json` (tag counts) and `public/search.json` (kbar search index).
- **MDX plugins:** remark-gfm, remark-math, remark-github-blockquote-alert, remark-code-titles, remark-img-to-jsx; rehype-slug, rehype-autolink-headings, rehype-katex, rehype-citation, rehype-prism-plus, rehype-preset-minify.
- **Styling:** Tailwind CSS v4 via `@tailwindcss/postcss`. Theme colors defined in `css/tailwind.css` using OKLCH color space. Plugins: `@tailwindcss/forms`, `@tailwindcss/typography`. Font: Space Grotesk (loaded via `next/font/google`).
- **Search:** Kbar (local, Cmd+K). Index auto-generated at `public/search.json` during Contentlayer build.
- **RSS:** `scripts/postbuild.mjs` generates `public/feed.xml` + per-tag feeds under `public/tags/[tag]/feed.xml`.
- **Theming:** `next-themes` provides system/light/dark mode via `app/theme-providers.tsx` (client component).
- **Utility library:** `pliny` provides analytics, search, comments, newsletter, and MDX plugin integrations.

## Key Files & Directories

- `data/siteMetadata.js` — Central config: site title, author, social links, analytics, comments, search, newsletter providers. Almost all site-wide behavior is toggled here.
- `data/blog/*.mdx` — Blog posts. Frontmatter fields: `title` (required), `date` (required), `tags`, `lastmod`, `draft`, `summary`, `images`, `authors`, `layout`, `bibliography`, `canonicalUrl`.
- `data/authors/*.mdx` — Author profiles referenced by blog post `authors` field. Frontmatter: `name`, `avatar`, `occupation`, `company`, social links.
- `data/headerNavLinks.ts` — Top navigation menu items.
- `data/projectsData.ts` — Project cards shown on `/projects`.
- `layouts/` — Page templates: `PostLayout` (2-column with author sidebar), `PostSimple` (minimal single-column), `PostBanner` (hero image), `ListLayoutWithTags` (blog listing with tag sidebar), `AuthorLayout` (about page).
- `components/MDXComponents.tsx` — Components available inside MDX: `Image`, `TOCInline`, `a` (custom Link), `pre` (code block), `table` (wrapper), `BlogNewsletterForm`.
- `components/social-icons/` — SVG icon components for social platforms.
- `css/tailwind.css` — Tailwind theme + custom utilities (prose styles, task lists, footnotes, KaTeX overflow).
- `css/prism.css` — Syntax highlighting theme (light + dark).
- `next.config.js` — Integrates Contentlayer + bundle analyzer, defines CSP headers, enables Turbopack, configures SVG-as-component via `@svgr/webpack`.
- `contentlayer.config.ts` — Content schema, computed fields (readingTime, slug, path, toc, structuredData), MDX plugin chain, build hooks.

## App Routing Structure

```
app/
├── page.tsx                       # Home (/)
├── blog/page.tsx                  # Blog listing (/blog)
├── blog/page/[page]/page.tsx      # Paginated listing (/blog/page/2)
├── blog/[...slug]/page.tsx        # Individual post (/blog/hello-world)
├── tags/page.tsx                  # All tags (/tags)
├── tags/[tag]/page.tsx            # Posts by tag (/tags/introduction)
├── tags/[tag]/page/[page]/        # Paginated tag posts
├── projects/page.tsx              # Projects (/projects)
├── about/page.tsx                 # About (/about)
├── api/newsletter/route.ts        # Newsletter API endpoint
├── sitemap.ts                     # Dynamic sitemap
└── robots.ts                      # robots.txt
```

## Content Workflow

1. Create `.mdx` files in `data/blog/`. Nested directories supported (e.g., `data/blog/2026/my-post.mdx` → `/blog/2026/my-post`).
2. Set `draft: true` in frontmatter to hide from production builds.
3. Reference authors by filename (e.g., `authors: ['junma']` → `data/authors/junma.mdx`).
4. Blog post `layout` field selects template: `PostLayout` (default), `PostSimple`, `PostBanner`.
5. Images go in `public/static/images/`. Reference as `/static/images/filename.png` in MDX.
6. Tags are auto-indexed at build time. No manual tag registration needed.

## Current Site Configuration

- **Comments:** Disabled (no provider).
- **Newsletter:** External Google Form (not built-in provider).
- **Analytics:** Umami (configured via `NEXT_UMAMI_ID` env var).
- **Social links:** GitHub, X (Twitter), LinkedIn — Jun Ma's profiles.
- **Deployment:** Supports Vercel (default), static export (`EXPORT=1 UNOPTIMIZED=1`), or subdirectory hosting (`BASE_PATH=/blog`).

## Code Style

- Prettier: no semicolons, single quotes, 100 char width, trailing commas (es5).
- Husky pre-commit hook runs lint-staged (ESLint fix + Prettier) on staged files.

## Skills

When answering workflow questions (e.g. "how to post a blog", "how to publish"), check `.claude/skills/` for relevant skill docs before responding. Skill FAQ files contain the authoritative, up-to-date workflows for this project.
