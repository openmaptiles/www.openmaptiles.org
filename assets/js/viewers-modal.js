// Interactive web viewers: the side-by-side comparison dialog.
//
// Three mapping libraries render the same openstreetmap style side by side, one
// visible at a time, with centre and zoom carried across when you switch tabs.
// All four libraries load from their CDNs on demand rather than upfront. Nothing here
// is vendored, unlike languages.js: these are three third-party viewers being compared,
// not a dependency of the site itself.

import { withBase } from "./baseurl.js";

const STYLES = [
  "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://cdn.jsdelivr.net/npm/ol@10.10.0/ol.css",
];

const SCRIPTS = [
  "https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://cdn.jsdelivr.net/npm/ol@10.10.0/dist/ol.js",
];

// olms needs `ol` in global scope, so it loads only after the batch above.
const OLMS = "https://cdn.jsdelivr.net/npm/ol-mapbox-style@13.4.3/dist/olms.js";

// Both loaders resolve immediately if the asset is already in the document.
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script ${src}`));
    document.body.appendChild(script);
  });
}

function loadStyle(href) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`link[href="${href}"]`)) return resolve();
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet ${href}`));
    document.head.appendChild(link);
  });
}

// OpenLayers works in resolution, not zoom, so switching tabs needs the conversion in
// both directions. Exported so the round-trip can be asserted directly: the live
// hand-off cannot be observed on localhost, because the API key is domain-restricted
// and MapLibre's camera stays inert while its style 403s.
export const RESOLUTION_AT_ZOOM_0 = (Math.PI * 6378137 * 2) / 256;
export const zoomFromResolution = (res) => Math.log(RESOLUTION_AT_ZOOM_0 / res) / Math.LN2;
export const resolutionFromZoom = (zoom) => RESOLUTION_AT_ZOOM_0 / Math.pow(2, zoom);

