/** @type {import('tailwindcss').Config} */

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      backgroundImage: {
        'homepage-background': "url('https://images.ctfassets.net/yreyglvi5sud/64PZ1CGCbQSrDxD1BAJGCc/1c0521403e0737819c175182296d4221/background.jpg?w=1576')",
      },
    }
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};

