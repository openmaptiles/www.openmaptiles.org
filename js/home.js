var center = [
  [-122.445600, 37.789508, 13],
  [-73.997291, 40.725438, 13],
  [2.294433, 48.858288, 14.5],
  [8.541147, 47.376333, 12]
];

var rnd = Math.floor(Math.random()*4);

function initMap(container, style) {
  return new mapboxgl.Map({
    attributionControl: false,
    container: container,
    style: style,
    center: [center[rnd][0], center[rnd][1]],
    zoom: center[rnd][2]
  });
}

var maps = {
  'klokantech-basic': initMap('map-klokantech-basic', 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json'),
  'dark-matter': initMap('map-dark-matter', 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json'),
  'positron': initMap('map-positron', 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json'),
  'bright': initMap('map-bright', 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json')
};

function getPos(map) {
  return [map.getCenter().lng, map.getCenter().lat, map.getZoom()]
}

function setPos(map, pos) {
  map.setCenter([pos[0], pos[1]])
  map.setZoom(pos[2])
}

var activeId = 'klokantech-basic';
function switchMap(id) {
  var oldPos = getPos(maps[activeId]);
  var active = document.querySelector('.map.active');
  if (active) {
    active.className = 'map';
  }
  var newActive = document.getElementById('map-' + id);
  newActive.className = 'map active';
  activeId = id;
  setPos(maps[activeId], oldPos);
  document.querySelector('#navbar-top').className = id;
}

document.getElementById('phone').addEventListener('click', function () {
  if (this.className == 'open') {
    this.className = '';
  } else {
    this.className = 'open';
  }
});
