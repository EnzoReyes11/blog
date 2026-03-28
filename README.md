# Development blog and portfolio

In this project I'll be showcasing all my own personal projects. It is a development focused site, where I will list all my updates, discoveries and how I advance in my different projects.

The idea is that it reads sort of like a Diary.

I'm using Astro and this template, with some modifications. The biggest one is that the content of the blog is being captured by a custom Github Action I built. This action sends all the PROJECT.md (like this file) and WORKLOG.md from the repos it's configured, into this repo. Then, Astro use that content to statically build the collections to serve.

This blog is being served by Github Pages, and it's redeployed on each merge into main branch.

---

## Running locally

```bash
cd portfolio
pnpm run dev
```

The dev server starts at `http://localhost:4321`.

---

## Content Guide

Each repo tracked by this blog needs two files at its root: `PROJECT.md` and `WORKLOG.md`. The [worklog-action](https://github.com/EnzoReyes11/worklog-action) syncs them here automatically on push.

### PROJECT.md

Describes the project. Becomes a single entry in the **Projects** section.

- First line must be `# Title` — used as the project title.
- Second paragraph (separated by a blank line) is used as the card description (truncated to 160 chars).
- Rest of the file is free-form markdown rendered on the project page.
- Recommended to include a `## Tags` section with backtick-wrapped tags.

```markdown
# My Project

Short description of the project. This shows up on the card.

## What it does

Longer explanation...

## Tags

`python` `docker` `gcp`
```

### WORKLOG.md

A running log of work sessions. Each date entry becomes a separate post in the **Blog** section.

- Any text before the first date heading is an "intro" — it is prepended to every entry when rendered.
- Date headings must follow the format `### DD/MM/YY` (e.g. `### 23/03/26`). Any other format is ignored by the parser.
- Entry body is free-form markdown. Conventional sections are `#### Done:` and `#### Work Remaining:`.

```markdown
# Worklog

Optional intro text. Appears at the top of every blog post from this repo.

### 23/03/26
One-line summary of the session.

#### Done:
- Thing I completed

#### Work Remaining:
- Thing still to do

### 22/03/26
Another session...
```

> **Note:** Date formats like `## YYYY-MM-DD` are not recognised — only `### DD/MM/YY` produces blog posts.
