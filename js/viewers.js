var maps = {};
var style = 'https://maps.tilehosting.com/styles/basic/style.json?key=' + api;
var xyz = 'https://maps.tilehosting.com/styles/basic/{z}/{x}/{y}.png?key=' + api;
var xyzpbf = 'https://maps.tilehosting.com/data/v3/%7Bz%7D/%7Bx%7D/%7By%7D.pbf?key=' + api;

var mbgljsMap = new mapboxgl.Map({
  attributionControl: false,
  container: 'map-mbgljs',
  style: style,
  zoom: 2
});
maps['mbgljs'] = {
  getPos: function() {
    return [mbgljsMap.getCenter().lng, mbgljsMap.getCenter().lat, mbgljsMap.getZoom() + 1];
  },
  setPos: function(pos) {
    mbgljsMap.setCenter([pos[0], pos[1]]);
    mbgljsMap.setZoom(pos[2] - 1);
  }
};

var leafletMap = L.map('map-leaflet', {zoomControl: false, attributionControl: false}).setView([0, 0], 2);
L.tileLayer(xyz, {
  maxZoom: 18
}).addTo(leafletMap);

maps['leaflet'] = {
  getPos: function() {
    return [leafletMap.getCenter().lng, leafletMap.getCenter().lat, leafletMap.getZoom()];
  },
  setPos: function(pos) {
    leafletMap.setView([pos[1], pos[0]], pos[2], {animate: false});
  }
};

var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>',
    format: new ol.format.MVT(),
    tileGrid: ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 14}),
    tilePixelRatio: 8,
    url: xyzpbf
  })
});
var viewOl = new ol.View({
  center: [0, 0],
  zoom: 0,
  minZoom: 0,
  maxZoom: 18
});
var mapOl = new ol.Map({
  target: 'map-ol',
  controls: [],
  view: viewOl
});

olms.apply(mapOl, style);

maps['ol'] = {
  getPos: function() {
    var center = ol.proj.toLonLat(viewOl.getCenter());
    return [center[0], center[1], Math.log((Math.PI * 6378137 * 2 / 256) / viewOl.getResolution()) / Math.LN2];
  },
  setPos: function(pos) {
    var center = ol.proj.fromLonLat(pos);
    viewOl.setCenter(center);
    viewOl.setResolution((Math.PI * 6378137 * 2 / 256) / Math.pow(2, pos[2]));
  }
};


var activeId = 'mbgljs';
function switchMap(id) {
  var oldPos = maps[activeId].getPos();
  var active = document.querySelector('.map.active');
  var activeSwitch = document.querySelector('.map-switch.active');
  if (active) {
    active.className = 'viewers map';
  }
  if (activeSwitch) {
    activeSwitch.className = 'map-switch';
  }
  var newActive = document.getElementById('map-' + id);
  newActive.className = 'viewers map active';
  var newActiveSwitch = document.getElementById('map-switch-' + id);
  newActiveSwitch.className = 'map-switch active';
  activeId = id;
  maps[activeId].setPos(oldPos);
  document.querySelector('#navbar-top').className = id;
}
