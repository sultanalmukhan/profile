# Sultan Almukhan · Portfolio

A single-page portfolio built with React, TypeScript and Vite, published at https://sultanalmukhan.com/.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

To check the production build:

```bash
npm run build
npm run preview
```

Open http://localhost:4173.

## Updating content

All text, links and media are in [`src/content/portfolio.ts`](src/content/portfolio.ts). The components only read from it, so you don't need to touch them to update the site.

- **Projects:** each entry under `projects` has a name, a subtitle (company or App Store category), a description, a logo, screenshots and an App Store action. The order in the file is the order on the page.
- **Stack line:** `stack: { label, items }` lists only technologies a source attributes to that app. Leave it out when none do.
- **Solo badge:** `solo: true` shows the "Solo iOS Developer" badge. Its text is in `soloBadge`.
- **App Store button:** `{ kind: 'link', href, ariaLabel }` opens a listing. `{ kind: 'notice', title, message }` opens an informational dialog instead (used for Fergus).
- **Experience:** dates are `start` and `end` months as `'YYYY-MM'` (leave out `end` for the current role). The page shows them as "Aug 2023 – Sep 2025" and calculates the duration. Every achievement in `achievements` is shown. `apps` links to project cards by their `id`.
- **CV and photo:** replace `public/Sultan_Almukhan_iOS_Developer.pdf` or `public/sultan-almukhan.jpg`, or point `cv.file` and `profile.photo` at new files in `public/`.

### Logos and screenshots

The originals live in `Logos/` and `Screenshots/<App>/` and are never changed or deployed. Folders with `_raw` in their name are source material and are skipped. The site uses web copies made by:

```bash
npm run images
```

This runs `scripts/optimize-images.mjs` (macOS only, it uses the built-in `sips` tool). It writes:

- screenshots to `public/screenshots/<app>/` as AVIF with a JPEG fallback: a small copy for the card gallery and a large one (up to 1600 px tall) for the lightbox;
- logos to `public/logos/<app>.png` at 144 × 144;
- their sizes to `src/content/media.generated.json`, which `portfolio.ts` reads through `screenshotsFor('<app>')` and `logoFor('<app>')`.

Screenshots are shown in file-name order (`1.png`, `2.png`, … `10.png`). To add an app or a folder, map it in `SCREENSHOT_FOLDERS` or `LOGO_FILES` at the top of the script, run `npm run images`, and use the same slug in `portfolio.ts`. A project with no screenshots shows no gallery; one without a logo shows its title alone.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`. It can also be started by hand from the **Actions** tab (**Deploy to GitHub Pages › Run workflow**). GitHub Pages must be enabled with **Settings › Pages › Source** set to **GitHub Actions**.

The site is served from the custom domain https://sultanalmukhan.com/, set under **Settings › Pages › Custom domain** with DNS at Porkbun. Because it lives at the domain root, `base` in `vite.config.ts` is `'/'`, and the canonical link and Open Graph tags in `index.html` use `https://sultanalmukhan.com/`. With an Actions-based deployment the domain comes from the Pages settings, so no `CNAME` file is needed in the build.
