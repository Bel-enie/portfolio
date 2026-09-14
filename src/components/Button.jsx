import SpecularButton from "./SpecularButton";

/**
 * Site-wide button. Every button routes through SpecularButton so they all
 * share the pointer-tracking rim light; this file only maps the two site
 * variants onto its colour props.
 */
const variants = {
  primary: {
    // A step darker than the text accent so white labels pass WCAG AA
    // (4.8:1); the rim light supplies the brightness on hover.
    tint: "#c2410c",
    tintOpacity: 1,
    textColor: "#ffffff",
    lineColor: "#ffe4d4",
    baseColor: "#7e2e0b",
    intensity: 1.15,
  },
  outline: {
    tint: "#1c1c1c", // surface
    tintOpacity: 0.9,
    textColor: "#ece9e2",
    lineColor: "#ffffff",
    baseColor: "#8a8a8a",
    intensity: 0.95,
  },
};

/** Trailing arrow that nudges right on hover. */
const TrailingArrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    aria-hidden="true"
    className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
  >
    <path
      d="M2.5 7h9m0 0L7.75 3.25M11.5 7l-3.75 3.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Button({
  variant = "primary",
  arrow = false,
  pill = false,
  className = "",
  children,
  ...rest
}) {
  return (
    <SpecularButton
      {...variants[variant]}
      radius={pill ? 999 : 10}
      className={`group/btn ${className}`}
      {...rest}
    >
      {children}
      {arrow && <TrailingArrow />}
    </SpecularButton>
  );
}
