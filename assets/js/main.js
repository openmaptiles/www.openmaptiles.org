// Entry point. Plain ES modules, no bundler: the repo has no JavaScript build step
// by design, so what ships is what is written here.
import { initTracking } from "./tracking.js";
import { initUI } from "./ui.js";
import { initHero } from "./hero.js";
import { initLanguages } from "./languages.js";
import { initMapStyles } from "./map-styles.js";
import { initViewersModal } from "./viewers-modal.js";
import { initSearch } from "./search.js";

const configEl = document.getElementById("site-config");
const config = configEl ? JSON.parse(configEl.textContent) : {};

initTracking();
initUI();
// The multilingual map loads on the hero dialog's first open — see languages.js. On
// /languages/:code/ the dialog is server-rendered open, so this fires immediately.
initHero(config, () => initLanguages(config));
initMapStyles(config);

// /viewers/ only — pulls maplibre-gl, leaflet and ol from their CDNs.
if (document.querySelector("[data-viewers-modal]")) {
  initViewersModal(config);
}

// Docs pages only. lunr and the corpus load on the first keystroke, not here.
initSearch(config);
