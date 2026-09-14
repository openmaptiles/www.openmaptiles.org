// The style's own default zoom (0.74) sits below the minzoom of the country
// label layers, so the preview opens at zoom 2 where labels are present.
olms.apply('map', 'https://api.maptiler.com/maps/openstreetmap/style.json?key=' + apiKey).then(function (map) {
  map.getView().setZoom(2);
});
