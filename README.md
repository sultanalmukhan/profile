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

- **Projects:** each entry under `projects` has a name, a subtitle (company or App Store category), a description, an optional stack line, screenshots and an App Store action. The order in the file is the order on the page.
- **App Store button:** `{ kind: 'link', href, ariaLabel }` opens a listing. `{ kind: 'notice', title, message }` opens an informational dialog instead (used for Fergus).
- **Experience:** every achievement in `achievements` is shown. `apps` links to project cards by their `id`.
- **CV and photo:** replace `public/Sultan_Almukhan_iOS_Developer.pdf` or `public/sultan-almukhan.jpg`, or point `cv.file` and `profile.photo` at new files in `public/`.

### Adding screenshots

1. Put the images in `public/screenshots/<app>/`, for example `public/screenshots/mitt-tele2/01.webp`. Use portrait iPhone screenshots (1290 × 2796 is the frame shape). WebP or AVIF keeps them small.
2. List them in that project's `screenshots` array:

   ```ts
   screenshots: [
     { src: 'screenshots/mitt-tele2/01.webp', alt: 'Mitt Tele2 home screen with remaining data' },
     { src: 'screenshots/mitt-tele2/02.webp', alt: 'Mitt Tele2 invoice list' },
   ],
   ```

The gallery appears as soon as a project has one screenshot. The counter and previous/next buttons appear once there are more screenshots than fit in one view. A project with no screenshots shows no gallery.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`. It can also be started by hand from the **Actions** tab (**Deploy to GitHub Pages › Run workflow**). GitHub Pages must be enabled with **Settings › Pages › Source** set to **GitHub Actions**.

The site is served from the custom domain https://sultanalmukhan.com/, set under **Settings › Pages › Custom domain** with DNS at Porkbun. Because it lives at the domain root, `base` in `vite.config.ts` is `'/'`, and the canonical link and Open Graph tags in `index.html` use `https://sultanalmukhan.com/`. With an Actions-based deployment the domain comes from the Pages settings, so no `CNAME` file is needed in the build.
