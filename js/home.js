var maps = {};

var mbgljsMap = new mapboxgl.Map({
  attributionControl: false,
  container: 'map-mbgljs',
  style: 'https://openmaptiles.github.io/fiord-color-gl-style/style-cdn.json',
  zoom: 2
});
maps['mbgljs'] = {
  getPos: function () {
    return [mbgljsMap.getCenter().lng, mbgljsMap.getCenter().lat, mbgljsMap.getZoom() + 1];
  },
  setPos: function (pos) {
    mbgljsMap.setCenter([pos[0], pos[1]]);
    mbgljsMap.setZoom(pos[2] - 1);
  }
};

var leafletMap = L.map('map-leaflet', {zoomControl: false, attributionControl: false}).setView([0, 0], 2);
L.tileLayer('https://klokantech-0.tilehosting.com/styles/streets/rendered/{z}/{x}/{y}.png?key=tXiQqN3lIgskyDErJCeY', {
  maxZoom: 18
}).addTo(leafletMap);

maps['leaflet'] = {
  getPos: function () {
    return [leafletMap.getCenter().lng, leafletMap.getCenter().lat, leafletMap.getZoom()];
  },
  setPos: function (pos) {
    leafletMap.setView([pos[1], pos[0]], pos[2], {animate: false});
  }
};

var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    format: new ol.format.MVT(),
    tileGrid: ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 14}),
    tilePixelRatio: 8,
    url: 'https://free-{0-3}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=tXiQqN3lIgskyDErJCeY'
  })
});
var viewOl3 = new ol.View({
  center: [0, 0],
  zoom: 0,
  minZoom: 0,
  maxZoom: 15
});
var mapOl3 = new ol.Map({
  target: 'map-ol3',
  controls: [],
  view: viewOl3
});

fetch('https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json').then(function (response) {
  response.json().then(function (glStyle) {
    olms.applyStyle(layer, glStyle, 'openmaptiles').then(function () {
      mapOl3.addLayer(layer);
    });
  });
});
maps['ol3'] = {
  getPos: function () {
    var center = ol.proj.toLonLat(viewOl3.getCenter());
    return [center[0], center[1], Math.log((Math.PI * 6378137 * 2 / 256) / viewOl3.getResolution()) / Math.LN2];
  },
  setPos: function (pos) {
    var center = ol.proj.fromLonLat(pos);
    viewOl3.setCenter(center);
    viewOl3.setResolution((Math.PI * 6378137 * 2 / 256) / Math.pow(2, pos[2]));
  }
};

var mapTangram = L.Mapzen.map('map-tangram', {
  zoomControl: false,
  attributionControl: false,
  scene: 'https://gist.githubusercontent.com/petrsloup/27ee74e2cdebc7ac72129da3a89a440f/raw/19385aae40b9d0ba0a6c0ef1c3afe87f2743d54d/gistfile1.txt'
});
mapTangram.setView([0, 0], 0);

maps['tangram'] = {
  getPos: function () {
    return [mapTangram.getCenter().lng, mapTangram.getCenter().lat, mapTangram.getZoom()];
  },
  setPos: function (pos) {
    mapTangram.setView([pos[1], pos[0]], pos[2], {animate: false});
  }
};


var activeId = 'mbgljs';
function switchMap(id) {
  var oldPos = maps[activeId].getPos();
  var active = document.querySelector('.map.active');
  if (active) {
    active.className = 'map';
  }
  var newActive = document.getElementById('map-' + id);
  newActive.className = 'map active';
  activeId = id;
  maps[activeId].setPos(oldPos);
  document.querySelector('#navbar-top').className = id;
}

document.getElementById('phone').addEventListener('click', function () {
  if (this.className == 'open') {
    this.className = '';
  } else {
    this.className = 'open';
  }
});
