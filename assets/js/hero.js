// Interactive parts of the homepage hero:
// the map-mockup click-through and the multilingual dialog's open/close rules.

import { withBase } from "./baseurl.js";

// Substring test, so it holds under a baseurl prefix as well as at the root.
const isLanguagesRoute = () => window.location.pathname.includes("/languages");

// `onLanguagesOpen` pulls in the MapTiler SDK on the dialog's first open. It lives
// here because this is the only code that knows when the dialog becomes visible.
export function initHero(config, onLanguagesOpen) {
  // Map mockup opens the style preview, reporting the same tracking event
  // openMapStylesBasic() pushed before navigating.
  const mockup = document.querySelector("[data-hero-style-preview]");
  if (mockup) {
    mockup.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "style_preview_open",
        style_id: "basic-v2",
        style_title: "MapTiler Basic",
        timestamp: new Date().toISOString(),
      });
      window.location.href = withBase(config, "/styles/maptiler-basic/");
    });
  }

  const dialog = document.querySelector("[data-languages-dialog]");
  if (!dialog) return;

  const setOpen = (open) => {
    dialog.toggleAttribute("hidden", !open);
    // Body scroll stays locked while the dialog is open.
    document.body.style.overflow = open ? "hidden" : "";
    // Safe on every open: initLanguages ignores all but the first.
    if (open && onLanguagesOpen) onLanguagesOpen();
  };

  const close = () => {
    // closeLanguages() rewrote the URL to the site root without a reload.
    window.history.pushState({}, "", withBase(config, "/"));
    setOpen(false);
  };

  dialog.querySelectorAll("[data-languages-close]").forEach((el) => {
    el.addEventListener("click", close);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dialog.hasAttribute("hidden")) close();
  });

  window.addEventListener("popstate", () => setOpen(isLanguagesRoute()));

  // Server-rendered open state already matches the route; this only re-syncs
  // the body scroll lock.
  setOpen(!dialog.hasAttribute("hidden"));
}
