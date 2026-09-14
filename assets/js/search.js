// Docs search. Replaces Pagefind with lunr over /search.json (plan §8).
//
// Behaviour is taken from what the Pagefind default UI actually did, since that
// is what users have today:
//   - search as you type, from 1 character (Pagefind had no minimum)
//   - a drawer that opens on the first search and closes when the box is emptied
//   - a message row reading "N results for <term>", or "No results for <term>"
//   - a clear button that appears once there is a query
//   - result links reachable with ArrowDown/ArrowUp, Escape to close
//
// Accepted up front, and unavoidable: lunr ranks stemmed tokens over a JSON
// corpus while Pagefind did substring matching over rendered HTML, so ordering
// for a given query will sometimes differ. See §8.
//
// Two dataLayer events are reported: `docs_search` after a
// 1s idle debounce, and `docs_search_result_click` with the 1-based position.

const INDEX_URL = "/search.json";
const LUNR_URL = "/assets/js/vendor/lunr.min.js";

// Pagefind's own default page size, never overridden. Rendering more than
// this overflowed the drawer: 10 results are ~1600px inside a max-height of 80vh,
// so the last card was sliced at the bottom edge with no visible affordance.
const PAGE_SIZE = 5;
// Kept short on purpose: the drawer is 320px wide, so ±90 characters ran to five
// lines per card and five cards no longer fit the 80vh drawer.
const EXCERPT_RADIUS = 60;
const TRACK_DEBOUNCE = 1000;

const push = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ...event, timestamp: new Date().toISOString() });
};

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[c]);

let lunrPromise;

