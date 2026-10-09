#!/usr/bin/env node
/*
 * Creates web-ready copies of the app screenshots and logos.
 *
 * Reads the originals from Screenshots/<Folder>/ and Logos/ (never modifies
 * them), writes resized AVIF + JPEG copies to public/screenshots/<app>/ and
 * PNG logos to public/logos/, and records image sizes in
 * src/content/media.generated.json so the page can reserve space before
 * images load.
 *
 * Uses macOS `sips`, so it needs no npm packages. Run it after adding or
 * changing screenshots:  npm run images
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Source screenshot folder → app slug used in public/screenshots/<slug>/. */
const SCREENSHOT_FOLDERS = {
  Fergus: 'fergus',
  Tele2: 'mitt-tele2',
  Comviq: 'comviq',
  Darlean: 'darlean',
  Halyk: 'halyk',
  Intebix: 'intebix',
  Biteeu: 'biteeu',
  'BCC Business': 'bcc-business',
  StepsHero: 'stepshero',
  CapsLab: 'capslab',
};

/** Source logo file → app slug used in public/logos/<slug>.png. */
const LOGO_FILES = {
  'fergus_icon.png': 'fergus',
  'tele2_logo.png': 'mitt-tele2',
  'comviq_logo.png': 'comviq',
  'darlean_logo.png': 'darlean',
  'halyk_logo.png': 'halyk',
  'intebix_logo.png': 'intebix',
  'biteeu_logo.png': 'biteeu',
  'bcc_logo.png': 'bcc-business',
  'stepshero_logo.webp': 'stepshero',
  'capslab_logo.webp': 'capslab',
};

const THUMB_HEIGHT = 480; // shown at ~200–220px, so this covers 2x screens
const FULL_MAX_HEIGHT = 1600; // lightbox; smaller originals are never upscaled
const LOGO_SIZE = 144; // shown at 44–48px, so this covers 3x screens
const AVIF_QUALITY = '65';
const JPEG_QUALITY = '80';
const IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

const screenshotsDir = join(root, 'Screenshots');
const logosDir = join(root, 'Logos');
const publicShots = join(root, 'public', 'screenshots');
const publicLogos = join(root, 'public', 'logos');
const manifestPath = join(root, 'src', 'content', 'media.generated.json');

function sips(...args) {
  return execFileSync('sips', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
}

function size(file) {
  const out = sips('-g', 'pixelWidth', '-g', 'pixelHeight', file);
  return {
    width: Number(out.match(/pixelWidth: (\d+)/)[1]),
    height: Number(out.match(/pixelHeight: (\d+)/)[1]),
  };
}

/** Resizes `src` to `height` (never upscaling) and writes AVIF and JPEG next to `outBase`. */
function writeVariants(src, outBase, height, scratch) {
  const source = size(src);
  const target = Math.min(height, source.height);
  let input = src;
  if (target < source.height) {
    input = scratch;
    sips('--resampleHeight', String(target), src, '--out', scratch);
  }
  sips('-s', 'format', 'avif', '-s', 'formatOptions', AVIF_QUALITY, input, '--out', `${outBase}.avif`);
  sips('-s', 'format', 'jpeg', '-s', 'formatOptions', JPEG_QUALITY, input, '--out', `${outBase}.jpg`);
  return size(`${outBase}.jpg`);
}

/** Numeric-aware order, so 2.png comes before 10.png. */
const naturalOrder = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

function imagesIn(folder) {
  return readdirSync(folder)
    .filter((name) => !name.startsWith('.') && IMAGE_EXTENSIONS.has(extname(name).toLowerCase()))
    .sort(naturalOrder);
}

const manifest = { screenshots: {}, logos: {} };
const scratch = join(root, 'node_modules', '.cache', 'optimize-images');
mkdirSync(scratch, { recursive: true });

// Screenshots
for (const folder of readdirSync(screenshotsDir).sort(naturalOrder)) {
  const sourceFolder = join(screenshotsDir, folder);
  if (folder.startsWith('.') || !statSync(sourceFolder).isDirectory()) continue;
  if (folder.includes('_raw')) {
    console.log(`skip   Screenshots/${folder}/ (raw source, not published)`);
    continue;
  }
  const slug = SCREENSHOT_FOLDERS[folder];
  if (!slug) {
    console.warn(`WARN   Screenshots/${folder}/ is not mapped to an app; add it to SCREENSHOT_FOLDERS`);
    continue;
  }

  const outDir = join(publicShots, slug);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });

  const files = imagesIn(sourceFolder);
  manifest.screenshots[slug] = files.map((file, index) => {
    const name = String(index + 1).padStart(2, '0');
    const src = join(sourceFolder, file);
    const tmp = join(scratch, `${slug}-${name}.png`);
    const thumb = writeVariants(src, join(outDir, `${name}-thumb`), THUMB_HEIGHT, tmp);
    const full = writeVariants(src, join(outDir, `${name}-full`), FULL_MAX_HEIGHT, tmp);
    console.log(`shot   Screenshots/${folder}/${file} → screenshots/${slug}/${name} (${full.width}×${full.height})`);
    return {
      thumb: `screenshots/${slug}/${name}-thumb`,
      full: `screenshots/${slug}/${name}-full`,
      width: full.width,
      height: full.height,
      thumbWidth: thumb.width,
      thumbHeight: thumb.height,
    };
  });
}

// Logos
rmSync(publicLogos, { recursive: true, force: true });
mkdirSync(publicLogos, { recursive: true });
for (const [file, slug] of Object.entries(LOGO_FILES)) {
  const src = join(logosDir, file);
  if (!existsSync(src)) {
    console.warn(`WARN   Logos/${file} not found`);
    continue;
  }
  const out = join(publicLogos, `${slug}.png`);
  sips('-z', String(LOGO_SIZE), String(LOGO_SIZE), '-s', 'format', 'png', src, '--out', out);
  manifest.logos[slug] = `logos/${slug}.png`;
  console.log(`logo   Logos/${file} → logos/${slug}.png`);
}

rmSync(scratch, { recursive: true, force: true });
writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nWrote ${relative(root, manifestPath)}`);
