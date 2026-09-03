import { Link } from "react-router-dom";

const base =
  "group/btn inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[15px] font-medium transition-[background-color,border-color,color,transform] duration-200 active:translate-y-px";

const variants = {
  primary:
    "bg-accent text-white shadow-[0_10px_30px_-12px_rgba(226,88,31,0.7)] hover:bg-accent-hover",
  outline:
    "border border-line-strong text-ink hover:border-muted hover:bg-surface",
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
  to,
  href,
  variant = "primary",
  arrow = false,
  className = "",
  children,
  ...rest
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <TrailingArrow />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={cls} {...rest}>
      {content}
    </button>
  );
}
