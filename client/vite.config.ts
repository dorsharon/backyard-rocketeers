import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for GitHub Pages - uses repo name from env or defaults to '/'
  base: process.env.GITHUB_ACTIONS ? '/backyard-rocketeers/' : '/',
});
