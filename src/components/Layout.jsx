import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <ScrollToTop />
      <Header />
      {/* Re-keyed on navigation so each page fades in */}
      <main id="main" key={pathname} className="animate-page-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
