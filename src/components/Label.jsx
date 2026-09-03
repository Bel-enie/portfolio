/** Small monospace kicker used above section headings. */
export default function Label({ children, className = "" }) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.2em] text-accent ${className}`}
    >
      {children}
    </p>
  );
}
