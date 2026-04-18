# Worklog


### 28/03/26
Wired up PostHog analytics and set up Astro's env var system for the portfolio. Also created a global Claude skill for updating this worklog.

#### Done:
- Added PostHog snippet to `BaseHead.astro` so it fires on every page.
- Set up the `env.schema` in `astro.config.mjs` using `envField`. Now `PUBLIC_POSTHOG_TOKEN` and `PUBLIC_POSTHOG_API_HOST` are properly typed and validated at build time.
- Injecting env vars into the inline script via `define:vars`.
- Created the `update-worklog` global Claude skill.
- Added variables as Github Repository Secret.
- Added logging of deployments into PostHog.
- Verified it's working properly in PostHog!

#### Work Remaining:
- I noticed that in the cards, the markdown is not interpreted properly. I see #### Done, instead of the styled content.
- Add pagination.
- Add filtering of blog entries by Project and by Technology.
- Update the theme to something less quirky.

i
### 18/04/26
Created a IT Consulting site to market on FB, Whatsapp, etc.

#### Next steps:
- Update the blog to the new site, and have it linked. Currently only the consulting site
is displayed.

### 25/11/25
Starting to build a bigger site

#### Done:
- Generated new markup for all sections
- Created a new astro site from scratch
- Started to convert the markup to astro code

#### Work Remaining:
- Green color is not being picked from styles
- Convert all the markup to astro
- Add the JS 


### 10/10/25
Improved fonts and other minor changes.

#### Done:
- Added the new IBM Plex Font (normal and italic) into Tailwind. Now font-sans is IBM Plex.
- Fixed the fonts in Chips and BlogPostCard excerpt. 
- Fixed white space wrapping in About Me.
- Added backlong and Techonologies into Project.md

### 09/10/25
Now this blog also uses worklog-action to generate the content.
Started to tweak the fonts.


#### Done:
- Updating the fonts so it's easier to read. Using IBM Plex Sans except on headers and 
anchors.
- Added the Workflow Action into this repo. It's redundant, but now creating content for this 
works the same as in the other repos.

#### Work Remaining:
- More intelligent use of fonts.
  - Adding to all anchors look bad. Also
  - The chips with technologies in the frontpage look bad.
- Keep looking for a Hero image to use in the homepage.

### 08/10/25
Hello Blog! I just put online the Astro page on Github Pages. 