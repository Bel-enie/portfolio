export const profile = {
  name: "Eniola Akingbade",
  role: "Full-Stack Developer",
  location: "Lagos, Nigeria",
  headline: "I build AI products that ship.",
  tagline:
    "Third-year Computer Science student at Obafemi Awolowo University, working across React, Node.js and Python. Between semesters I've shipped a hackathon-winning clinical decision-support app and a live SaaS for freelancers, and placed top 10 nationally in PLC programming.",
  email: "akingbadeeniola2020@gmail.com",
  github: "https://github.com/Bel-enie",
  githubHandle: "Bel-enie",
  linkedin: "https://linkedin.com/in/eniola-akingbade-b39291416",
  linkedinHandle: "eniola-akingbade",
  // File in public/. Set to null to hide every "Download CV" link.
  cv: "/Eniola-Akingbade-CV.pdf",
};

// Everything in `underTheHood` is taken from the public repositories
// (README, SUBMISSION.md, package.json / requirements.txt and the source),
// so each line can be checked against the code it describes.
export const projects = [
  {
    slug: "twinstate",
    name: "Twinstate",
    period: "July 2026",
    summary:
      "An AI-powered healthcare application delivering clinical decision-support and digital twin infrastructure.",
    body: [
      "Twinstate lets you log the medicines, supplements and energy drinks you take, then explains in plain language what they are doing to your organs — checked against real clinical drug-interaction knowledge rather than a generic chatbot answer.",
      "It runs on the Ontomorph/HOLON platform: each substance is resolved to a real clinical concept, the full list is screened against HOLON's interaction knowledge, and AI reasoning turns the findings into organ-level risk, a body-stress index and a plain-language next step.",
      "Designed and built solo, full web app included, inside the one-week hackathon window — and it took first place.",
    ],
    highlights: [
      "Plain-language explanations of how each substance affects the body, with drug-interaction checks",
      "Interactive 3D twin of the body, a What-If coach that projects two futures, and ready-made demo profiles so judges could try it in seconds",
      "Clear safety framing: educational, not diagnostic, with a consent gate and emergency routing for urgent symptoms",
    ],
    underTheHood: [
      {
        label: "Service facade",
        text: "Every data call goes through one module that swaps between a fully offline mock layer and the live HOLON and OpenAI clients with an environment flag. The UI never imports an SDK, and the demo can never dead-end on a flaky network.",
      },
      {
        label: "Clinical grounding",
        text: "HOLON's concept search resolves each logged substance to a real clinical concept; its interaction check screens the whole list and returns severity, mechanism, clinical effect and management, which are mapped onto the organs they affect.",
      },
      {
        label: "3D twin without WebGL",
        text: "The anatomy model is pure CSS 3D transforms — a depth-extruded body with drag-to-rotate and organs that glow by risk level. No three.js, so nothing extra to load and nothing to break in a live demo.",
      },
      {
        label: "Safe AI chat",
        text: "A zero-dependency Node proxy keeps the OpenAI key server-side, builds the grounded prompt itself so a client cannot strip the safety rules, rate-limits per IP, caps request bodies, and applies a server-side red-flag list that routes urgent symptoms to real care.",
      },
      {
        label: "Deterministic fallback",
        text: "A rule-based interaction engine computes organ scores and a 0–100 body-stress index instantly and stands in whenever the AI is unavailable, so every screen always has numbers.",
      },
    ],
    role: "Solo — product design, front end, service layer, chat proxy",
    platform: "Ontomorph / HOLON",
    stack: [
      "React 18",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "@ontomorph/holon-client",
      "OpenAI API",
      "Node.js",
    ],
    // Drop the file into public/projects/ and it will show automatically.
    image: "/projects/twinstate.webp",
    award: "Winner — 2026 Ontomorph AI Hackathon",
    links: [
      { label: "twinstate.vercel.app", href: "https://twinstate.vercel.app" },
      { label: "Source on GitHub", href: "https://github.com/Bel-enie/twinstate" },
    ],
    featured: true,
  },
  {
    slug: "scopeshield",
    name: "ScopeShield",
    period: "August 2026",
    summary:
      "A Flask SaaS that catches scope creep for freelancers and agencies before it costs them money.",
    body: [
      "Freelancers lose money to \"small\" requests that were never in the agreement. ScopeShield compares each incoming client request against the agreed project scope and flags it In Scope, Ambiguous, or Out of Scope — so the awkward conversation happens early, with evidence.",
      "For anything out of scope it generates a ready-to-send change order and a client reply in the tone you choose, and a Revenue Protected dashboard adds up the work you would otherwise have given away. Verdicts can be overridden, on record, so it assists judgement rather than replacing it.",
      "Built solo for Builder Fest as a full Flask application — accounts, projects, analyses and the decision record live in a relational database, deployed on Vercel with PostgreSQL.",
    ],
    highlights: [
      "Three-way classification of every request against the agreed scope, with a confidence score and the supporting scope sentence attached",
      "One-click change orders with hours and fee, and client responses in a friendly, professional or firm tone",
      "Revenue Protected metric that turns avoided free work into a number clients understand",
    ],
    underTheHood: [
      {
        label: "Data model",
        text: "Three SQLAlchemy models — User, Project and ScopeAnalysis — with every analysis keeping its original verdict and any owner override side by side, so the decision record survives disagreements.",
      },
      {
        label: "Auth and safety",
        text: "Flask-Login sessions, Werkzeug password hashing, CSRF protection on every form, a 10 MB upload cap, and ownership checks on each project and analysis route so users only ever see their own records.",
      },
      {
        label: "Classifier by design",
        text: "The verdict comes from a transparent keyword-scoring baseline behind a single analyze_request() function that returns a classification, confidence, the supporting scope sentence and an hours/fee estimate — deliberately auditable, and swappable for a model-backed version without touching the rest of the app.",
      },
      {
        label: "Generated documents",
        text: "Client responses and change orders are produced from the analysis record through JSON endpoints, with hours, fee and approval status filled in from the project's hourly rate.",
      },
      {
        label: "Production shape",
        text: "SQLite locally and PostgreSQL in production via DATABASE_URL, NullPool with pre-ping for serverless connections, contract uploads to S3, a /health endpoint, and ProxyFix behind Vercel's proxy.",
      },
    ],
    role: "Solo — data model, auth, classification logic, UI",
    platform: "Flask on Vercel",
    stack: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "PostgreSQL",
      "Flask-Login",
      "Jinja2",
      "Amazon S3",
    ],
    image: "/projects/scopeshield.webp",
    links: [
      { label: "scopeshield-five.vercel.app", href: "https://scopeshield-five.vercel.app" },
      { label: "Source on GitHub", href: "https://github.com/Bel-enie/Scopeshield" },
    ],
    featured: true,
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "Python", "HTML", "CSS"] },
  { group: "Frontend", items: ["React", "React Router", "Tailwind CSS", "Vite"] },
  { group: "Backend", items: ["Node.js", "Flask", "SQLAlchemy", "PostgreSQL"] },
  {
    group: "Platforms & tooling",
    items: ["OpenAI API", "Ontomorph / HOLON", "Vercel", "Amazon S3", "Git"],
  },
  { group: "Automation", items: ["Siemens TIA Portal", "PLC programming"] },
];

