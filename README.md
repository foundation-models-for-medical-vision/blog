# Foundation Models for Medical Vision — Blog

A research blog for Jun Ma's group at UHN (University Health Network). Publish posts with [Claude Code](https://claude.ai/code) — just drop your draft and run `/post`.

## Publishing Blog Posts

This project uses [Claude Code](https://claude.ai/code) skills to streamline blog publishing. The `/post` skill automates frontmatter generation, image handling, and content validation.

**TL;DR** — three steps to publish:

1. Put your `.md` file and images in `drafts/`
2. Run `/post` in Claude Code
3. Confirm and push — done

**Or, just ask Claude Code "how to post a blog" — it knows the workflow.**

### Prerequisites

1. Clone the repo and open [Claude Code](https://claude.ai/code) in the repo directory:
   ```bash
   git clone https://github.com/foundation-models-for-medical-vision/blog.git
   cd blog
   ```
2. Make sure [Claude Code](https://claude.ai/code) is installed — it's available as a CLI, desktop app, web app, or IDE extension.

### Publishing with `/post` (recommended)

1. **Prepare your draft.** Place your `.md` file and any images in the `drafts/` directory:
   ```
   drafts/
     my-article.md
     hero.png
     figures/
       fig1.png
   ```
2. **Run `/post`** in Claude Code. The skill will:
   - Auto-detect your `.md` file (or ask you to pick one if there are multiple)
   - Validate frontmatter — only `title` and `authors` need confirmation; `date`, `tags`, `summary` are filled automatically if missing
   - Copy images to `public/static/images/{year}/{month}/{slug}/` and rewrite paths in the content
   - Write the final `.mdx` file to `data/blog/{year}/{month}/{slug}.mdx`
   - Run content verification (YAML validity, image existence, MDX syntax)
   - Ask for your confirmation, then commit and push

3. **That's it.** GitHub Actions will build and deploy the site automatically.

> **Tip:** Specify `title` and `authors` in your draft's frontmatter to skip confirmation prompts:
> ```yaml
> ---
> title: 'My Article'
> authors: ['junma']
> ---
> ```

### Creating a new post from scratch

If you don't have a draft file, run `/post` with an empty `drafts/` directory. Claude Code will offer to create a new `.mdx` file with the correct frontmatter template — just provide a title.

### Manual publishing

You can also create `.mdx` files directly under `data/blog/{year}/{month}/`:

```yaml
---
title: 'My Post'
date: '2026-04-01'
tags: ['deep-learning']
draft: false
summary: 'A brief summary.'
authors: ['junma']
---

Start writing here...
```

Images go in `public/static/images/{year}/{month}/{slug}/`.

### FAQ & help

The full blog writing FAQ (images, videos, math, citations, layouts, etc.) is built into the skill. Just ask Claude Code any question about blog writing, or run `/post` and ask — the skill will answer based on the project's FAQ docs.

> **Using other AI coding agents?** The skill files under `.claude/skills/` are plain markdown — copy the content into your agent's rules file (e.g., `.cursorrules`) and it can follow the same workflow. The `/post` slash command is Claude Code–specific, but the instructions themselves are universal.

## Customization

| What                   | Where                     |
| ---------------------- | ------------------------- |
| Site metadata & config | `data/siteMetadata.js`    |
| Navigation links       | `data/headerNavLinks.ts`  |
| Author profiles        | `data/authors/*.mdx`      |
| Project cards          | `data/projectsData.ts`    |
| Logo                   | `data/logo.svg`           |
| Favicons               | `public/static/favicons/` |
| Theme colors           | `css/tailwind.css`        |
| Syntax highlighting    | `css/prism.css`           |
| Content schema         | `contentlayer.config.ts`  |
| Security headers       | `next.config.js`          |

## Local Development & Deployment (optional)

Deployment is already configured — pushing to the `blogs` branch triggers GitHub Actions to build and deploy automatically. If you want to preview the site locally or hack on the codebase:

```bash
yarn install      # Install dependencies
yarn dev          # Start dev server (localhost:3000, Turbopack)
yarn build        # Production build + RSS feed generation
yarn serve        # Start production server
yarn lint         # ESLint with auto-fix
yarn analyze      # Bundle size analysis
```

This is **not required** for publishing posts — the `/post` skill and GitHub Actions handle everything.

## License

[MIT](./LICENSE) — based on [tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by [Timothy Lin](https://www.timlrx.com).
