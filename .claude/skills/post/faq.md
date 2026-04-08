# Blog Writing FAQ

> In all examples below, `{slug}` is the MDX filename without extension (e.g. for `data/blog/2026/01/my-first-post.mdx`, the slug is `my-first-post`).

## How to add images

1. Place image files in `public/static/images/{year}/{month}/{slug}/`
2. Reference in MDX:
   ```mdx
   ![Alt text](/static/images/{year}/{month}/{slug}/image.png)
   ```
3. For images with captions or custom sizing, use the `Image` component from Next.js:
   ```mdx
   import Image from 'next/image'

   <Image src="/static/images/{year}/{month}/{slug}/image.png" alt="Alt text" width={800} height={400} />
   ```

**Important:** Before adding images larger than 1MB, compress them first using [TinyPNG](https://tinypng.com/) to reduce file size while maintaining visual quality.

**Example:** For a post at `data/blog/2026/01/my-first-post.mdx` with an image `hero.png`:
- Place the file at `public/static/images/2026/01/my-first-post/hero.png`
- Reference it as `![Hero](/static/images/2026/01/my-first-post/hero.png)`

## How to embed videos

- **YouTube** — use an iframe with the video ID:
  ```mdx
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Video title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
  />
  ```
- **Bilibili** — use an iframe with the BV ID:
  ```mdx
  <iframe
    src="//player.bilibili.com/player.html?bvid=BVID&page=1"
    width="560"
    height="315"
    allowFullScreen
  />
  ```
- For other platforms, use their embed `<iframe>` code directly in MDX.

**Example:** Embedding a YouTube video with ID `dQw4w9WgXcQ`:
```mdx
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
  title="Example video"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
/>
```

## How to add code blocks

Use triple backticks with a language identifier. A title can be added after the language:

````mdx
```python:hello.py
print("Hello, world!")
```
````

Supported features: syntax highlighting (Prism), line numbers, line highlighting, and code titles (via `remark-code-title`).

**Example:** A JavaScript code block with a filename title:
````mdx
```js:utils/format.js
export const formatDate = (date) => new Date(date).toLocaleDateString()
```
````

## How to use math equations

This blog supports KaTeX. Use `$...$` for inline math and `$$...$$` for display math.

**Example:**
```mdx
The famous equation $E = mc^2$ changed physics forever.

The Gaussian integral:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

## How to add a table of contents

The TOC is generated automatically from headings. No extra configuration needed — it's a computed field from Contentlayer.

**Example:** Just use standard markdown headings in your post:
```mdx
## Introduction
Some text...

## Getting Started
More text...

### Prerequisites
Details...
```

## How to set a cover/banner image

Use the `PostBanner` layout and set `images` in frontmatter.

**Example:** For `data/blog/2026/01/my-first-post.mdx` with a banner image:
```yaml
---
title: 'My First Post'
date: '2026-01-01'
images: ['/static/images/2026/01/my-first-post/banner.jpg']
layout: PostBanner
---
```

## How to add links to other posts

Use standard Markdown links with the post's URL path.

**Example:** Linking to `data/blog/2026/03/getting-started.mdx`:
```mdx
Check out my [getting started guide](/blog/2026/03/getting-started).
```

## How to create a multi-part series

Create a subdirectory under `data/blog/{year}/` with parts.

**Example:** A 3-part tutorial series:
```
data/blog/2026/06/react-tutorial/
├── part-1.mdx
├── part-2.mdx
└── part-3.mdx
```
- Part 1 URL: `/blog/2026/06/react-tutorial/part-1`
- Part 2 URL: `/blog/2026/06/react-tutorial/part-2`
- Part 3 URL: `/blog/2026/06/react-tutorial/part-3`

## How to add alerts/callouts

Use GitHub-style alerts (via `remark-github-blockquote-alert`).

**Example:**
```mdx
> [!NOTE]
> This feature requires Node.js 18 or later.

> [!WARNING]
> This will delete all existing data in the database.

> [!TIP]
> You can speed this up by enabling caching in `next.config.js`.
```

## How to add citations/bibliography

1. Create a `.bib` file (e.g., `data/references.bib`)
2. Set `bibliography` in frontmatter
3. Cite in text with `[@citationKey]`

**Example:** For a post referencing academic papers:
```yaml
---
title: 'Literature Review'
date: '2026-03-15'
bibliography: references.bib
---
```
Then cite in the body: `According to [@smith2024], transformer models...`

## How to publish / deploy a post

This blog is deployed via **GitHub Pages** using GitHub Actions. To publish:

1. Write your post in `data/blog/{year}/{month}/{slug}.mdx`
2. Make sure `draft: false` in frontmatter (drafts with `draft: true` are excluded from the build)
3. Commit and push to the `blogs` branch:
   ```bash
   git add .
   git commit -m "feat: add new post {slug}"
   git push origin blogs
   ```
4. GitHub Actions will automatically build and deploy the site — check the **Actions** tab in your repository for build status
5. Once the workflow completes, the post will be live at `{siteUrl}/blog/{year}/{month}/{slug}`

**Tips:**
- To preview locally before publishing, run `yarn dev` and visit `http://localhost:3000/blog/{year}/{month}/{slug}`
- If you want to save a work-in-progress without publishing, set `draft: true` in frontmatter — the post won't appear on the site but will exist in the repository
- After pushing, the build typically takes 1-3 minutes to complete

## How to manage tags

Tags are listed in the `tags` frontmatter field as an array. You do **not** need to register tags anywhere — `app/tag-data.json` is auto-generated by Contentlayer during the build. Never edit `tag-data.json` manually.

**Example:**
```yaml
---
title: 'My Post'
date: '2026-04-01'
tags: ['deep-learning', 'medical-imaging']
---
```

After building (`yarn build` or `yarn dev`), these tags will automatically appear in the tag index and sidebar.

## How to organize images in drafts

When preparing a draft in `drafts/`, images can be placed in the **same directory** as the `.md` file or in **subdirectories** alongside it. The publish workflow will find and copy all images, preserving the relative directory structure.

**Example:** A draft with images in subdirectories:
```
drafts/
  my-article.md
  hero.png
  figures/
    fig1.png
    fig2.png
```

After publishing, the images will be copied to:
```
public/static/images/2026/04/my-article/
  hero.png
  figures/
    fig1.png
    fig2.png
```

And image paths in the content will be rewritten accordingly (e.g., `figures/fig1.png` → `/static/images/2026/04/my-article/figures/fig1.png`).

## What frontmatter fields are required

Only **`title`** and **`authors`** require user confirmation when publishing a draft. All other fields use defaults silently if missing:

| Field     | Default                                      |
|-----------|----------------------------------------------|
| `date`    | Today's date (YYYY-MM-DD)                    |
| `tags`    | `[]`                                         |
| `draft`   | `false`                                      |
| `summary` | Auto-generated from post content (1–2 lines) |
| `authors` | `['junma']` (Create New Post) / Inferred from existing author files (Publish Draft) |

**Example:** A minimal draft frontmatter:
```yaml
---
title: 'My Post'
---
```
This is enough — the publish workflow will fill in the rest.

## How to add or manage authors

Authors are stored as `.mdx` files in `data/authors/`. Each blog post references authors by their filename slug in the `authors` frontmatter field.

**To add a new author:**

Create `data/authors/{slug}.mdx`:
```mdx
---
name: 'Display Name'
avatar: ''
occupation: ''
company: ''
email: ''
x: ''
linkedin: ''
github: ''
---

A short bio about the author.
```

Then reference the author in a blog post:
```yaml
---
title: 'My Post'
authors: ['junma', 'newauthor']
---
```

**Tips:**
- The slug is the filename without extension (e.g., `junma.mdx` → `junma`)
- If you omit `authors` in frontmatter, the publish workflow will infer from existing author files — if there is only one, it is used automatically
- When publishing a draft with an unknown author slug, the workflow will ask whether to create the author file or pick an existing one

## How to publish a draft using `/post`

The `/post` command can publish a `.md` file from the `drafts/` directory as a blog post. It handles frontmatter, images, and authors automatically.

**Steps:**

1. Place your `.md` file (and any images) in `drafts/`:
   ```
   drafts/
     my-article.md
     hero.png
   ```
2. Run `/post` — if there is one `.md` file, it is selected automatically; if multiple, you will be asked to pick one.
3. The workflow validates the draft, shows proposed frontmatter, copies images to `public/static/images/{year}/{month}/{slug}/`, rewrites image paths, and writes the final `.mdx` to `data/blog/{year}/{month}/{slug}.mdx`.
4. After verification, you will be asked to confirm before committing and pushing to the `blogs` branch.

**Tips:**
- Original files in `drafts/` are kept — they are not deleted after publishing
- The workflow runs a lightweight content check (frontmatter validity, image existence, MDX syntax) instead of a full production build
- To preview the published post locally, run `yarn dev` after the `.mdx` file is created

## Available layouts

- **PostLayout** (default) — standard post with sidebar TOC and author info
- **PostSimple** — clean minimal layout without sidebar
- **PostBanner** — full-width banner image at the top (requires `images` in frontmatter)

**Example:** Using `PostSimple` for a minimal post:
```yaml
---
title: 'A Simple Note'
date: '2026-04-01'
layout: PostSimple
---
```