export const achievements = [
  {
    year: "2026",
    title: "Winner — Ontomorph AI Hackathon",
    detail:
      "First place for Twinstate, an AI clinical decision-support app built on the Ontomorph/HOLON platform.",
  },
  {
    year: "2025",
    title: "Top 10 Nationwide — Naija Automation PLC Programming Competition",
    detail:
      "Placed in the national top ten, and picked up industrial automation with Siemens TIA Portal along the way.",
  },
];

export const education = {
  degree: "B.Sc. Computer Science & Technology",
  school: "Obafemi Awolowo University",
  place: "Nigeria",
  period: "2023 — present",
  note: "Third year",
};

// Home-page testimonials marquee. Quotes are real; `name` and `role` are
// still PLACEHOLDERS — fill them in before relying on this section. Set the
// array to [] to hide the section entirely.
export const testimonials = [
  {
    quote:
      "He's one of the people I message when I'm stuck, because he'll ask two questions and somehow the problem is smaller. Genuinely one of the most curious people I know.",
    name: "Viktor",
    role: "Placeholder Role",
  },
  {
    quote:
      "What sets Eniola apart is not just that he can build, but that he can articulate why he built it that way. That is the habit of a strong engineer.",
    name: "Placeholder Name",
    role: "Placeholder Role",
  },
  {
    quote:
      "He's the person you go to when something needs to actually get done rather than talked about.",
    name: "Placeholder Name",
    role: "Placeholder Role",
  },
];

export const availability = [
  { label: "Location", value: "Lagos, Nigeria" },
  { label: "Timezone", value: "WAT (UTC+1)" },
  { label: "Available for", value: "Internships, freelance, collaborations" },
];
