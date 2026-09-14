// Open Map Styles: carousel plus the full-screen preview modal.
//
// Open/selected state lives in the URL: /styles/:slug/ selects a style, and the
// modal renders from that slug. The cards are real links, so they work with JS off,
// and initStyleModal() intercepts them to open in place.
import { gitHubRepo } from "./tracking.js";
import { withBase } from "./baseurl.js";

// The snippet offered by the modal's copy button. The </script> inside is split so
// it cannot close this module's own tag if the file is ever inlined.
function generateMapCode(styleId, styleName) {
  const close = "</scr" + "ipt>";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${styleName} Map</title>
  <script src="https://cdn.maptiler.com/maptiler-sdk-js/v4.1.0/maptiler-sdk.umd.min.js">${close}
  <link href="https://cdn.maptiler.com/maptiler-sdk-js/v4.1.0/maptiler-sdk.css" rel="stylesheet" />
  <style>
    body { margin: 0; padding: 0; }
    #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    maptilersdk.config.apiKey = 'YOUR_MAPTILER_API_KEY'; // Get your free key at https://www.maptiler.com/cloud/
    const map = new maptilersdk.Map({
      container: 'map',
      style: "${styleId}",
    });
  ${close}
</body>
</html>`;
}

// The modal is server-rendered open on /styles/:slug/ and hidden everywhere else.
// It is emitted by the layout ahead of every section — not inside this one — so that
// its title is the first heading in the document on /styles/:slug/. Hence the
// document-level lookup; the cards below still come from the section.
function initStyleModal(section, config) {
  const modal = document.querySelector("[data-style-modal]");
  const cards = Array.from(section.querySelectorAll("[data-style-card]"));
  if (!modal || !cards.length) return;

  let iframe = modal.querySelector("[data-style-iframe]");
  const titleEl = modal.querySelector("[data-style-modal-title]");
  const descEl = modal.querySelector("[data-style-modal-desc]");
  const githubEl = modal.querySelector("[data-style-modal-github]");
  const cloudEl = modal.querySelector("[data-style-modal-cloud]");
  const copyBtn = modal.querySelector("[data-style-copy]");

  const slugOf = (card) => card.getAttribute("data-style-slug");
  const cardFor = (slug) => cards.find((card) => slugOf(card) === slug) || null;

  // Opening and closing both derive the slug from the path.
  const slugFromLocation = () => {
    const match = window.location.pathname.match(/\/styles\/([^/]+)/);
    return match ? match[1] : null;
  };

  // Every style change replaces the iframe element rather than reassigning its src.
  // Reassigning would NAVIGATE the existing frame, and a frame navigation lands in
  // the joint session history — one preview switch and the browser Back button stops
  // returning to the page you came from. Swapping the element keeps history clean,
  // because the first navigation of a fresh browsing context is a replace, not a push.
  const mountIframe = (src, title) => {
    if ((iframe.getAttribute("src") || null) === (src || null)) {
      if (title) iframe.setAttribute("title", title);
      return;
    }
    const fresh = iframe.cloneNode(false);
    if (src) fresh.setAttribute("src", src);
    else fresh.removeAttribute("src");
    if (title) fresh.setAttribute("title", title);
    iframe.replaceWith(fresh);
    iframe = fresh;
  };

  let copyTimer;

  const resetCopy = () => {
    clearTimeout(copyTimer);
    copyBtn.classList.remove("style-modal__copy--copied");
    copyBtn.classList.add("btn-primary-omt");
  };

  const fill = (card) => {
    const title = card.getAttribute("data-style-title");
    const preview = card.getAttribute("data-style-preview");
    const github = card.getAttribute("data-style-github");
    const cloud = card.getAttribute("data-style-cloud");
    const styleId = card.getAttribute("data-style-id");
    const description = card.querySelector(".mapstyles__card-text").textContent;

    titleEl.textContent = title;
    descEl.textContent = description;

    mountIframe(preview, `${title} live preview`);

    githubEl.setAttribute("href", github);
    const repo = gitHubRepo(github);
    if (repo) githubEl.setAttribute("data-track-repo", repo);
    else githubEl.removeAttribute("data-track-repo");

    // Fiord Color has no cloud map, so the button is omitted rather than disabled.
    cloudEl.toggleAttribute("hidden", !cloud);
    cloudEl.setAttribute("href", cloud || "");
    cloudEl.setAttribute("data-track-style-id", styleId);

    resetCopy();
  };

  const setBodyScroll = (locked) => {
    document.body.style.overflow = locked ? "hidden" : "";
  };

  // On a /styles route, changing the selected style scrolls the section into view.
  const scrollSectionIntoView = () => {
    if (window.location.pathname.includes("/styles")) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const open = (card, { push = true } = {}) => {
    fill(card);
    modal.removeAttribute("hidden");
    setBodyScroll(true);
    if (push) {
      window.history.pushState({}, "", withBase(config, `/styles/${slugOf(card)}/`));
    }
    scrollSectionIntoView();
  };

  const close = ({ push = true } = {}) => {
    modal.setAttribute("hidden", "");
    setBodyScroll(false);
    resetCopy();
    // Tears the preview map down so it stops rendering while hidden.
    mountIframe(null);
    if (push) window.history.pushState({}, "", withBase(config, "/#map-styles"));
  };

  const navigate = (direction) => {
    const current = cards.findIndex((card) => slugOf(card) === slugFromLocation());
    if (current === -1) return;
    const next =
      direction === "next"
        ? (current + 1) % cards.length
        : (current - 1 + cards.length) % cards.length;
    open(cards[next]);
  };

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      // Modifier-clicks and middle-clicks stay real navigations.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(card);
    });
  });

  modal.querySelectorAll("[data-style-modal-close]").forEach((el) => {
    el.addEventListener("click", () => close());
  });

  modal.querySelector("[data-style-prev]").addEventListener("click", () => navigate("prev"));
  modal.querySelector("[data-style-next]").addEventListener("click", () => navigate("next"));

  copyBtn.addEventListener("click", async () => {
    const card = cardFor(slugFromLocation());
    if (!card) return;
    try {
      await navigator.clipboard.writeText(
        generateMapCode(card.getAttribute("data-style-id"), card.getAttribute("data-style-title"))
      );
      copyBtn.classList.remove("btn-primary-omt");
      copyBtn.classList.add("style-modal__copy--copied");
      clearTimeout(copyTimer);
      copyTimer = setTimeout(resetCopy, 2000);
    } catch (err) {
      console.error("Failed to copy map code", err);
    }
  });

  // Arrow keys navigate and Escape closes, but only while the modal is open.
  document.addEventListener("keydown", (event) => {
    if (modal.hasAttribute("hidden")) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate("prev");
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate("next");
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  });

  // Back/forward re-derives the state from the URL, as handlePopState did.
  window.addEventListener("popstate", () => {
    const card = cardFor(slugFromLocation());
    if (card) open(card, { push: false });
    else close({ push: false });
  });

  // Server-rendered open state is already correct; this only locks body scroll
  // and stamps the per-style tracking attributes onto the two links.
  const initial = cardFor(slugFromLocation());
  if (initial && !modal.hasAttribute("hidden")) {
    fill(initial);
    setBodyScroll(true);
  }
}

export function initMapStyles(config) {
  const section = document.querySelector("[data-map-styles]");
  if (!section) return;

  const track = section.querySelector("[data-carousel-track]");
  const prev = section.querySelector("[data-carousel-prev]");
  const next = section.querySelector("[data-carousel-next]");
  const dotsHost = section.querySelector("[data-carousel-dots]");
  if (!track) return;

  // children[0] is the leading spacer; children[1] is the first real card.
  // The original measured both to turn scrollLeft into an index.
  const metrics = () => {
    const spacer = track.children[0];
    const card = track.children[1];
    if (!card || !spacer) return null;
    const style = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth + parseFloat(style.marginRight || "0");
    return { cardWidth, spacerWidth: spacer.offsetWidth };
  };

  // Cards plus the "discover more" card — the spacers are not counted.
  const totalItems = track.querySelectorAll("[data-style-card]").length + 1;
  let activeIndex = 0;
  let maxIndex = 0;

  // One dot per reachable scroll position, not per card: with several cards
  // visible the track stops scrolling long before the last card reaches the left
  // edge, so a dot per card leaves the tail dots unreachable.
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);

  const positionFor = (index, m) =>
    Math.min(m.spacerWidth + index * m.cardWidth, maxScroll());

  const dots = [];

  const syncDots = () => {
    const m = metrics();
    if (!m) return;
    // ceil, not floor: the last position is the end of the track, which may sit
    // mid-card.
    const positions = Math.min(
      totalItems,
      Math.max(1, Math.ceil((maxScroll() - m.spacerWidth) / m.cardWidth) + 1)
    );
    maxIndex = positions - 1;
    if (!dotsHost || dots.length === positions) return;

    while (dots.length > positions) dots.pop().remove();
    while (dots.length < positions) {
      const index = dots.length;
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "mapstyles__dot";
      dot.setAttribute("aria-label", `Go to style ${index + 1}`);
      dot.addEventListener("click", () => scrollToCard(index));
      dotsHost.appendChild(dot);
      dots.push(dot);
    }
  };

  const render = () => {
    dots.forEach((dot, i) =>
      dot.setAttribute("aria-current", String(i === activeIndex))
    );
    if (prev) prev.disabled = activeIndex === 0;
    if (next) next.disabled = activeIndex >= maxIndex;
  };

  const updateActiveIndex = () => {
    const m = metrics();
    if (!m) return;
    // Sub-pixel widths leave a scroll to the end a fraction short of maxScroll.
    if (track.scrollLeft >= maxScroll() - 1) {
      activeIndex = maxIndex;
    } else {
      const index = Math.round((track.scrollLeft - m.spacerWidth) / m.cardWidth);
      activeIndex = Math.min(Math.max(0, index), maxIndex);
    }
    render();
  };

  function scrollToCard(index) {
    const m = metrics();
    if (!m) return;
    track.scrollTo({ left: positionFor(index, m), behavior: "smooth" });
  }

  // Stepping from the active index, rather than scrollBy()-ing a card width, keeps
  // the arrows on the dots' positions even after a drag has left the track between
  // two cards.
  const step = (delta) => {
    scrollToCard(Math.min(Math.max(activeIndex + delta, 0), maxIndex));
  };

  track.addEventListener("scroll", updateActiveIndex, { passive: true });
  if (prev) prev.addEventListener("click", () => step(-1));
  if (next) next.addEventListener("click", () => step(1));

  // Card and spacer widths are viewport-relative, so the dot count changes with
  // the window.
  window.addEventListener("resize", () => {
    syncDots();
    updateActiveIndex();
  });

  // Each card reports the style_preview_open event
  // before navigating.
  section.querySelectorAll("[data-style-card]").forEach((card) => {
    card.addEventListener("click", () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "style_preview_open",
        style_id: card.getAttribute("data-style-id"),
        style_title: card.getAttribute("data-style-title"),
        timestamp: new Date().toISOString(),
      });
    });
  });

  syncDots();
  updateActiveIndex();

  // Lazy-loaded card images change scrollWidth after first paint.
  window.addEventListener("load", () => {
    syncDots();
    updateActiveIndex();
  });

  initStyleModal(section, config);

  // On a /styles/:slug/ page, scroll the section into view on load.
  if (window.location.pathname.includes("/styles")) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}
