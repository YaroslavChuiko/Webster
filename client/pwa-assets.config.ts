import { defineConfig, minimalPreset as preset } from '@vite-pwa/assets-generator/config';

export default defineConfig({
  preset,
  images: ['public/favicon.svg', 'public-dev/favicon.svg'],
});
