import { useState } from "react";
import Arrow from "./Arrow";
import Spotlight from "./Spotlight";

/** Placeholder art for projects without a screenshot yet. */
function Placeholder({ name }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(80%_80%_at_20%_10%,var(--color-accent-soft),var(--color-paper))]">
      <div className="w-[68%] overflow-hidden rounded-md border border-line-strong bg-surface shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
          <span className="h-2 w-2 rounded-full bg-line-strong" />
        </div>
        <div className="px-4 py-6">
          <p className="font-display text-lg font-semibold tracking-tight">
            {name}
          </p>
          <div className="mt-3 space-y-1.5">
            <span className="block h-1.5 w-4/5 rounded bg-line" />
            <span className="block h-1.5 w-3/5 rounded bg-line" />
            <span className="block h-1.5 w-2/3 rounded bg-line" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Horizontal project entry: thumbnail on the left, copy and tech chips on
 * the right. Hovering lights the card, zooms the image, and reveals a
 * centred call-to-action.
 */
export default function ProjectRow({ project, index = 0 }) {
  const primary = project.links[0];
  const hasLink = Boolean(primary);
  const number = String(index + 1).padStart(2, "0");
  // Fall back to placeholder art if the screenshot file isn't there yet.
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;

  return (
    <Spotlight
      as="article"
      className="group -mx-5 overflow-hidden rounded-xl border border-transparent p-5 transition-[border-color,background-color] duration-300 hover:border-line-strong hover:bg-surface sm:-mx-6 sm:p-6"
    >
      {/* Faint index numeral, like a watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-2 font-display text-[150px] leading-none font-bold text-ink/[0.035] select-none transition-colors duration-300 group-hover:text-accent/[0.07]"
      >
        {number}
      </span>

      <div
        className={`grid gap-7 md:grid-cols-[minmax(0,340px)_1fr] md:gap-10 ${
          hasLink ? "transition-opacity duration-300 group-hover:opacity-40" : ""
        }`}
      >
        {/* Thumbnail: 4:3 on mobile, stretches to the text column on desktop */}
        <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-paper md:aspect-auto md:min-h-[260px] md:self-stretch">
          {showImage ? (
            <img
              src={project.image}
              alt={`${project.name} screenshot`}
              loading="lazy"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <Placeholder name={project.name} />
          )}
        </div>

        {/* Copy */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-2xl font-semibold">
              {hasLink ? (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-ink hover:text-accent"
                >
                  {project.name}
                  <Arrow size={14} />
                </a>
              ) : (
                project.name
              )}
            </h3>
            {!hasLink && (
              <span className="rounded border border-line-strong px-2 py-0.5 font-mono text-[10.5px] tracking-wider text-muted uppercase">
                In progress
              </span>
            )}
            <span className="font-mono text-[12px] text-muted">
              {project.period}
            </span>
          </div>

          <p className="mt-3 text-[17px] leading-relaxed text-muted text-pretty">
            {project.summary}
          </p>

          {project.award && (
            <p className="mt-4 font-mono text-[11px] tracking-wide text-accent uppercase">
              {project.award}
            </p>
          )}

          <ul className="mt-5 flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <li
                key={item}
                className="rounded-md border border-line bg-surface px-3 py-1.5 text-[13px] text-ink"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover call-to-action (mouse only; the title link covers touch) */}
      {hasLink && (
        <div className="pointer-events-none absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
          <a
            href={primary.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            className="pointer-events-auto inline-flex translate-y-1 items-center gap-3 rounded-md bg-accent px-7 py-3.5 font-mono text-[13px] font-medium tracking-[0.18em] text-white uppercase shadow-[0_16px_40px_-12px_rgba(226,88,31,0.6)] transition-transform duration-300 group-hover:translate-y-0 hover:-translate-y-0.5"
          >
            Visit project
            <Arrow size={14} />
          </a>
        </div>
      )}
    </Spotlight>
  );
}
