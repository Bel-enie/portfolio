import { Link } from "react-router-dom";
import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";
import ProjectRow from "../components/ProjectRow";
import Reveal from "../components/Reveal";
import Spotlight from "../components/Spotlight";
import LocalTime from "../components/LocalTime";
import CvLink from "../components/CvLink";
import {
  profile,
  projects,
  skills,
  achievements,
  education,
} from "../data/site";

const featured = projects.filter((p) => p.featured);

/** Small editor-window card summarising what's happening right now. */
function NowCard() {
  const rows = [
    { key: "status", value: "Available for work", live: true },
    { key: "building", value: "AI products & full-stack apps" },
    { key: "studying", value: "Computer Science · OAU, year 3" },
    { key: "based_in", value: profile.location },
  ];

  return (
    <Spotlight className="card-highlight rounded-xl border border-line bg-surface/80 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e5686b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e8c15a]" />
        <span className="h-2.5 w-2.5 rounded-full bg-live" />
        <span className="ml-2 font-mono text-[12px] text-muted">
          eniola.now
        </span>
      </div>
      <dl className="space-y-3 px-5 py-5 font-mono text-[13px]">
        {rows.map((row) => (
          <div key={row.key} className="flex items-baseline gap-3">
            <dt className="w-[84px] shrink-0 text-muted">{row.key}</dt>
            <dd className="flex items-center gap-2 text-ink">
              {row.live && (
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-live" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
                </span>
              )}
              {row.value}
            </dd>
          </div>
        ))}
        <div className="flex items-baseline gap-3 border-t border-line pt-3">
          <dt className="w-[84px] shrink-0 text-muted">local_time</dt>
          <dd className="text-ink">
            <LocalTime /> WAT
          </dd>
        </div>
      </dl>
    </Spotlight>
  );
}

/** Splits the headline so the last word can carry the accent colour. */
function Headline({ text }) {
  const words = text.replace(/\.$/, "").split(" ");
  const last = words.pop();
  return (
    <>
      {words.join(" ")} <span className="text-accent">{last}.</span>
    </>
  );
}

export default function Home() {
  const stats = [
    ...achievements.map((a) => ({ label: a.year, value: a.title })),
    {
      label: education.period,
      value: `${education.degree} — ${education.school}`,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line">
        <Container className="py-20 sm:py-28 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <h1 className="max-w-3xl text-[2.75rem] leading-[1.02] font-semibold sm:text-6xl lg:text-7xl">
                  <Headline text={profile.headline} />
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-6 max-w-xl text-lg text-muted text-pretty sm:text-xl">
                  {profile.tagline}
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button to="/projects" arrow>
                    View projects
                  </Button>
                  <CvLink />
                </div>
              </Reveal>
            </div>

            <Reveal delay={320} className="lg:justify-self-end lg:w-full lg:max-w-sm">
              <NowCard />
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Credentials — hairline bento */}
      <section className="border-b border-line">
        <Container className="py-14 sm:py-16">
          <Reveal>
            <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
              {stats.map((item, i) => (
                <Spotlight
                  key={item.value}
                  className="bg-paper p-7 transition-colors duration-300 hover:bg-surface"
                >
                  <dt className="flex items-center justify-between font-mono text-[11px] text-muted">
                    <span>{item.label}</span>
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  </dt>
                  <dd className="mt-3 text-[15px] leading-snug font-medium text-pretty">
                    {item.value}
                  </dd>
                </Spotlight>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Featured work */}
      <section className="border-b border-line">
        <Container className="py-20 sm:py-24">
          <Reveal className="flex items-end justify-between gap-6">
            <div>
              <Label>Selected work</Label>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
                Things I have built
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden shrink-0 text-[15px] text-muted underline-offset-4 hover:text-accent hover:underline sm:block"
            >
              All projects →
            </Link>
          </Reveal>

          <div className="mt-12 space-y-12 sm:space-y-14">
            {featured.map((project, i) => (
              <Reveal key={project.slug} delay={i * 80}>
                <ProjectRow project={project} index={i} />
              </Reveal>
            ))}
          </div>

          <Link
            to="/projects"
            className="mt-8 inline-block text-[15px] text-muted underline-offset-4 hover:text-accent hover:underline sm:hidden"
          >
            All projects →
          </Link>
        </Container>
      </section>

      {/* Toolbox — hairline bento, last cell is the CTA */}
      <section>
        <Container className="pt-20 pb-16 sm:pt-24 sm:pb-20">
          <Reveal>
            <Label>Toolbox</Label>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              What I work with
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((group, i) => (
                <Spotlight
                  key={group.group}
                  className="bg-paper p-6 transition-colors duration-300 hover:bg-surface"
                >
                  <h3 className="flex items-center justify-between font-mono text-[11px] tracking-wider text-muted uppercase">
                    {group.group}
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-surface px-3 py-1 text-[14px]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Spotlight>
              ))}

              <Spotlight className="flex flex-col justify-between gap-6 bg-accent-soft p-6">
                <p className="text-[15px] text-ink text-pretty">
                  Open to internships, freelance work, and collaborations.
                </p>
                <Button to="/contact" arrow className="self-start">
                  Start a conversation
                </Button>
              </Spotlight>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
