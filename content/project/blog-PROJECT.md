# Development blog and portfolio

In this project I'll be showcasing all my own personal projects. It is
a development focused site, where I will list all my updates, discoveries
and how I advance in my different projects. 

The idea is that it reads sort of like a Diary.

I'm using Astro and [this template](https://github.com/ArnavK-09), with some modifications.
The biggest one is that the content of the blog is being captured by a [custom Github Action](https://github.com/EnzoReyes11/worklog-action)
I built. This action sends all the PROJECT.md (like this file) and WORKLOG.md from the repos it's configured, into this repo.
Then, Astro use that content to statically build the collections to serve.

This blog is being served by Github Pages, and it's redeployed on each merge into main branch.


## Backlog:

- Titles of sections in the homepage should link to that section.
  - About Me and Technologies still need standalone pages.
- Re-evaluate if the card design looks good when there is more content. 
- Navigation and Filters:
  1 On each Worklog post there should be an automatically created link into the Project file.
  1 On each Project file, there should be a link into the Worklog section, but filtered by Project.
  1 Clicking on a Technology chip should link to Projects and Worklogs related to that. To accomplish this, each Project should have (added manually at least), the list of technologies used.
- Find a Hero image.


## Technologies:
- Typescript
- Astro
- Tailwind
- NPM
- PNPM
- Vite
