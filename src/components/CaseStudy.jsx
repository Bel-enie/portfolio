import { useState } from "react";
import Arrow from "./Arrow";
import Spotlight from "./Spotlight";

function Meta({ label, children, className = "" }) {
  return (
    <div className={className}>
      <dt className="font-mono text-[11px] tracking-wider text-muted uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-[14px] leading-snug text-ink">{children}</dd>
    </div>
  );
}

/**
 * Full project entry for the Projects page: screenshot, story, highlights,
 * and a compact case-study meta block (role, platform, stack, links).
 */
export default function CaseStudy({ project, index = 0 }) {
  const primary = project.links[0];
  const number = String(index + 1).padStart(2, "0");
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(project.image) && !imageFailed;

  const Thumb = (
    <div className="group/thumb aspect-[4/3] overflow-hidden rounded-lg border border-line bg-paper">
      {showImage ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading={index === 0 ? "eager" : "lazy"}
          onError={() => setImageFailed(true)}
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover/thumb:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full items-center justify-center font-display text-2xl font-semibold text-muted">
          {project.name}
        </div>
      )}
    </div>
  );

  return (
    <Spotlight
      as="article"
      id={project.slug}
      className="card-highlight overflow-hidden rounded-xl border border-line bg-surface p-5 sm:p-7 lg:p-8"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-5 right-4 font-display text-[110px] leading-none font-bold text-ink/[0.035] select-none"
      >
        {number}
      </span>

      <div className="grid gap-7 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-10">
        {/* Screenshot — sticks while the story scrolls on desktop */}
        <div className="self-start lg:sticky lg:top-24">
          {primary ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.name}`}
            >
              {Thumb}
            </a>
          ) : (
            Thumb
          )}
        </div>

        {/* Story */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              {primary ? (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-accent"
                >
                  {project.name}
                  <Arrow size={16} />
                </a>
              ) : (
                project.name
              )}
            </h2>
            <span className="font-mono text-[12px] text-muted">
              {project.period}
            </span>
          </div>

          {project.award && (
            <p className="mt-2 font-mono text-[11px] tracking-wide text-accent uppercase">
              {project.award}
            </p>
          )}

          <div className="mt-4 space-y-3 text-[15px] leading-[1.6] text-muted text-pretty">
            {project.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {project.highlights?.length > 0 && (
            <ul className="mt-5 space-y-2">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[14px] leading-snug text-ink">
                  <span className="mt-[9px] h-px w-3.5 shrink-0 bg-accent" aria-hidden="true" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Case-study meta: two compact rows */}
          <dl className="mt-6 grid gap-x-8 gap-y-5 border-t border-line pt-5 sm:grid-cols-2">
            <Meta label="Role">{project.role}</Meta>
            <Meta label="Platform">{project.platform}</Meta>
            <Meta label="Stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-paper px-2.5 py-1 text-[12.5px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Meta>
            {project.links.length > 0 && (
              <Meta label="Links">
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                      >
                        {link.label}
                        <Arrow />
                      </a>
                    </li>
                  ))}
                </ul>
              </Meta>
            )}
          </dl>
        </div>
      </div>
    </Spotlight>
  );
}
