import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "./App.jsx";

/**
 * Server-side entry used only at build time by scripts/prerender.mjs.
 * Renders one route to an HTML string; the client then hydrates it.
 */
export function render(url) {
  return renderToString(
    <StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </StrictMode>,
  );
}