function loadLunr(base) {
  if (lunrPromise) return lunrPromise;
  lunrPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${base}${LUNR_URL}`;
    script.onload = () => resolve(window.lunr);
    script.onerror = () => reject(new Error("Failed to load lunr"));
    document.head.appendChild(script);
  });
  return lunrPromise;
}

// Builds the excerpt around the first matched term, with that term marked —
// Pagefind returned a server-built excerpt with <mark> in it, so the shape of
// the output matches even though the selection logic cannot.
function excerptFor(body, terms) {
  const lower = body.toLowerCase();
  let at = -1;
  let hit = "";
  for (const term of terms) {
    const found = lower.indexOf(term);
    if (found !== -1 && (at === -1 || found < at)) {
      at = found;
      hit = term;
    }
  }
  if (at === -1) {
    return escapeHtml(body.slice(0, EXCERPT_RADIUS * 2)) + (body.length > EXCERPT_RADIUS * 2 ? "…" : "");
  }

  const start = Math.max(0, at - EXCERPT_RADIUS);
  const end = Math.min(body.length, at + hit.length + EXCERPT_RADIUS);
  const before = body.slice(start, at);
  const match = body.slice(at, at + hit.length);
  const after = body.slice(at + hit.length, end);

  return (
    (start > 0 ? "…" : "") +
    escapeHtml(before) +
    `<mark>${escapeHtml(match)}</mark>` +
    escapeHtml(after) +
    (end < body.length ? "…" : "")
  );
}

// lunr needs an explicit query to do prefix matching, which is what makes
// search-as-you-type usable: `tile` should match `tileserver` before the word is
// finished. Terms are OR'd, as Pagefind's were.
function search(idx, docs, query) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => t.replace(/[~^:*+\-]/g, ""))
    .filter(Boolean);
  if (!terms.length) return { hits: [], terms };

  let hits = [];
  try {
    hits = idx.query((q) => {
      for (const term of terms) {
        q.term(term, { boost: 10 });
        q.term(term, { boost: 3, wildcard: window.lunr.Query.wildcard.TRAILING });
        // One edit of slack, but only once the term is long enough for that not
        // to match half the corpus.
        if (term.length > 3) q.term(term, { boost: 1, editDistance: 1 });
      }
    });
  } catch (err) {
    console.error("Search query failed", err);
    return { hits: [], terms };
  }

  return {
    hits: hits.map((hit) => docs.find((d) => d.url === hit.ref)).filter(Boolean),
    terms,
  };
}

export function initSearch(config) {
  const root = document.querySelector("[data-docs-search]");
  if (!root) return;

  const input = root.querySelector("[data-search-input]");
  const clear = root.querySelector("[data-search-clear]");
  const drawer = root.querySelector("[data-search-drawer]");
  const base = config.baseurl || "";

  let docs = [];
  let idx = null;
  let ready = null;
  let currentQuery = "";
  let trackTimer;
  // Reset whenever the query changes, grown by the "Load more results" button.
  let shown = PAGE_SIZE;
  let lastHits = [];
  let lastTerms = [];

  // The index is built on the first keystroke, not on page load — the corpus is
  // ~100 KB and most docs visits never search.
  function prepare() {
    if (ready) return ready;
    ready = (async () => {
      const [lunr, corpus] = await Promise.all([
        loadLunr(base),
        fetch(`${base}${INDEX_URL}`).then((res) => {
          if (!res.ok) throw new Error(`search.json ${res.status}`);
          return res.json();
        }),
      ]);
      docs = corpus;
      idx = lunr(function () {
        this.ref("url");
        this.field("title", { boost: 10 });
        this.field("category", { boost: 4 });
        this.field("description", { boost: 4 });
        this.field("body");
        corpus.forEach((doc) => this.add(doc));
      });
    })().catch((err) => {
      console.error("Failed to initialise search", err);
      // Let a later keystroke try again rather than wedging the box.
      ready = null;
      throw err;
    });
    return ready;
  }

  const setOpen = (open) => {
    drawer.classList.toggle("docs-search__drawer--hidden", !open);
    input.setAttribute("aria-expanded", String(open));
  };

  const renderResults = (query, hits, terms) => {
    const count = hits.length;
    const message = count
      ? `${count} result${count === 1 ? "" : "s"} for ${query}`
      : `No results for ${query}`;

    const items = hits
      .slice(0, shown)
      .map(
        (doc) => `
          <li class="docs-search__result">
            <div class="docs-search__result-inner">
              <p class="docs-search__result-title"><a class="docs-search__result-link" href="${escapeHtml(doc.url)}">${escapeHtml(doc.title || doc.url)}</a></p>
              <p class="docs-search__result-excerpt">${excerptFor(doc.body || doc.description || "", terms)}</p>
            </div>
          </li>`
      )
      .join("");

    const more =
      count > shown
        ? `<button type="button" class="docs-search__button" data-search-more>Load more results</button>`
        : "";

    drawer.innerHTML = `
      <div class="docs-search__results-area">
        <p class="docs-search__message">${escapeHtml(message)}</p>
        <ol class="docs-search__results" id="docs-search-results">${items}
        </ol>${more}
      </div>`;
    setOpen(true);
    return count;
  };

  async function run() {
    const query = input.value.trim();
    clear.classList.toggle("docs-search__clear--suppressed", !query);

    if (!query) {
      currentQuery = "";
      drawer.innerHTML = "";
      setOpen(false);
      return;
    }

    try {
      await prepare();
    } catch {
      return;
    }

    const { hits, terms } = search(idx, docs, query);
    if (query !== currentQuery) shown = PAGE_SIZE;
    currentQuery = query;
    lastHits = hits;
    lastTerms = terms;
    const count = renderResults(query, hits, terms);

    // 1s idle debounce before reporting the query.
    clearTimeout(trackTimer);
    trackTimer = setTimeout(() => {
      if (query.length < 2) return;
      push({ event: "docs_search", query, results_count: count });
    }, TRACK_DEBOUNCE);
  }

  input.addEventListener("input", run);

  // Pagefind's "Load more results" button, paging by the same 5.
  drawer.addEventListener("click", (event) => {
    if (!event.target.closest("[data-search-more]")) return;
    shown += PAGE_SIZE;
    renderResults(currentQuery, lastHits, lastTerms);
  });

  clear.addEventListener("click", () => {
    input.value = "";
    run();
    input.focus();
  });

  // action="javascript:void(0);" already stops the navigation; this keeps Enter
  // from doing anything surprising if that attribute is ever dropped.
  root.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const links = () => Array.from(drawer.querySelectorAll(".docs-search__result-link"));

  const move = (delta) => {
    const all = links();
    if (!all.length) return;
    const at = all.indexOf(document.activeElement);
    const next = at === -1 ? (delta > 0 ? 0 : all.length - 1) : at + delta;
    if (next < 0) {
      input.focus();
      return;
    }
    (all[Math.min(next, all.length - 1)] || input).focus();
  };

  root.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      input.focus();
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);
    }
  });

  // Clicking outside closes the drawer, as the Pagefind UI did.
  document.addEventListener("click", (event) => {
    // "Load more results" re-renders the drawer, which detaches the button that
    // was clicked. By the time this bubbles up to document, root.contains() is
    // false for that detached node and the drawer would close on itself.
    if (!event.target.isConnected) return;
    if (!root.contains(event.target)) setOpen(false);
  });

  // Delegated, and reports a 1-based
  // position within the rendered list.
  drawer.addEventListener("click", (event) => {
    const link = event.target.closest(".docs-search__result-link");
    if (!link) return;
    push({
      event: "docs_search_result_click",
      query: currentQuery,
      result_url: link.href,
      position: links().indexOf(link) + 1,
    });
  });
}
