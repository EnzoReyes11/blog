import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import fs from "fs/promises";
import path from "path";

async function worklogLoader() {
  const contentDir = "../content/worklog";
  const entries: Record<string, any> = {};
  try {
    const files = await fs.readdir(contentDir);
    const worklogFiles = files.filter((file) => file.endsWith(".md"));
    for (const file of worklogFiles) {
      const filePath = path.join(contentDir, file);
      const content = await fs.readFile(filePath, "utf-8");
      const repoName = file.replace(/-WORKLOG\.md$/, "");
      const headerMatch = content.match(/^(.*?)(?=###\s\d{2}\/\d{2}\/\d{2})/s);
      const header = headerMatch ? headerMatch[1].trim() : "";
      const dateEntries = content.split(/(?=###\s\d{2}\/\d{2}\/\d{2})/).slice(1);

      for (const entry of dateEntries) {
        const dateMatch = entry.match(/###\s(\d{2}\/\d{2}\/\d{2})/);
        if (!dateMatch) continue;
        const dateStr = dateMatch[1];
        const [day, month, year] = dateStr.split("/");
        const pubDate = new Date(Number(`20${year}`), Number(month) - 1, Number(day));
        const entryContent = entry.replace(/###\s\d{2}\/\d{2}\/\d{2}\n?/, "");
        const slug = `${repoName.toLowerCase()}-${year}-${month}-${day}`;
        entries[slug] = {
          id: slug,
          slug: slug,
          body: header + "\n" + entryContent,
          collection: "blog",
          title: `Worklog: ${repoName} (${dateStr})`,
          description: entryContent.trim().split("\n")[0].slice(0, 160),
          pubDate: pubDate,
        };
      }
    }
  } catch (error) {
    console.error("Error loading worklog files:", error);
    return {};
  }
  return entries;
}


async function projectLoader() {
    const contentDir = "../content/project";
    const entries: Record<string, any> = {};

    try {
        const files = await fs.readdir(contentDir);
        const projectFiles = files.filter(file => file.endsWith('.md'));

        for (const file of projectFiles) {
            const filePath = path.join(contentDir, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const repoName = file.replace(/-PROJECT\.md$/, '');

            const titleMatch = content.match(/^#\s*(.*)/);
            const title = titleMatch ? titleMatch[1] : repoName;

            const description = content.split('\n\n')[1]?.slice(0, 160) || 'Project description.';
            
            const slug = repoName.toLowerCase();

            entries[slug] = {
                id: slug,
                slug: slug,
                body: content,
                collection: 'projects',
                title: title,
                description: description,
                pubDate: new Date(),
            };
        }
    } catch (error) {
        console.error("Error loading project files:", error);
        return {};
    }
    return entries;
}


// --- COLLECTIONS ---
const blog = defineCollection({
  loader: worklogLoader,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: projectLoader,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog, projects };