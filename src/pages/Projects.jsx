import Container from "../components/Container";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Arrow from "../components/Arrow";
import CaseStudy from "../components/CaseStudy";
import Reveal from "../components/Reveal";
import { profile, projects } from "../data/site";

export default function Projects() {
  return (
    <>
      <PageHeader
        label="Projects"
        title="Selected work"
        intro="Two products shipped in 2026 — one that won a national hackathon, one built to solve a problem I kept hearing freelancers complain about. Both are live."
      />

      <Container className="pt-14 pb-16 sm:pt-16 sm:pb-20">
        <div className="space-y-10 sm:space-y-12">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 80}>
              <CaseStudy project={project} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col gap-5 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">More on GitHub</h2>
            <p className="mt-2 max-w-xl text-muted text-pretty">
              Smaller experiments, coursework, and works in progress live in my
              repositories.
            </p>
          </div>
          <Button
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            variant="outline"
            className="shrink-0 self-start sm:self-auto"
          >
            Browse GitHub
            <Arrow />
          </Button>
        </Reveal>
      </Container>
    </>
  );
}
