import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import Label from "../components/Label";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import CvLink from "../components/CvLink";
import { education, skills, achievements } from "../data/site";

export default function About() {
  return (
    <>
      <PageHeader
        label="About"
        title="A little more context"
        intro="Who I am, what I work with, and what I've done so far."
      />

      <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
        <div className="grid gap-12 md:grid-cols-[1fr_300px] md:gap-16">
          <Reveal className="max-w-2xl space-y-4 text-lg text-pretty">
            <p>
              Hi, I'm Eniola Akingbade — most people call me Beloved. I'm a
              Computer Science and Technology student at Obafemi Awolowo
              University with a genuine love for building things that work:
              cleanly, reliably, and without the drama. Whether it's a web app,
              an automation system, or a scrappy hackathon project built in a
              few days, I care about getting the details right.
            </p>
            <p>
              My stack is JavaScript, React, Node.js and Python. On the more
              unconventional side, I also work with Siemens TIA Portal for
              industrial automation and PLC programming.
            </p>
            <p>
              Outside of code, I serve as Class Representative at OAU, which has
              sharpened my communication and coordination skills just as much
              as any project has.
            </p>
          </Reveal>

          {/* Education card */}
          <Reveal
            as="aside"
            delay={120}
            className="card-highlight h-fit rounded-xl border border-line bg-surface p-6"
          >
            <Label>Education</Label>
            <h2 className="mt-4 text-lg leading-snug font-semibold">
              {education.degree}
            </h2>
            <p className="mt-2 text-[15px]">{education.school}</p>
            <p className="mt-1 text-[15px] text-muted">{education.place}</p>

            <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-5 font-mono text-[12px]">
              <div>
                <dt className="text-muted">Period</dt>
                <dd className="mt-0.5 text-ink">{education.period}</dd>
              </div>
              <div>
                <dt className="text-muted">Status</dt>
                <dd className="mt-0.5 text-ink">{education.note}</dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Skills */}
        <Reveal as="section" className="mt-16 border-t border-line pt-12">
          <Label>Skills</Label>
          <h2 className="mt-4 text-2xl font-semibold">What I work with</h2>

          <dl className="mt-6 divide-y divide-line">
            {skills.map((group) => (
              <div
                key={group.group}
                className="grid gap-1.5 py-3.5 sm:grid-cols-[140px_1fr] sm:items-center sm:gap-6"
              >
                <dt className="font-mono text-[11px] tracking-wider text-muted uppercase">
                  {group.group}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-line bg-surface px-3 py-1 text-[14px]"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Achievements */}
        <Reveal as="section" className="mt-16 border-t border-line pt-12">
          <Label>Achievements</Label>
          <h2 className="mt-4 text-2xl font-semibold">Highlights so far</h2>

          <ol className="mt-8 space-y-7">
            {achievements.map((item) => (
              <li
                key={item.title}
                className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[12px] text-accent sm:pt-1">
                  {item.year}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-pretty">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-muted text-pretty">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Closing CTA — its own boxed section */}
        <Reveal className="card-highlight mt-20 rounded-xl border border-line bg-surface p-7 sm:p-9">
          <Label>Next step</Label>
          <h2 className="mt-4 text-2xl font-semibold">
            Working on something similar?
          </h2>
          <p className="mt-3 max-w-xl text-muted text-pretty">
            If any of this lines up with something you are building, I would
            like to hear about it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/contact">Get in touch</Button>
            <CvLink />
          </div>
        </Reveal>
      </Container>
    </>
  );
}
