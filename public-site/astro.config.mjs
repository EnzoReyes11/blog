import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://www.enzoreyes.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      PUBLIC_POSTHOG_TOKEN: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_POSTHOG_API_HOST: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://eu.i.posthog.com',
      }),
      FACEBOOK_DOMAIN_VERIFICATION: envField.string({
        context: "server",
        access: "public"
      })
    },
  },
});
