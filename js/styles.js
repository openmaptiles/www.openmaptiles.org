var styleUrls = {
  'positron': 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
  'dark-matter': 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json',
  'osm-bright': 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
  'klokantech-basic': 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json',
  'klokantech-3d': 'https://openmaptiles.github.io/klokantech-3d-gl-style/style-cdn.json',
  'fiord-color': 'https://openmaptiles.github.io/fiord-color-gl-style/style-cdn.json',
  'toner': 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
};
var maps = {};
var mapContainers = document.getElementsByClassName('map-style');
for (var i = 0; i < mapContainers.length; ++i) {
  var elem = mapContainers[i];
  var mapId = elem.id;
  var styleUrl = styleUrls[mapId];

  var zoom = 10;
  var center = [8.5456, 47.3739];
  var bearing = 0;
  var pitch = 0;

  if(mapId == 'toner') {
    zoom = 2;
  }
  if(mapId == 'klokantech-3d') {
    center = [-74.0104, 40.7072]
    zoom = 14.47;
    pitch = 56;
    bearing = 16;
  }
  maps[mapId] = new mapboxgl.Map({
      container: mapId,
      style: styleUrl,
      center: center,
      zoom: zoom,
      pitch: pitch,
      bearing: bearing
  });
  maps[mapId].addControl(new mapboxgl.NavigationControl());
  maps[mapId].addControl(new MapboxInspector());
}
