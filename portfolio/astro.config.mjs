// @ts-check
import { defineConfig, envField } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://enzoreyes.dev",
  integrations: [mdx(), sitemap(), tailwind()],
  env: {
    schema: {
      PUBLIC_POSTHOG_TOKEN: envField.string({
        context: "client",
        access: "public",
      }),
      PUBLIC_POSTHOG_API_HOST: envField.string({
        context: "client",
        access: "public",
        default: "https://eu.i.posthog.com",
      }),
    },
  },
  markdown: {
    shikiConfig: {
      theme: "github-dark-high-contrast",
    },
  },
  server: {
    host: true,
    port: 4321,
  },
});
