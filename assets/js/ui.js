// Small interactive behaviours for the docs and marketing pages.
// Each function is a no-op when its markup is absent, so this module is safe to
// load on every page.

// ── header: mobile menu ──────────────────────────────────────────────────────
// Mobile menu open/closed state. The markup is already in the
// document (emitted with `hidden`), so this toggles attributes rather than
// building DOM.
function initMobileMenu() {
  const button = document.querySelector("[data-mobile-menu-toggle]");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;

  const label = button.querySelector(".sr-only");
  const listIcon = button.querySelector("svg").outerHTML;
  const closeIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 256 256" class="icon icon--lg" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>';

  const setIcon = (open) => {
    button.querySelector("svg").outerHTML = open ? closeIcon : listIcon;
  };

  button.addEventListener("click", () => {
    const open = menu.hasAttribute("hidden");
    menu.toggleAttribute("hidden", !open);
    button.setAttribute("aria-expanded", String(open));
    setIcon(open);
    if (label) label.textContent = open ? "Close main menu" : "Open main menu";
  });

  // Close on link click, so the menu is never left open across a navigation.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.setAttribute("hidden", "");
      button.setAttribute("aria-expanded", "false");
      setIcon(false);
    });
  });
}

// ── header: GitHub star count ────────────────────────────────────────────────
// GitHub star count in the header. The badge is hidden until the request
// resolves, which is exactly what the server-rendered markup showed.
const STAR_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z"></path></svg>';

async function initGitHubStars() {
  const badges = document.querySelectorAll("[data-github-stars]");
  if (!badges.length) return;

  try {
    const res = await fetch("https://api.github.com/repos/openmaptiles/openmaptiles");
    const data = await res.json();
    if (!data || typeof data.stargazers_count !== "number") return;

    const count = data.stargazers_count.toLocaleString();
    badges.forEach((badge) => {
      badge.innerHTML = `${STAR_ICON}${count}`;
      badge.removeAttribute("hidden");
    });
  } catch (err) {
    // Non-fatal: the badge simply stays hidden if the API call fails.
    console.error(err);
  }
}

// ── docs sidebar: collapse ───────────────────────────────────────────────────
function initSidebarToggle() {
  const sidebar = document.querySelector("[data-docs-sidebar]");
  const button = document.querySelector("[data-sidebar-toggle]");
  if (!sidebar || !button) return;

  const left = button.querySelector('[data-caret="left"]');
  const right = button.querySelector('[data-caret="right"]');

  button.addEventListener("click", () => {
    const collapsed = sidebar.getAttribute("data-collapsed") === "true";
    const next = !collapsed;
    sidebar.setAttribute("data-collapsed", String(next));
    button.setAttribute("aria-expanded", String(!next));
    button.setAttribute("aria-label", next ? "Show sidebar" : "Hide sidebar");
    if (left) left.toggleAttribute("hidden", next);
    if (right) right.toggleAttribute("hidden", !next);
  });
}

// ── code blocks: copy to clipboard ───────────────────────────────────────────
// Copy-to-clipboard on code blocks, reverting the button after 2s.
const CHECK_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256" aria-hidden="true"><path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path></svg>';

function initCopyButtons() {
  document.querySelectorAll("[data-copy-code]").forEach((button) => {
    const original = button.innerHTML;
    let timer;

    button.addEventListener("click", async () => {
      const pre = button.parentElement.querySelector("pre");
      if (!pre) return;

      try {
        await navigator.clipboard.writeText(pre.textContent.replace(/\n$/, ""));
        button.innerHTML = CHECK_ICON;
        button.setAttribute("data-copied", "true");
        clearTimeout(timer);
        timer = setTimeout(() => {
          button.innerHTML = original;
          button.removeAttribute("data-copied");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy text", err);
      }
    });
  });
}

// ── schema page: show diagrams ───────────────────────────────────────────────
// Diagram show/hide switch on schema pages. The images are in the DOM
// already (hidden by CSS), so this only flips a flag.
function initDiagramsToggle() {
  const button = document.querySelector("[data-diagrams-toggle]");
  const page = document.querySelector(".schema-page");
  if (!button || !page) return;

  button.addEventListener("click", () => {
    const on = button.getAttribute("aria-checked") === "true";
    button.setAttribute("aria-checked", String(!on));
    page.setAttribute("data-diagrams", String(!on));
  });
}

// ── scroll to top on navigation ──────────────────────────────────────────────
// Deliberately empty. A client-side router would have to reset scroll on every route
// change; with real page loads the browser already does it, and in-page anchors are
// native. Noted so the absence reads as a decision rather than an omission.

export function initUI() {
  initMobileMenu();
  initGitHubStars();
  initSidebarToggle();
  initCopyButtons();
  initDiagramsToggle();
}
