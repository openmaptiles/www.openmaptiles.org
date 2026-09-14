---
layout: docs
category: website
title: OpenLayers
description: Display maps on a web using the OpenLayers JavaScript library.
order: 4
---

There are two ways to display OpenMapTiles with the [OpenLayers](http://openlayers.org/) library: using raster or vector tiles.

## Raster tiles from server

OpenLayers doesn't support vector tiles by default. Raster tiles can be generated on demand for any of the [GL styles](/#map-styles) with the open-source server software called [TileServer GL](/docs/host/tileserver-gl/). Such raster tiles can be displayed using [ol.source.XYZ](http://openlayers.org/en/latest/examples/xyz.html) source.

## Vector tiles with a plugin

Vector tiles can be displayed in OpenLayers using the [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) plugin together with OpenMapTiles. Read the following guide or check out the code [here](https://github.com/openmaptiles/www.openmaptiles.org/tree/master/maps).

<iframe class="doc-embed" src="/maps/ol.html?key={{ site.maps.key }}" frameborder="0" scrolling="0" width="100%" height="540px"></iframe>

## Convert Mapbox GL style to OpenLayers style functions

The [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) converts the original Mapbox GL style specification into OpenLayers style functions. This extension enables you to design maps for vector tiles using the existing tools and then switch to a different renderer.

### index.html

Create an HTML page and include OpenLayers with the standalone build of [ol-mapbox-style](https://github.com/boundlessgeo/ol-mapbox-style) `omls.js`. Since OpenLayers draws on the browser canvas, you also need to include the fonts used in the style on the page.

```html
<!DOCTYPE html>
<html>
<head>
  <title>OpenMapTiles with OpenLayers preview</title>
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@10.10.0/ol.css">
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
  <script>var apiKey = 'insert_your_key_here'</script>
  <script src="https://cdn.jsdelivr.net/npm/ol@10.10.0/dist/ol.js"></script>
  <script src="https://unpkg.com/ol-mapbox-style@13.4.3/dist/olms.js"></script>
  <script src="ol.js"></script>
</body>
```

Replace “insert_your_key_here” with your API key in the code above. Get a free key at [www.maptiler.com/cloud/](https://www.maptiler.com/cloud/).

### ol.js

The code below uses [ol-mapbox-style](https://www.npmjs.com/package/ol-mapbox-style) to fetch the GL style and turn it into an OpenLayers map. Once the map is configured, the promise of the `olms` function resolves, and any desired manipulations can be performed on the map.

```javascript
olms.apply('map', '{{ site.maps.domain }}/maps/openstreetmap/style.json?key=' + apiKey).then(function(map) {
  // The style's own default zoom sits below the minzoom of the label layers,
  // so open one step in. Do anything else with the passed `ol.Map` here.
  map.getView().setZoom(2);
});
```

## More examples

Take a look at the compilation of [OpenLayers examples](https://docs.maptiler.com/openlayers/examples/) to explore the potential of incorporating OpenMapTiles maps into your OpenLayers projects. Discover techniques for displaying data from GeoJSON on the map, generating a Choropleth map, showcasing a marker, and much more. Check out these examples to unlock the full capabilities of OpenLayers regarding map visualization and data representation.
