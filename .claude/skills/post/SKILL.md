---
description: Create a new blog post or get help with blog content (images, videos, formatting, etc.)
user_invocable: true
---

# Blog Post Helper

Create a new blog post or get answers about writing blog content in this project.

## Determine User Intent

First, **recursively search the `drafts/` directory** (including all subdirectories) for `.md` files:

- If there is **exactly one `.md` file** → go to [Publish Draft](#publish-draft) using that file.
- If there are **multiple `.md` files** → list them (showing their relative paths from `drafts/`) and ask the user which one to publish.
- If there are **no `.md` files** in `drafts/` or its subdirectories, then:
  - Tell the user: "The `drafts/` directory does not contain any `.md` files. Would you like to create a new blog post?"
  - If they confirm → go to [Create New Post](#create-new-post)
  - If they asked a **question about blog writing** → read `.claude/skills/post/faq.md` and answer based on its content. If their question isn't covered there, read the relevant source files to find the answer.

---

## Create New Post

1. If the user hasn't provided a title, ask only for the **Title**. All other fields use defaults:
   - **Date**: today (YYYY-MM-DD)
   - **Tags**: `[]`
   - **Draft**: `false`
   - **Summary**: `''`
   - **Authors**: `['default']`

2. Generate the slug from the title (lowercase, hyphens, no special characters).

3. Extract the year and month (two-digit, e.g. `04`) from the date.

4. Create the MDX file at `data/blog/{year}/{month}/{slug}.mdx` with this template:

```mdx
---
title: '{title}'
date: '{date}'
tags: []
draft: false
summary: ''
authors: ['default']
---

Start writing here...
```

5. Create the image directory at `public/static/images/{year}/{month}/{slug}/`.

6. After creating the file, briefly confirm and remind the user:
   - The file path and post URL
   - Images go in `public/static/images/{year}/{month}/{slug}/`
   - They can continue to ask you to modify the post (add tags, summary, content, etc.) or edit the file directly

---

## Publish Draft

Publish a `.md` file from `drafts/` as a blog post.

### Draft Directory Layout

The `.md` file may be at the top level of `drafts/` or nested in subdirectories:

```
drafts/
  my-article.md              # Top-level draft
  image1.png                 # Images alongside the .md file
  subdir/deeper/
    another-article.md        # Nested draft
    figure.jpg                # Images alongside the nested .md file
```

Images are expected to be in the **same directory** as the `.md` file.

### Steps

1. **Read the `.md` file** from `drafts/` and parse its content.

2. **Derive the slug** from the `.md` filename (strip extension, lowercase, hyphens, no special characters).

3. **Build frontmatter.** The `.md` file may or may not have YAML frontmatter. Fill in any missing fields with defaults:
   - **title**: Use frontmatter value if present; otherwise derive from filename (hyphens → spaces, title case).
   - **date**: Use frontmatter value if present; otherwise use today (YYYY-MM-DD).
   - **tags**: Use frontmatter value if present; otherwise `[]`.
   - **draft**: Always set to `false`.
   - **summary**: Use frontmatter value if present; if missing or empty, read the post content and generate a concise 1–2 sentence summary.
   - **authors**: Use frontmatter value if present; otherwise `['default']`.

4. **Determine the year and month** (two-digit, e.g. `04`) from the `date` field.

5. **Copy images.** Find all image files (`*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`, `*.svg`) in the **same directory** as the `.md` file. Copy them to `public/static/images/{year}/{month}/{slug}/` (create the directory if needed).

6. **Rewrite image paths** in the content. Replace relative image references with the canonical blog path `/static/images/{year}/{month}/{slug}/{filename}`. Handle:
   - `./image.png`, `image.png`, `../image.png` (relative paths)
   - Markdown syntax: `![alt](path)`
   - HTML/JSX syntax: `src="path"` or `src={...}`

7. **Write the `.mdx` file** to `data/blog/{year}/{month}/{slug}.mdx` with the final frontmatter + rewritten content.

8. **Build verification.** Run `yarn build` to verify the generated `.mdx` compiles successfully. If the build fails:
   - Read the error output and fix the issue in the generated `.mdx` file (e.g., invalid frontmatter, broken image paths, unsupported MDX syntax).
   - Re-run `yarn build` to confirm the fix.
   - Repeat until the build passes. Do NOT proceed to the next step until the build succeeds.

9. **Delete the published `.md` file** from its location under `drafts/` (keep other files intact). Do NOT delete images from `drafts/` — the user may want to keep originals.

10. **Print the generated file tree** so the user can see what was created. Use a tree-style listing showing all new/modified paths, for example:
    ```
    data/blog/2026/04/my-article.mdx
    public/static/images/2026/04/my-article/
    ├── image1.png
    └── image2.jpg
    ```

11. **Show a summary** to the user:
    - The final frontmatter values (title, date, tags, summary)
    - Post URL (`/blog/{year}/{month}/{slug}`)
    - Build verification result (passed)

12. **Ask the user to confirm** before committing. Wait for explicit approval, then commit and push.

