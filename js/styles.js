var styleUrls = {
  'positron': 'https://openmaptiles.github.io/positron-gl-style/style-cdn.json',
  'dark-matter': 'https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json',
  'osm-bright': 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
  'klokantech-basic': 'https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json',
  'fiord-color': 'https://openmaptiles.github.io/fiord-color-gl-style/style-cdn.json',
  'toner': 'https://openmaptiles.github.io/toner-gl-style/style-cdn.json'
};
var maps = {};
var mapContainers = document.getElementsByClassName('map-style');
for (var i = 0; i < mapContainers.length; ++i) {
  var elem = mapContainers[i];
  var mapId = elem.id;
  var styleUrl = styleUrls[mapId];
  maps[mapId] = new mapboxgl.Map({
      container: mapId,
      style: styleUrl,
      center: [8.5456, 47.3739],
      zoom: 10
  });
  maps[mapId].addControl(new mapboxgl.NavigationControl());
}
