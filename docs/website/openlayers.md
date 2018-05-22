---
layout: docs
category: website
title: OpenLayers
description: OpenLayers
keywords: Openlayers
order: 2
---

There are two ways how to display OpenMapTiles with [OpenLayers](http://openlayers.org/) library: using raster or vector tiles.

### Raster tiles from server

OpenLayers doesn't support vector tiles by default. Raster tiles can be generated on demand for any of the [GL styles](/styles/) with the open-source server software called [TileServer GL](/docs/host/tileserver-gl/). Such raster tiles can be displayed using [ol.source.XYZ](http://openlayers.org/en/latest/examples/xyz.html) source.


### Vector tiles with a plugin

Vector tiles can be displayed in OpenLayers using the [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) plugin together with OpenMapTiles. Read the following guideline or check out the code [here](https://github.com/openmaptiles/www.openmaptiles.org/tree/master/maps).

<iframe src="/maps/ol.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>

#### Convert Mapbox GL style to OpenLayers style functions

The [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) converts the original Mapbox GL style specification into OpenLayers style functions. This extension enables you to design maps for vector tiles using the existing tools and then switch to a different renderer.

#### index.html

Create an HTML page and include OpenLayers with the standalone build of [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) `omls.js`. Since OpenLayers draws on the browser canvas, you also need to include the fonts used in the style in the page.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Klokantech Basic GL Style using ol-mapbox-style preview</title>
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ol3/4.3.1/ol.css">
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ol3/4.3.1/ol.js"></script>
  <script src="olms.js"></script>
  <script src="ol.js"></script>
</body>
```

#### ol.js

Create a new MVT source (`url` of `ol.source.VectorTile`) which points to the CDN of OpenMapTiles or to your own TileServer.

The code below fetches the GL style specification (`fetch` function) and turn it into OpenLayers functions which can be applied to the vector tile layer.

In the following code, you have to replace “insert_your_key_here” with a key from hosting. You can get a free key at [www.maptiler.com/cloud/](https://www.maptiler.com/cloud/).

```javascript
var apiKey = 'insert_your_key_here';

var tilegrid = ol.tilegrid.createXYZ({tileSize: 512, maxZoom: 14});
var layer = new ol.layer.VectorTile({
  source: new ol.source.VectorTile({
    attributions: '© <a href="https://openmaptiles.org/">OpenMapTiles</a> ' +
      '© <a href="http://www.openstreetmap.org/copyright">' +
      'OpenStreetMap contributors</a>',
    format: new ol.format.MVT(),
    tileGrid: tilegrid,
    tilePixelRatio: 8,
    url: 'https://free-0.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=' + apiKey
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
