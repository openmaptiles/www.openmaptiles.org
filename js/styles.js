var styleUrls = {
  'positron': 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
  'dark-matter': 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json',
  'osm-bright': 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
  'osm-liberty': 'https://rawgit.com/lukasmartinelli/osm-liberty/gh-pages/style.json',
  'klokantech-basic': 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json',
  'klokantech-3d': 'https://openmaptiles.github.io/klokantech-3d-gl-style/style-cdn.json',
  'klokantech-terrain': 'https://openmaptiles.github.io/klokantech-terrain-gl-style/style-cdn.json',
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
  var minZoom = 0;

  if (mapId == 'osm-liberty') {
    minZoom = 6; // Natural Earth tiles, which are used for z0-z5, aren't served over HTTPS, so zoom is limited to z6+
    zoom = 15.6;
    center = [8.5405, 47.3672];
  }
  if(mapId == 'toner') {
    zoom = 2;
  }
  if(mapId == 'klokantech-3d') {
    center = [-74.0104, 40.7072]
    zoom = 14.47;
    pitch = 56;
    bearing = 16;
  }
  if(mapId == 'klokantech-terrain') {
    center = [8.7211, 46.7737]
    zoom = 12.14;
  }
  maps[mapId] = new mapboxgl.Map({
      container: mapId,
      style: styleUrl,
      center: center,
      zoom: zoom,
      pitch: pitch,
      bearing: bearing,
      minZoom: minZoom
  });
  maps[mapId].addControl(new mapboxgl.NavigationControl());

  if(mapId !== 'osm-liberty') {
    maps[mapId].addControl(new MapboxInspect());
  }
}
