// GTM dataLayer tracking: page views, intent events, and outbound clicks.
//
// One delegated listener reads the data-track-* attributes the Liquid includes emit,
// plus a generic outbound catch-all. Nothing is wired per element.
//
// Attribute contract (see _includes/footer.html for the canonical example):
//   data-track-event        dataLayer event name
//   data-track-section      source_section (falls back to the enclosing data-section)
//   data-track-label        cta_label
//   data-track-destination  destination (download/server events)
//   data-track-repo         repo (github events)
//   data-track-style-id     style_id (style_customize_click)
//   data-track-variant      variant (hero_cta_click)
// href supplies destination_url.
//
// Section wrappers carry data-section; sourceSection() walks up to the nearest
// one. Without it the only source_section a click can get is the data-track-section
// on the element itself, so untagged links — every outbound_click — go out with
// the key undefined and GTM drops it.

const push = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...event, timestamp: new Date().toISOString() });
};

const hostnameOf = (url) => {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
};

const isExternal = (url) => {
  try {
    return new URL(url, window.location.origin).hostname !== window.location.hostname;
  } catch {
    return false;
  }
};

// Mirrors classifyMapTilerURL(). Used only to SUPPRESS the generic
// outbound_click for links that have their own intent event.
const classifyMapTiler = (url) => {
  try {
    const u = new URL(url);
    if (!u.hostname.includes("maptiler.com")) return null;
    if (u.pathname.startsWith("/cloud") || u.pathname.startsWith("/maps") || u.hostname.startsWith("cloud.")) return "cloud";
    if (u.pathname.startsWith("/server")) return "server";
    if (u.pathname.startsWith("/engine")) return "server";
    if (u.pathname.startsWith("/data") || u.pathname.startsWith("/on-prem-datasets") || u.pathname.startsWith("/satellite")) return "download";
    return null;
  } catch {
    return null;
  }
};

// Mirrors extractGitHubRepo(). Exported because map-styles.js has to fill the
// modal's repo attribute when the selected style changes.
export const gitHubRepo = (url) => {
  try {
    const u = new URL(url);
    if (u.hostname !== "github.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    return parts.length < 2 ? null : `${parts[0]}/${parts[1]}`;
  } catch {
    return null;
  }
};

const elementText = (el) =>
  (el.textContent || "").trim() || el.getAttribute("aria-label") || "";

// Mirrors getSourceSection(): nearest data-section ancestor, else a class-name guess.
const sourceSection = (el) => {
  let node = el;
  while (node && node !== document.body) {
    const section = node.getAttribute && node.getAttribute("data-section");
    if (section) return section;
    node = node.parentElement;
  }
  const cls = typeof el.className === "string" ? el.className : "";
  if (cls.includes("hero")) return "hero";
  if (cls.includes("header")) return "header";
  if (cls.includes("footer")) return "footer";
  return undefined;
};

// Mirrors getContentGroup().
const contentGroup = (pathname) => {
  if (pathname === "/" || pathname === "") return "home";
  if (pathname.startsWith("/docs")) return "documentation";
  if (pathname.startsWith("/about")) return "about";
  if (pathname.startsWith("/styles")) return "styles";
  if (pathname.startsWith("/languages")) return "languages";
  return undefined;
};

function handleClick(event) {
  const anchor = event.target.closest("a, button");
  if (!anchor) return;

  // Explicitly tagged elements fire their declared event.
  const name = anchor.getAttribute("data-track-event");
  if (name) {
    const payload = { event: name };
    const section = anchor.getAttribute("data-track-section");
    const label = anchor.getAttribute("data-track-label");
    const destination = anchor.getAttribute("data-track-destination");
    const repo = anchor.getAttribute("data-track-repo");
    const styleId = anchor.getAttribute("data-track-style-id");
    const variant = anchor.getAttribute("data-track-variant");
    const href = anchor.getAttribute("href");

    // An explicit data-track-section wins; otherwise take the enclosing
    // data-section, so events that never declared one still get it.
    const resolvedSection = section || sourceSection(anchor);

    if (resolvedSection) payload.source_section = resolvedSection;
    if (label) payload.cta_label = label;
    if (destination) payload.destination = destination;
    if (repo) payload.repo = repo;
    if (styleId) payload.style_id = styleId;
    if (variant) payload.variant = variant;
    if (href && href !== "#") payload.destination_url = anchor.href;

    push(payload);
    return;
  }

  // Generic catch-all, matching useOutboundTracking: external links only, and
  // never for links that already have a specific event or a MapTiler/GitHub
  // intent classification.
  if (anchor.tagName !== "A" || !anchor.href) return;
  if (!isExternal(anchor.href)) return;
  if (anchor.hasAttribute("data-tracked")) return;
  if (classifyMapTiler(anchor.href)) return;
  if (gitHubRepo(anchor.href)) return;

  const host = hostnameOf(anchor.href);
  if (!host) return;

  const payload = {
    event: "outbound_click",
    destination_host: host,
    destination_url: anchor.href,
    cta_label: elementText(anchor),
  };
  const section = sourceSection(anchor);
  if (section) payload.source_section = section;

  push(payload);
}

export function initTracking() {
  // Capture phase, so a preventDefault downstream cannot swallow the event.
  document.addEventListener("click", handleClick, true);

  push({
    event: "page_view",
    page_path: window.location.pathname,
    page_title: document.title,
    content_group: contentGroup(window.location.pathname),
  });
}
