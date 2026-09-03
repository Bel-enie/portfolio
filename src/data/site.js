export const profile = {
  name: "Eniola Akingbade",
  role: "Software Developer",
  location: "Lagos, Nigeria",
  headline: "I build AI products that ship.",
  tagline:
    "Third-year Computer Science student at Obafemi Awolowo University. Between semesters I've shipped a hackathon-winning clinical decision-support app and a live SaaS for freelancers, and placed top 10 nationally in PLC programming.",
  email: "akingbadeeniola2020@gmail.com",
  github: "https://github.com/Bel-enie",
  githubHandle: "Bel-enie",
  linkedin: "https://linkedin.com/in/eniola-akingbade-b39291416",
  linkedinHandle: "eniola-akingbade",
};

export const projects = [
  {
    slug: "twinstate",
    name: "Twinstate",
    period: "July 2026",
    summary:
      "An AI-powered healthcare application delivering clinical decision-support and digital twin infrastructure.",
    body: [
      "Twinstate lets you log the medicines, supplements and energy drinks you take, then explains in plain language what they are doing to your organs — checked against real clinical drug-interaction knowledge rather than a generic chatbot answer.",
      "It runs on the Ontomorph/HOLON platform, pairing clinical decision-support with a digital twin of the individual, so the guidance is grounded in a model of that person rather than population averages.",
      "Designed and built solo, full web app included, inside the hackathon window — and it took first place.",
    ],
    highlights: [
      "Plain-language explanations of how each substance affects the body, with drug-interaction checks",
      "Interactive 3D twin of the body, plus ready-made demo profiles so judges could try it in seconds",
      "Clear safety framing: educational, not diagnostic, with an emergency-guidance gate on first use",
    ],
    role: "Solo — product design, web app, AI integration",
    platform: "Ontomorph / HOLON",
    stack: ["React", "Node.js", "Ontomorph / HOLON", "AI"],
    // Drop the file into public/projects/ and it will show automatically.
    image: "/projects/twinstate.webp",
    award: "Winner — 2026 Ontomorph AI Hackathon",
    links: [{ label: "twinstate.vercel.app", href: "https://twinstate.vercel.app" }],
    featured: true,
  },
  {
    slug: "scopeshield",
    name: "ScopeShield",
    period: "August 2026",
    summary:
      "A SaaS tool that catches scope creep for freelancers and agencies before it costs them money.",
    body: [
      "Freelancers lose money to \"small\" requests that were never in the agreement. ScopeShield compares each incoming client request against the agreed project scope and flags it In Scope, Ambiguous, or Out of Scope — so the awkward conversation happens early, with evidence.",
      "For anything out of scope it generates a ready-to-send change order, and a Revenue Protected dashboard adds up the work you would otherwise have given away. Verdicts can be overridden, on record, so it assists judgement rather than replacing it.",
      "Built solo on the Emergent platform for Builder Fest, from the scope model through to the dashboard.",
    ],
    highlights: [
      "Three-way classification of every request against the agreed scope, with a reason attached",
      "One-click change orders with hours and cost for out-of-scope work",
      "Revenue Protected metric that turns avoided free work into a number clients understand",
    ],
    role: "Solo — product, classification logic, dashboard",
    platform: "Emergent (Builder Fest)",
    stack: ["Emergent", "SaaS", "AI"],
    image: "/projects/scopeshield.webp",
    links: [
      { label: "scopeshield-five.vercel.app", href: "https://scopeshield-five.vercel.app" },
    ],
    featured: true,
  },
];

export const skills = [
  { group: "Languages", items: ["JavaScript", "Python", "HTML", "CSS"] },
  { group: "Frontend", items: ["React", "React Router", "Tailwind CSS", "Vite"] },
  { group: "Backend & AI", items: ["Node.js", "AI integration", "Ontomorph / HOLON"] },
  { group: "Tooling", items: ["Git", "GitHub", "Vercel", "Emergent"] },
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

export const availability = [
  { label: "Location", value: "Lagos, Nigeria" },
  { label: "Timezone", value: "WAT (UTC+1)" },
  { label: "Available for", value: "Internships, freelance, collaborations" },
];
