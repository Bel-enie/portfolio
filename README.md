# Eniola Akingbade — Portfolio

Personal portfolio built with React, Vite, Tailwind CSS v4, and React Router.

## Run locally

```bash
npm install
npm run dev
```

The dev server prints a local URL (default http://localhost:5173).

## Other commands

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Structure

```
src/
  data/site.js        all content: profile, projects, skills, achievements
  components/         Header, Footer, Layout, ProjectRow, CaseStudy, Spotlight...
  pages/              Home, Projects, About, Contact, NotFound
  index.css           Tailwind import + design tokens (colors, fonts)
```

Edit `src/data/site.js` to change content — pages read from it, so nothing else
needs touching for copy or new projects.

Colors and fonts live in the `@theme` block at the top of `src/index.css`.

## Project screenshots

Each project shows placeholder art until it has an image. Drop a screenshot
(4:3 works best, e.g. 1200x900) into `public/projects/` and set the project's
`image` field in `src/data/site.js`, e.g. `image: "/projects/twinstate.webp"`.

## Contact form

Submissions go through [Web3Forms](https://web3forms.com) straight to your inbox.

1. Enter your email at web3forms.com; they send you an access key.
2. Copy `.env.example` to `.env` and paste the key after `VITE_WEB3FORMS_KEY=`.
3. Restart `npm run dev`.

On Vercel, add the same `VITE_WEB3FORMS_KEY` under Project Settings ->
Environment Variables, then redeploy.

Without a key the form still works: it validates, then hands the message to
the visitor's email client via a pre-filled `mailto:` link.

## Site URL, link previews and SEO

`index.html` carries the Open Graph / Twitter tags, canonical URL and a JSON-LD
`Person` record. They point at a placeholder domain: search the file for
`eniola-akingbade.vercel.app` and replace every occurrence with your real
Vercel URL (or custom domain) after the first deploy, then redeploy.

The share image is `public/og.png` (1200x630). Regenerate it with the
`scripts/og.py` script (needs `pip install pillow`) if the headline changes, or replace it with any 1200x630 PNG.

## Deploy to Vercel

Push the repo to GitHub, then import it at vercel.com. Vercel detects Vite
automatically:

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` already rewrites all routes to `index.html` so deep links like
`/projects` work on refresh.
