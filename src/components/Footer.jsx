import Container from "./Container";
import LocalTime from "./LocalTime";
import { profile } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col items-center gap-4 py-10 font-mono text-[13px] text-muted sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} — Built with{" "}
          <span className="text-accent" aria-label="love">
            ♥
          </span>{" "}
          and too much coffee.
        </p>

        <p className="inline-flex items-center gap-2 text-[12px]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping-soft rounded-full bg-live" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-live" />
          </span>
          Lagos · <LocalTime /> WAT
        </p>
      </Container>
    </footer>
  );
}
