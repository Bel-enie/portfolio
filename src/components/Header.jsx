import { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Container from "./Container";
import Button from "./Button";
import { profile } from "../data/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
];

const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Border + blur only once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pillLink = ({ isActive }) =>
    `rounded-full px-3.5 py-1.5 text-[14px] transition-colors duration-200 ${
      isActive
        ? "bg-raised text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        : "text-muted hover:text-ink"
    }`;

  return (
    <div
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Identity */}
          <Link
            to="/"
            aria-label={`${profile.name} — home`}
            className="flex items-center gap-3 text-ink"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-ink font-mono text-[12px] font-medium text-paper">
              {initials}
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              {profile.name}
            </span>
            <span className="hidden font-mono text-[11px] text-muted md:inline">
              {profile.role}
            </span>
          </Link>

          {/* Desktop: pill nav + CTA */}
          <div className="hidden items-center gap-3 sm:flex">
            <nav aria-label="Main">
              <ul className="flex items-center gap-0.5 rounded-full border border-line bg-surface/70 p-1 backdrop-blur-sm">
                {nav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={pillLink}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <Button to="/contact" size="sm" pill>
              Let's talk
            </Button>
          </div>

          {/* Mobile: menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink sm:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              {open ? (
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile: dropdown panel */}
        {open && (
          <nav
            id="mobile-nav"
            aria-label="Main"
            className="animate-page-in border-t border-line py-3 sm:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    onClick={close}
                    className={({ isActive }) =>
                      `flex items-center justify-between rounded-md px-3 py-3 text-[15px] ${
                        isActive ? "bg-raised text-ink" : "text-muted"
                      }`
                    }
                  >
                    {item.label}
                    <span className="font-mono text-[11px] text-muted">
                      {String(nav.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <Button to="/contact" onClick={close} className="mt-3 w-full">
              Let's talk
            </Button>
          </nav>
        )}
      </Container>
    </div>
  );
}
