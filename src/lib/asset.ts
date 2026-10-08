/** Resolves a file in `public/` against the site's base path (works on GitHub Pages subpaths). */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}
