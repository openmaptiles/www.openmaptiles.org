---
---
var center = [
  [-122.445600, 37.789508, 13],
  [-73.997291, 40.725438, 13],
  [2.294433, 48.858288, 14.5],
  [8.541147, 47.376333, 12]
][Math.floor(Math.random() * 4)];

var domain = '{{ site.maps.domain }}';
var key = '{{ site.maps.key }}';

if (mapboxgl.supported()) {
  var maps = {
    'klokantech-basic': domain + '/styles/basic/style.json?key=' + key,
    'dark-matter': domain + '/styles/darkmatter/style.json?key=' + key,
    'positron': domain + '/styles/positron/style.json?key=' + key,
    'bright': domain + '/styles/bright/style.json?key=' + key
  };

  var activeId = 'klokantech-basic';
  var map = new mapboxgl.Map({
    attributionControl: false,
    container: 'map',
    style: maps[activeId],
    center: [center[0], center[1]],
    zoom: center[2]
  });

  var mapEl = document.getElementById('map');
  function switchMap(id) {
    mapEl.className = 'map';
    setTimeout(function() {
      activeId = id;
      map.setStyle(maps[activeId]);
      document.querySelector('#navbar-top').className = id;
      setTimeout(function() {
        mapEl.className = 'map active';
      }, 500);
    }, 400);
  }
} else {
  L.mapbox.map(
    'map',
    domain + '/styles/basic.json?key=' + key,
    {
      attributionControl: false
    }).setView([center[1], center[0]], center[2] + 1);
  document.querySelector('.map-switchers').style.display = 'none';
}

document.getElementById('phone').addEventListener('click', function () {
  if (this.className == 'open') {
    this.className = '';
  } else {
    this.className = 'open';
  }
});
