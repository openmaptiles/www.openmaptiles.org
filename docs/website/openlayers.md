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
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.0/css/ol.css">
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
  <script>var apiKey = '{{ site.maps.key }}'</script>
  <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=fetch,Promise"></script>
  <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v5.3.0/build/ol.js"></script>
  <script src="https://unpkg.com/ol-mapbox-style@3.6.2/dist/olms.js"></script>
  <script src="ol.js"></script>
</body>
```

#### ol.js

The code below uses [ol-mapbox-style](https://npmjs.com/package/ol-mapbox-style) to fetch the GL style and turn it into an OpenLayers map. Once the map is configured, the promise of the `olms` function resolves, and any desired manipulations can be performed on the map.

In the following code, you have to replace “insert_your_key_here” with a key from hosting. You can get a free key at [www.maptiler.com/cloud/](https://www.maptiler.com/cloud/).

```javascript
var apiKey = 'insert_your_key_here';

olms('map', 'https://maps.tilehosting.com/styles/basic/style.json?key=' + apiKey).then(function(map) {
  // do anything with the passed `ol.Map` instance here.
});

```
