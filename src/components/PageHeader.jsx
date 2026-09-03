import Container from "./Container";
import Label from "./Label";
import Reveal from "./Reveal";

export default function PageHeader({ label, title, intro }) {
  return (
    <header className="border-b border-line">
      <Container className="py-14 sm:py-20">
        <Reveal>
          <Label>{label}</Label>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 text-5xl leading-[1.05] font-semibold sm:text-6xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={160}>
            <p className="mt-5 max-w-2xl text-lg text-muted text-pretty">
              {intro}
            </p>
          </Reveal>
        )}
      </Container>
    </header>
  );
}
