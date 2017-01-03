function initMap(container, style) {
  return new mapboxgl.Map({
    attributionControl: false,
    container: container,
    style: style,
    zoom: 2
  });
}

var maps = {
  'fiord': initMap('map-fiord', 'https://openmaptiles.github.io/fiord-color-gl-style/style-cdn.json'),
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

var activeId = 'fiord';
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
