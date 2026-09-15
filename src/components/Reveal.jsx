import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children into view the first time they scroll into
 * the viewport. Renders immediately for users who prefer reduced motion.
 */
export default function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}) {
  const ref = useRef(null);
  // Reduced-motion users get the content immediately, no observer needed.
  const [shown, setShown] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  // Visible is the default so the pre-rendered HTML is readable with no
  // JavaScript. The hidden start state is scoped to `html.js` in index.css,
  // so only browsers that will actually run the observer ever hide content.
  return (
    <Tag
      ref={ref}
      data-reveal={shown ? "shown" : "hidden"}
      style={{ transitionDelay: `${delay}ms` }}
      className={`translate-y-0 opacity-100 transition-[opacity,transform] duration-700 ease-out ${className}`}
    >
      {children}
    </Tag>
  );
}
