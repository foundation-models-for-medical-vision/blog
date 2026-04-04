---
description: Create a new blog post or get help with blog content (images, videos, formatting, etc.)
user_invocable: true
---

# Blog Post Helper

Create a new blog post or get answers about writing blog content in this project.

## Determine User Intent

First, determine what the user wants:

- If they want to **create a new post** → go to [Create New Post](#create-new-post)
- If they asked a **question about blog writing** → read `.claude/skills/post/faq.md` and answer based on its content. If their question isn't covered there, read the relevant source files to find the answer.
- If unclear, ask: "Would you like to create a new post, or do you have a question about writing blog content?"

---

## Create New Post

1. If the user hasn't provided a title, ask only for the **Title**. All other fields use defaults:
   - **Date**: today (YYYY-MM-DD)
   - **Tags**: `[]`
   - **Draft**: `false`
   - **Summary**: `''`
   - **Authors**: `['default']`

2. Generate the slug from the title (lowercase, hyphens, no special characters).

3. Extract the year from the date.

4. Create the MDX file at `data/blog/{year}/{slug}.mdx` with this template:

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

5. Create the image directory at `public/static/images/{year}/{slug}/`.

6. After creating the file, briefly confirm and remind the user:
   - The file path and post URL
   - Images go in `public/static/images/{year}/{slug}/`
   - They can continue to ask you to modify the post (add tags, summary, content, etc.) or edit the file directly

