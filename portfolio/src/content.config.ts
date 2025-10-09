import { defineCollection, z } from "astro:content";
import fs from "fs/promises";
import path from "path";
import type { Loader } from 'astro/loaders';

function worklogLoader(): Loader {
  return {
    name: 'worklog-loader',
    load: async ({ renderMarkdown, store, logger}) => {
      store.clear();
      const contentDir = "../content/worklog";

      try {
        const files = await fs.readdir(contentDir);
        const worklogFiles = files.filter((file) => file.endsWith(".md"));

        for (const file of worklogFiles) {
          const filePath = path.join(contentDir, file);
          const content = await fs.readFile(filePath, "utf-8");
          const repoName = file.replace(/-WORKLOG\.md$/, "");
          const introMatch = content.match(/^(.*?)(?=###\s\d{2}\/\d{2}\/\d{2})/s);
          const intro = introMatch ? introMatch[1].trim().replace(/^#\s*(.*)/, "") : "";
          const titleMatch = content.match(/^#\s*(.*)/);
          const title = titleMatch ? titleMatch[1] : repoName;
          const dateEntries = content.split(/(?=###\s\d{2}\/\d{2}\/\d{2})/).slice(1);

          for (const entry of dateEntries) {
            const dateMatch = entry.match(/###\s(\d{2}\/\d{2}\/\d{2})/);
            if (!dateMatch) continue;
            const dateStr = dateMatch[1];
            const [day, month, year] = dateStr.split("/");
            const pubDate = new Date(Number(`20${year}`), Number(month) - 1, Number(day));
            const entryContent = intro.concat("\n", entry.replace(/###\s\d{2}\/\d{2}\/\d{2}\n?/, ""));
          logger.info(entryContent)
            const slug = `${repoName.toLowerCase()}-${year}-${month}-${day}`;

            store.set({
              id: slug,
              data: {
                slug: slug,
                collection: "blog",
                title: `${title}: ${repoName} (${dateStr})`,
                description: entryContent.trim().split("\n")[0].slice(0, 160),
                pubDate: pubDate,
              },
              rendered: await renderMarkdown(entryContent),
            });
          }
        }
      } catch (error) {
        logger.error("Error loading worklog files.");
      }
    }
  }
}


function projectLoader(): Loader {
  return {
    name: 'projects-loader',
    load: async ({ renderMarkdown, store, logger}) => {
      store.clear();
      const contentDir = "../content/project";

      try {
          const files = await fs.readdir(contentDir);
          const projectFiles = files.filter(file => file.endsWith('.md'));

          for (const file of projectFiles) {
              const filePath = path.join(contentDir, file);
              const content = await fs.readFile(filePath, 'utf-8');
              const repoName = file.replace(/-PROJECT\.md$/, '');

              const titleMatch = content.match(/^#\s*(.*)/);
              const title = titleMatch ? titleMatch[1] : repoName;
              const entryContent = content.replace(/^#\s*(.*)/, "");

              const description = content.split('\n\n')[1]?.slice(0, 160) || 'Project description.';

              const slug = repoName.toLowerCase();

              store.set({
                id: slug,
                data: {
                  slug: slug,
                  collection: 'projects',
                  title: title,
                  description: description,
                  pubDate: new Date(),
                },
                rendered: await renderMarkdown(entryContent),
              });
          }
      } catch (error) {
          logger.error("Error loading project files:");
      }
    }
  }
}


// --- COLLECTIONS ---
const blog = defineCollection({
  loader: worklogLoader(),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: projectLoader(),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog, projects };