import { testimonials } from "../data/site";

function Card({ item }) {
  return (
    <figure className="card-highlight flex h-full w-[300px] shrink-0 flex-col justify-between rounded-xl border border-line bg-surface p-6 sm:w-[340px]">
      <blockquote className="text-[15px] leading-relaxed text-ink text-pretty">
        <span aria-hidden="true" className="mr-1 font-display text-2xl leading-none text-accent">
          “
        </span>
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 border-t border-line pt-4">
        <p className="text-[14px] font-medium text-ink">{item.name}</p>
        <p className="mt-0.5 font-mono text-[11px] text-muted">{item.role}</p>
      </figcaption>
    </figure>
  );
}

/**
 * Auto-scrolling marquee of quotes. The list is rendered twice and the
 * track slides by exactly one copy, so the loop is seamless. Hovering or
 * focusing pauses it; reduced-motion users get a static, scrollable row.
 * Content lives in `testimonials` in src/data/site.js.
 */
export default function Testimonials() {
  if (!testimonials.length) return null;

  // ~7.5 s per card keeps the pace readable however many entries there are.
  const duration = `${Math.max(24, testimonials.length * 7.5)}s`;

  return (
    <div
      className="group/marquee relative -mx-5 overflow-hidden sm:-mx-6 motion-safe:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      style={{ "--marquee-duration": duration }}
    >
      <div className="flex w-max gap-5 px-5 motion-safe:animate-marquee motion-reduce:w-auto motion-reduce:overflow-x-auto motion-reduce:pb-2 group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused] sm:px-6">
        <ul className="flex shrink-0 gap-5">
          {testimonials.map((item, i) => (
            <li key={i} className="flex">
              <Card item={item} />
            </li>
          ))}
        </ul>
        {/* Second copy purely for the seamless loop; hidden from readers. */}
        <ul aria-hidden="true" className="flex shrink-0 gap-5 motion-reduce:hidden">
          {testimonials.map((item, i) => (
            <li key={i} className="flex">
              <Card item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
