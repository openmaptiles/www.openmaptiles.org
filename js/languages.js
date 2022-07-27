---
---

var positionAfterLoad = location.hash.length < 3;

var map;
if (mapboxgl.supported()) {
  mapboxgl.setRTLTextPlugin('https://cdn.maptiler.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js');
  map = new mapboxgl.Map({
    container: 'map',
    style: "{{ site.maps.domain }}/maps/bright/style.json?key={{ site.maps.key }}",
    attributionControl: true,
    hash: true
  });
} else {
  document.getElementById('nowebgl').style.display = 'block';
}

var langEl = document.getElementById('lang');
var updateLang = function() {
  var language = langEl.value;
  if (!language.length) {
    language = navigator.language.split('-')[0];
    langEl.value = language;
    if (!langEl.value) {
      langEl.value = 'en';
    }
  }
  var langOptionEl = langEl.options[langEl.selectedIndex];
  if (langOptionEl) {
    var title = langOptionEl.getAttribute('data-title') || 'OpenStreetMap in your language';
    document.getElementById('page-title').innerHTML = title;
    document.title = title;

    if (positionAfterLoad) {
      var bbox = langOptionEl.getAttribute('data-bbox') || '-180,-60,180,80';
      if (map) {
        map.fitBounds(bbox.split(',').map(parseFloat), {animate: false, padding: 10});
        map.once('moveend', function() {
          map.zoomOut();
        });
      }
      positionAfterLoad = false;
    }
  }
  var alsoAlt = document.getElementById('also-alternative').checked;
  document.getElementById('also-alternative-wrap').style.display =
      language == 'native' ? 'none' : '';
  map.setLanguage(language, !alsoAlt);

  if (history.replaceState) {
    var hash = location.hash;
    history.replaceState(undefined, undefined, '/languages/' + language + '/');
    location.hash = hash;
  }
};
updateLang();
