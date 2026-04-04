# Foundation Models for Medical Vision — Blog

A research blog built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Contentlayer](https://www.contentlayer.dev/), based on the [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) template.

## Quick Start

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Commands

```bash
yarn dev          # Start dev server (localhost:3000, Turbopack)
yarn build        # Production build + RSS feed generation
yarn serve        # Start production server
yarn lint         # ESLint with auto-fix
yarn analyze      # Bundle size analysis
```

## Writing Blog Posts

1. Create a `.mdx` file in `data/blog/` (nested directories supported).
2. Add frontmatter:

```yaml
---
title: 'Your Post Title'
date: '2026-04-04'
tags: ['segmentation', 'foundation-model']
draft: false
summary: 'A brief summary for the listing page.'
authors: ['default']
layout: PostLayout
---
```

3. Write content in MDX (Markdown + JSX). Available components: `Image`, `TOCInline`, code blocks with syntax highlighting, KaTeX math, GitHub-style alerts.
4. Place images in `public/static/images/` and reference as `/static/images/filename.png`.

### Frontmatter Fields

| Field          | Required | Description                                              |
| -------------- | -------- | -------------------------------------------------------- |
| `title`        | Yes      | Post title                                               |
| `date`         | Yes      | Publication date (YYYY-MM-DD)                            |
| `tags`         | No       | List of tags (auto-indexed at build time)                |
| `lastmod`      | No       | Last modified date                                       |
| `draft`        | No       | Set `true` to hide from production                       |
| `summary`      | No       | Brief description for listing and social share           |
| `images`       | No       | Open Graph images                                        |
| `authors`      | No       | List of author filenames (defaults to `['default']`)     |
| `layout`       | No       | `PostLayout` (default), `PostSimple`, or `PostBanner`    |
| `bibliography` | No       | Path to `.bib` file for citations                        |
| `canonicalUrl` | No       | Canonical URL for SEO                                    |

## Customization

| What                   | Where                           |
| ---------------------- | ------------------------------- |
| Site metadata & config | `data/siteMetadata.js`          |
| Navigation links       | `data/headerNavLinks.ts`        |
| Author profiles        | `data/authors/*.mdx`            |
| Project cards          | `data/projectsData.ts`          |
| Logo                   | `data/logo.svg`                 |
| Favicons               | `public/static/favicons/`       |
| Theme colors           | `css/tailwind.css`              |
| Syntax highlighting    | `css/prism.css`                 |
| Content schema         | `contentlayer.config.ts`        |
| Security headers       | `next.config.js`                |

## Deploy

### GitHub Pages (recommended)

A `pages.yml` workflow is provided in `.github/workflows/`. Select "GitHub Actions" in: Settings > Pages > Build and deployment > Source. Pushes to `main` or `blogs` branch trigger automatic deployment.

### Vercel (optional)

Push to GitHub and import in [Vercel](https://vercel.com). No extra configuration needed.

### Static Export

```bash
EXPORT=1 UNOPTIMIZED=1 yarn build
```

For subdirectory hosting (e.g., `https://junma.ai/blog`):

```bash
EXPORT=1 UNOPTIMIZED=1 BASE_PATH=/blog yarn build
```

## License

[MIT](./LICENSE) — based on [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by [Timothy Lin](https://www.timlrx.com).
