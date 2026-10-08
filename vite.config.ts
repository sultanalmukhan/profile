import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// A relative base lets the same build work on a GitHub Pages user site
// (username.github.io) and on a project site (username.github.io/repo/).
export default defineConfig({
  base: './',
  plugins: [react()],
});
