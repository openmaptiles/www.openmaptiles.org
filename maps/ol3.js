var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 22});

var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>',
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'https://osm2vectortiles-0.tileserver.com/v3/{z}/{x}/{y}.pbf'
  })
});

var view = new ol.View({
  center: [732602.1417165294, 5864590.06411005],
  resolution: 2445,
  maxResolution: 78271.51696402048
});

var map = new ol.Map({
  target: 'map',
  view: view
});

fetch('https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json').then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(layer, glStyle, 'openmaptiles').then(function() {
      map.addLayer(layer);
    });
  });
});
