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

## CV

The "Download CV" links serve `public/Eniola-Akingbade-CV.pdf`. To update it,
overwrite that file (keep the name) and push. To hide the links, set
`cv: null` in `src/data/site.js`.

## Pre-rendering (SEO)

`npm run build` runs `vite build` and then `scripts/prerender.mjs`, which renders
each route to static HTML (`dist/index.html`, `projects.html`, `about.html`,
`contact.html`) with per-page titles and descriptions, plus `dist/app.html` as an
empty shell for unknown URLs. `vercel.json` maps the clean URLs onto those files
and the client hydrates the markup instead of re-rendering it. Crawlers that do
not run JavaScript therefore see the full page text.

If you add a route, add it to `pages` in `scripts/prerender.mjs` and to the
rewrites in `vercel.json`.

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
`Person` record. They point at the live site:
https://portfolio-gules-kappa-ojq9t9knsb.vercel.app/. If you later add a
custom domain, search `index.html`, `scripts/prerender.mjs`, `public/sitemap.xml`
and `public/robots.txt` for that URL, replace every occurrence, then redeploy.

The share image is `public/og.png` (1200x630). Regenerate it with the
`scripts/og.py` script (needs `pip install pillow`) if the headline changes, or replace it with any 1200x630 PNG.

## Deploy to Vercel

Push the repo to GitHub, then import it at vercel.com. Vercel detects Vite
automatically:

- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` maps `/projects`, `/about` and `/contact` to their pre-rendered
files and everything else to `app.html`, so deep links like
`/projects` work on refresh.
