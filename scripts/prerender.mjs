// Pre-renders each route to static HTML after `vite build`, so crawlers that
// do not execute JavaScript still see the page content. Run by `npm run build`.
//
// Output (in dist/):
//   index.html, projects.html, about.html, contact.html  — pre-rendered
//   app.html                                              — empty SPA shell
// vercel.json maps clean URLs onto these files.

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIST = path.join(ROOT, "dist");
const SSR_OUT = path.join(ROOT, "node_modules", ".cache", "ssr");

// Change this when the site moves to a custom domain (also in index.html).
const SITE = "https://portfolio-gules-kappa-ojq9t9knsb.vercel.app";

const pages = [
  {
    route: "/",
    file: "index.html",
    title: "Eniola Akingbade — Full-Stack Developer · React, Node.js, AI",
    description:
      "Eniola Akingbade builds AI products that ship — winner of the 2026 Ontomorph AI Hackathon, Computer Science student at Obafemi Awolowo University, based in Lagos.",
  },
  {
    route: "/projects",
    file: "projects.html",
    title: "Projects — Eniola Akingbade",
    description:
      "Twinstate, winner of the 2026 Ontomorph AI Hackathon, and ScopeShield, an AI scope-creep detector for freelancers and agencies. Two products shipped in 2026, both live.",
  },
  {
    route: "/about",
    file: "about.html",
    title: "About — Eniola Akingbade",
    description:
      "Third-year Computer Science student at Obafemi Awolowo University building full-stack web apps and AI tools. Education, skills and achievements.",
  },
  {
    route: "/contact",
    file: "contact.html",
    title: "Contact — Eniola Akingbade",
    description:
      "Get in touch about internships, freelance work and collaborations. Email, LinkedIn, GitHub and a contact form.",
  },
];

const template = readFileSync(path.join(DIST, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("dist/index.html has no empty #root — was vite build run first?");
}

// 1. Build the server bundle (outside dist so it is never deployed).
execSync(
  `npx vite build --ssr src/entry-server.jsx --outDir "${SSR_OUT}" --emptyOutDir --logLevel warn`,
  { cwd: ROOT, stdio: "inherit" },
);
const entry = path.join(SSR_OUT, "entry-server.js");
if (!existsSync(entry)) throw new Error(`SSR bundle missing at ${entry}`);
const { render } = await import(pathToFileURL(entry).href);

// 2. Helpers to swap per-page metadata in the template.
const setTitle = (html, title) =>
  html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(property="og:title"\s+content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(name="twitter:title"\s+content=")[^"]*(")/, `$1${title}$2`);

const setDescription = (html, text) =>
  html
    .replace(/(name="description"\s+content=")[^"]*(")/, `$1${text}$2`)
    .replace(/(property="og:description"\s+content=")[^"]*(")/, `$1${text}$2`)
    .replace(/(name="twitter:description"\s+content=")[^"]*(")/, `$1${text}$2`);

const setUrl = (html, url) =>
  html
    .replace(/(rel="canonical"\s+href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(property="og:url"\s+content=")[^"]*(")/, `$1${url}$2`);

// 3. Write one file per route, plus the empty shell.
for (const page of pages) {
  const url = page.route === "/" ? `${SITE}/` : `${SITE}${page.route}`;
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${render(page.route)}</div>`,
  );
  html = setTitle(html, page.title);
  html = setDescription(html, page.description);
  html = setUrl(html, url);
  writeFileSync(path.join(DIST, page.file), html);
  console.log(`prerendered ${page.route.padEnd(10)} -> dist/${page.file}`);
}

// 4. A real 404 page: pre-rendered like the others, but noindex and with
// no canonical/og:url, so unknown URLs never look like the home page.
let notFound = template.replace(
  '<div id="root"></div>',
  `<div id="root">${render("/404")}</div>`,
);
notFound = setTitle(notFound, "Page not found — Eniola Akingbade");
notFound = setDescription(
  notFound,
  "That link does not lead anywhere. Browse the projects instead.",
);
notFound = notFound
  .replace(/\s*<link rel="canonical"[^>]*>/, "")
  .replace(/\s*<meta property="og:url"[^>]*>/, "")
  .replace("</title>", '</title>\n    <meta name="robots" content="noindex" />');
writeFileSync(path.join(DIST, "404.html"), notFound);
console.log("prerendered 404       -> dist/404.html");
