import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    preview: {
      allowedHosts: ['camera.pku.edu.cn'],
    },
    server: {
      hmr: {
        overlay: false,
      },
    },
  },
  devToolbar: {
    enabled: false
  }
});
