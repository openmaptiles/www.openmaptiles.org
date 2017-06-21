// from https://raw.githubusercontent.com/klokantech/gl-style-package-spec/ddc93f7535b09365e25f529a4ea5dbf4bf16d7e2/task/lang-fallback.js
var langFallbackDecorate = function(style, cfg) {
  var layers = style.layers;
  var lf = cfg['layer-filter'];
  var decorators = cfg['decorators'];
  var lfProp = lf[1];
  var lfValues = lf.slice(2);

  for (var i = layers.length-1; i >= 0; i--) {
    var layer = layers[i];
    if(!(
        lf[0]==='in'
        && lfProp==='layout.text-field'
        && layer.layout && layer.layout['text-field']
        && lfValues.indexOf(layer.layout['text-field'])>=0
    )) {
      continue;
    }
    for (var j = decorators.length-1; j >= 0; j--) {
      var decorator = decorators[j];
      var postfix = decorator['layer-name-postfix'] || '';
      postfix = postfix.replace(/(^-+|-+$)/g, '');

      if(j>0) {
        var newLayer = JSON.parse(JSON.stringify(layer));
        layers.splice(i+1, 0, newLayer);
      } else {
        newLayer = layer;
      }
      newLayer.id += postfix ? '-'+postfix : '';
      newLayer.layout['text-field'] = decorator['layout.text-field'];
      if(newLayer.layout['symbol-placement']==='line') {
        newLayer.layout['text-field'] =
            newLayer.layout['text-field'].replace('\n', ' ');
      }
      var filterPart = decorator['filter-all-part'].concat();
      if(!newLayer.filter) {
        newLayer.filter = filterPart;
      } else if(newLayer.filter[0]=='all') {
        newLayer.filter.push(filterPart);
      } else {
        newLayer.filter = [
          'all',
          newLayer.filter,
          filterPart
        ];
      }
    }
  }
};


var positionAfterLoad = location.hash.length < 3;


var STYLE_JSON_URL = "http://rawgit.com/openmaptiles/osm-bright-gl-style/c9d27597a211dc37eb98c544ff4dc1b4d770bdbe/style-cdn.json";
var STYLE_JSON;

mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');
var map = new mapboxgl.Map({
  container: 'map',
  attributionControl: true,
  hash: true
});

var langEl = document.getElementById('lang');
var setStyle = function() {
  if (!STYLE_JSON) return;
  var style = STYLE_JSON;
  var language = langEl.value;
  var langOptionEl = langEl.options[langEl.selectedIndex];
  var isLatin = true;
  if (langOptionEl) {
    document.getElementById('page-title').innerHTML = langOptionEl.getAttribute('data-title') || 'OpenStreetMap in your language';
    if (positionAfterLoad) {
      var bbox = langOptionEl.getAttribute('data-bbox') || '-180,-60,180,80';
      map.fitBounds(bbox.split(',').map(parseFloat), {animate: false, padding: 10});
      positionAfterLoad = false;
    }
    if (langOptionEl.getAttribute('data-nonlatin')) {
      isLatin = false;
    }
  }
  if (language.length) {
    style = JSON.parse(JSON.stringify(style));
    var alsoAlt = document.getElementById('also-alternative').checked;
    var langCfg = {
      "layer-filter": [
        "in",
        "layout.text-field",
        "{name}",
        "{name_de}",
        "{name_en}"
      ],
      "decorators": [
        {
          "layout.text-field": "{name:latin}" + (alsoAlt ? "\n{name:nonlatin}" : ""),
          "filter-all-part": [
            "!has",
            "name:" + language
          ]
        },
        {
          "layer-name-postfix": language,
          "layout.text-field": "{name:" + language + "}" + (alsoAlt ? "\n{name:" + (isLatin ? 'nonlatin' : 'latin') + "}" : ""),
          "filter-all-part": [
            "has",
            "name:" + language
          ]
        }
      ]
    };
    langFallbackDecorate(style, langCfg);
  }
  if (history.replaceState) {
    var hash = location.hash;
    history.replaceState(undefined, undefined, '/languages/' + language + '/');
    location.hash = hash;
  }
  map.setStyle(style);
};

fetch(STYLE_JSON_URL).then(function(response) {
  return response.text();
}).then(function(data) {
  STYLE_JSON = JSON.parse(data);
  STYLE_JSON.sources.openmaptiles.url = "http://test.openmaptiles.com:8036/data/v3.json"; // v3.6
  setStyle();
});