export function initViewersModal(config) {
  const modal = document.querySelector("[data-viewers-modal]");
  if (!modal) return;

  const loader = modal.querySelector("[data-viewers-loader]");
  const errorBox = modal.querySelector("[data-viewers-error]");
  const errorText = modal.querySelector("[data-viewers-error-text]");
  const panes = Array.from(modal.querySelectorAll("[data-viewers-pane]"));
  const tabs = Array.from(modal.querySelectorAll("[data-viewers-tab]"));

  const domain = config.mapsDomain || "https://api.maptiler.com";
  const apiKey = config.apiKey || "";
  const styleUrl = `${domain}/maps/openstreetmap/style.json?key=${apiKey}`;
  const xyzUrl = `${domain}/maps/openstreetmap/256/{z}/{x}/{y}.png?key=${apiKey}`;

  // The modal is the whole page on /viewers/, so the lock is unconditional.
  document.body.style.overflow = "hidden";

  const close = () => {
    // Nothing owns this dialog's closed state, so closing navigates home.
    window.location.href = withBase(config, "/");
  };

  modal.querySelectorAll("[data-viewers-close]").forEach((el) => {
    el.addEventListener("click", close);
  });

  // Both exits drop the loader. Removing the node rather than hiding it is what
  // keeps the frame's remaining children at the same structural index.
  const dropLoader = () => loader.remove();

  const fail = (message) => {
    errorText.textContent = message;
    errorBox.removeAttribute("hidden");
    dropLoader();
  };

  modal.querySelector("[data-viewers-retry]").addEventListener("click", () => {
    window.location.reload();
  });

  let activeTab = "mlgljs";
  const maps = { mlgljs: null, leaflet: null, ol: null };
  let olView = null;

  const containerFor = (name) =>
    modal.querySelector(`[data-viewers-container="${name}"]`);

  function initMaps() {
    // A. MapLibre GL JS — zoom 2 here equals zoom 3 in the other two.
    try {
      const maplibregl = window.maplibregl;
      const map = new maplibregl.Map({
        container: containerFor("mlgljs"),
        style: styleUrl,
        center: [0, 0],
        zoom: 2,
        attributionControl: true,
      });
      map.addControl(new maplibregl.NavigationControl(), "top-right");
      maps.mlgljs = map;
    } catch (err) {
      console.error("MapLibre GL JS initialization failed:", err);
    }

    // B. Leaflet
    try {
      const L = window.L;
      const map = L.map(containerFor("leaflet"), {
        zoomControl: false,
        attributionControl: true,
      }).setView([0, 0], 3);
      L.control.zoom({ position: "topright" }).addTo(map);
      L.tileLayer(xyzUrl, {
        maxZoom: 18,
        attribution: "© MapTiler © OpenStreetMap contributors",
      }).addTo(map);
      maps.leaflet = map;
    } catch (err) {
      console.error("Leaflet initialization failed:", err);
    }

    // C. OpenLayers
    try {
      const ol = window.ol;
      const olms = window.olms;

      const view = new ol.View({ center: [0, 0], zoom: 0, minZoom: 0, maxZoom: 18 });

      // ol 8 moved the control defaults, so probe both shapes.
      let controls = [];
      if (ol.control && ol.control.defaults) {
        if (typeof ol.control.defaults === "function") {
          controls = ol.control.defaults();
        } else if (typeof ol.control.defaults.defaults === "function") {
          controls = ol.control.defaults.defaults();
        }
      }

      const map = new ol.Map({
        target: containerFor("ol"),
        controls: controls,
        view: view,
      });
      olms.apply(map, styleUrl);

      maps.ol = map;
      olView = view;
    } catch (err) {
      console.error("OpenLayers initialization failed:", err);
    }
  }

  // Reads [lng, lat, zoom] off whichever library is showing, on the shared
  // Leaflet/OpenLayers scale — MapLibre runs one zoom level behind.
  function readPosition() {
    try {
      if (activeTab === "mlgljs" && maps.mlgljs) {
        const center = maps.mlgljs.getCenter();
        return [center.lng, center.lat, maps.mlgljs.getZoom() + 1];
      }
      if (activeTab === "leaflet" && maps.leaflet) {
        const center = maps.leaflet.getCenter();
        return [center.lng, center.lat, maps.leaflet.getZoom()];
      }
      if (activeTab === "ol" && maps.ol && olView) {
        const center = window.ol.proj.toLonLat(olView.getCenter());
        return [center[0], center[1], zoomFromResolution(olView.getResolution())];
      }
    } catch (err) {
      console.error("Error reading position state:", err);
    }
    return [0, 0, 2];
  }

  function applyPosition(tab, pos) {
    try {
      if (tab === "mlgljs" && maps.mlgljs) {
        maps.mlgljs.resize();
        maps.mlgljs.setCenter([pos[0], pos[1]]);
        maps.mlgljs.setZoom(pos[2] - 1);
      } else if (tab === "leaflet" && maps.leaflet) {
        maps.leaflet.invalidateSize();
        maps.leaflet.setView([pos[1], pos[0]], pos[2], { animate: false });
      } else if (tab === "ol" && maps.ol && olView) {
        maps.ol.updateSize();
        olView.setCenter(window.ol.proj.fromLonLat([pos[0], pos[1]]));
        olView.setResolution(resolutionFromZoom(pos[2]));
      }
    } catch (err) {
      console.error("Error writing coordinated updates:", err);
    }
  }

  function selectTab(next) {
    if (next === activeTab) return;

    // Read before the swap — the outgoing map is the one holding the position.
    const pos = readPosition();

    activeTab = next;
    panes.forEach((pane) => {
      const on = pane.getAttribute("data-viewers-pane") === next;
      if (on) pane.setAttribute("data-active", "true");
      else pane.removeAttribute("data-active");
    });
    tabs.forEach((tab) => {
      tab.setAttribute(
        "aria-selected",
        String(tab.getAttribute("data-viewers-tab") === next)
      );
    });

    // The incoming container was 0-opacity and possibly unsized, so the resize
    // and recentre wait a tick, so the pane has its final size first.
    setTimeout(() => applyPosition(next, pos), 60);
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () =>
      selectTab(tab.getAttribute("data-viewers-tab"))
    );
  });

  (async function load() {
    try {
      await Promise.all(STYLES.map(loadStyle));
      await Promise.all(SCRIPTS.map(loadScript));
      await loadScript(OLMS);
    } catch (err) {
      console.error(err);
      fail("Unable to load map resources. Please check your network connection.");
      return;
    }

    dropLoader();
    initMaps();
  })();
}
