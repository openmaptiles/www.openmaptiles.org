---
---
var maps = {};
var domain = '{{ site.maps.domain }}';
var key = '{{ site.maps.key }}';
var styleUrls = {
  'positron': domain + '/styles/positron/style.json?key=' + key,
  'dark-matter': domain + '/styles/darkmatter/style.json?key=' + key,
  'osm-bright': domain + '/styles/bright/style.json?key=' + key,
  'osm-liberty': 'https://rawgit.com/lukasmartinelli/osm-liberty/gh-pages/style.json',
  'klokantech-basic': domain + '/styles/basic/style.json?key=' + key,
  'klokantech-3d': 'https://openmaptiles.github.io/klokantech-3d-gl-style/style-cdn.json',
  'klokantech-terrain': 'https://openmaptiles.github.io/klokantech-terrain-gl-style/style-cdn.json',
  'fiord-color': 'https://openmaptiles.github.io/fiord-color-gl-style/style-cdn.json',
  'toner': 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
};
var mapContainers = document.getElementsByClassName('map-style');

for (var i = 0; i < mapContainers.length; ++i) {
  var elem = mapContainers[i];
  var mapId = elem.id;
  var styleUrl = styleUrls[mapId];

  var zoom = 10;
  var center = [8.5456, 47.3739];
  var bearing = 0;
  var pitch = 0;

  if(mapId == 'toner' || mapId == 'osm-liberty') {
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
      bearing: bearing
  });
  maps[mapId].addControl(new mapboxgl.NavigationControl());

  if(mapId !== 'osm-liberty') {
    maps[mapId].addControl(new MapboxInspect());
  }
}
