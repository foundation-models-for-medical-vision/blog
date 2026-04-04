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
3. Commit and push to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: add new post {slug}"
   git push origin main
   ```
4. GitHub Actions will automatically build and deploy the site — check the **Actions** tab in your repository for build status
5. Once the workflow completes, the post will be live at `{siteUrl}/blog/{year}/{month}/{slug}`

**Tips:**
- To preview locally before publishing, run `yarn dev` and visit `http://localhost:3000/blog/{year}/{month}/{slug}`
- If you want to save a work-in-progress without publishing, set `draft: true` in frontmatter — the post won't appear on the site but will exist in the repository
- After pushing, the build typically takes 1-3 minutes to complete

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
