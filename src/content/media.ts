import generated from './media.generated.json';
import type { Screenshot } from './types';

/*
 * Logos and screenshots prepared by `npm run images`
 * (scripts/optimize-images.mjs), looked up by app slug.
 */
const media: { screenshots: Record<string, Screenshot[]>; logos: Record<string, string> } = generated;

/** All prepared screenshots for an app, in file-name order. Empty when there are none. */
export function screenshotsFor(slug: string): Screenshot[] {
  return media.screenshots[slug] ?? [];
}

/** The app's prepared logo, if there is one. */
export function logoFor(slug: string): string | undefined {
  return media.logos[slug];
}
