import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        vivid: {
          black: '#0a0a0a',
          gray: '#171717',
          accent: '#f5f5f5'
        }
      }
    }
  },
  plugins: []
};

export default config;
