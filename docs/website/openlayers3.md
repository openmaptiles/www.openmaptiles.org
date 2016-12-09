---
layout: docs
category: website
title: Openlayers3
description: Openlayers3
keywords: Openlayers3
---

You can check out an example style we made for OpenLayers 3 using [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) extension.

### index.html
Notice linked fonts used in the style and `omls.js` that is compiled ol-mapbox-style package.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Klokantech Basic GL Style using ol-mapbox-style preview</title>
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.19.1/ol.css">
  <style>
    html, body {
      height: 100%;
      margin: 0;
    }
    #map {
      width: 100%;
      height: 100%;
      background-color: #f8f4f0;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Promise"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ol3/3.19.1/ol.js"></script>
  <script src="olms.js"></script>
  <script src="ol3.js"></script>
</body>
```

### ol3.js
Notice link to the tileset (`url` of `ol.source.VectorTile`) and link to style as a parameter of `fetch` function.


```js
var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 22});

var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>',
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'https://osm2vectortiles-0.tileserver.com/v3/{z}/{x}/{y}.pbf'
  })
});

var view = new ol.View({
  center: [732602.1417165294, 5864590.06411005],
  resolution: 2445,
  maxResolution: 78271.51696402048
});

var map = new ol.Map({
  target: 'map',
  view: view
});

fetch('https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json').then(function(response) {
  response.json().then(function(glStyle) {
    olms.applyStyle(layer, glStyle, 'openmaptiles').then(function() {
      map.addLayer(layer);
    });
  });
});
```


### Example

<iframe src="/maps/ol3.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>
