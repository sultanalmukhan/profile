import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from https://sultanalmukhan.github.io/profile/, so every
// asset URL is prefixed with the repository name. Change this to '/' when the
// site moves to a custom domain or a username.github.io repository, and update
// the absolute URLs in index.html to match.
export default defineConfig({
  base: '/profile/',
  plugins: [react()],
});
