import Button from "./Button";
import { profile } from "../data/site";

/** Small down-arrow-into-tray icon. */
function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover/btn:translate-y-0.5 group-hover/cv:translate-y-0.5"
    >
      <path
        d="M7 2v7m0 0L4.25 6.25M7 9l2.75-2.75M2.5 11.5h9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * "Download CV" link. Renders nothing if `profile.cv` is unset, so the
 * site never shows a dead link. `variant="button"` gives an outline button;
 * the default is a quiet mono text link.
 */
export default function CvLink({ variant = "link", className = "" }) {
  if (!profile.cv) return null;

  if (variant === "button") {
    return (
      <Button href={profile.cv} download variant="outline" className={className}>
        Download CV
        <DownloadIcon />
      </Button>
    );
  }

  return (
    <a
      href={profile.cv}
      download
      className={`group/cv inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors duration-200 hover:text-accent ${className}`}
    >
      Download CV
      <DownloadIcon />
    </a>
  );
}
