import { Link } from "react-router-dom";
import Container from "../components/Container";
import Label from "../components/Label";
import Button from "../components/Button";
import ProjectRow from "../components/ProjectRow";
import Reveal from "../components/Reveal";
import Spotlight from "../components/Spotlight";
import SocialLinks from "../components/SocialLinks";
import CvLink from "../components/CvLink";
import Testimonials from "../components/Testimonials";
import {
  profile,
  projects,
  skills,
  achievements,
  education,
} from "../data/site";

const featured = projects.filter((p) => p.featured);

/** Key phrase in the bio: soft accent chip, like a highlighter pass. */
function Hl({ children }) {
  return (
    <span className="rounded-[4px] bg-accent-soft px-1 py-0.5 font-medium text-ink">
      {children}
    </span>
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
      {/* Hero — identity on the left, the story on the right */}
      <section className="border-b border-line">
        <Container className="py-20 sm:py-28 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-20">
            <div className="flex flex-col lg:min-h-[28rem]">
              <Reveal>
                <h1 className="text-[2.75rem] leading-[1.02] font-semibold tracking-tight sm:text-6xl lg:text-[4.25rem]">
                  {profile.name}
                </h1>
                <p className="mt-4 font-mono text-[12px] tracking-[0.28em] text-accent uppercase">
                  {profile.role}
                </p>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-7 text-lg text-muted">{profile.headline}</p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Button to="/projects" arrow>
                    View projects
                  </Button>
                  <CvLink />
                </div>
              </Reveal>

              <Reveal delay={320} className="mt-12 lg:mt-auto lg:pt-12">
                <SocialLinks size={22} />
              </Reveal>
            </div>

            <Reveal
              delay={200}
              className="space-y-5 text-[17px] leading-relaxed text-muted text-pretty sm:text-lg"
            >
              <p>
                I'm a full-stack developer who builds AI products that actually
                ship — not prototypes. Between semesters I've built a{" "}
                <Hl>hackathon-winning</Hl> clinical decision-support app on a
                digital-twin platform, launched a{" "}
                <Hl>live SaaS for freelancers</Hl> that flags scope creep
                before it costs them, and placed{" "}
                <Hl>top 10 nationally</Hl> in PLC programming.
              </p>
              <p>
                My stack is <Hl>JavaScript</Hl>, <Hl>React</Hl>,{" "}
                <Hl>Node.js</Hl> and <Hl>Python</Hl>. On the more
                unconventional side, I also work with Siemens TIA Portal for
                industrial automation and PLC programming — so I'm as
                comfortable with a ladder diagram as with a REST API.
              </p>
              <p>
                I'm a third-year Computer Science and Technology student at{" "}
                <Hl>Obafemi Awolowo University</Hl>, where I also serve as
                Class Representative. Outside of code, I'm usually building a
                side project or figuring out how to make something that
                already works, work better.
              </p>
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

      {/* Testimonials — content in src/data/site.js (placeholders for now) */}
      <section className="border-b border-line">
        <Container className="py-20 sm:py-24">
          <Reveal>
            <Label>Testimonials</Label>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              What people say
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <Testimonials />
          </Reveal>
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
