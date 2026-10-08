import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site is served from the root of https://sultanalmukhan.com/. If it ever
// moves under a subpath (e.g. username.github.io/repository/), set `base` to
// that path and update the absolute URLs in index.html to match.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
