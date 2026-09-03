import { useRef } from "react";

/**
 * Wraps a card and paints a soft accent glow that follows the cursor.
 * The glow sits between the card background and its content (`isolate`
 * + `-z-10`), so text stays crisp.
 */
export default function Spotlight({
  as: Tag = "div",
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  const onMouseMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--sx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--sy", `${event.clientY - rect.top}px`);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group/spot relative isolate ${className}`}
      {...rest}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--sx, 50%) var(--sy, 50%), color-mix(in oklab, var(--color-accent) 13%, transparent), transparent 65%)",
        }}
      />
      {children}
    </Tag>
  );
}
