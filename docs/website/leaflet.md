---
layout: docs
category: website
title: Leaflet
description: Leaflet
keywords: Leaflet VectorGrid
order: 4
---

[Leaflet](http://www.leafletjs.org) is a lightweight web mapping library.

If you haven't worked with Leaflet before, have a look at its [tutorials](http://leafletjs.com/examples.html).

### Raster tiles from server

Leaflet doesn't support vector tiles by default. For basemaps it is recommended to use it with traditional raster tiles (Mercator XYZ). Such tiles can be geneated on demand for any of the [GL styles](/styles/) with the open-source server software called [TileServer GL](/docs/host/tileserver-gl/).

A preview of the Leaflet viewer showing the raster tiles is visible at [viewers](https://openmaptiles.org/viewers/) example:


### Vector tiles with a plugin

Leaflet can load and render the vector tiles also directly - with the help of the [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) plugin.

The plugin is not yet ready for drawing the basemaps with fonts etc, but is very practical for other applications.

<iframe src="/maps/leaflet-vectorgrid.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>

### Load Leaflet and VectorGrid

Put this in the `<head>` of your HTML page:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.vectorgrid@1.2.0"></script>
</head>
```

Also notice which versions of Leaflet and VectorGrid you are loading, as there
might be newer releases.

### Define a style

VectorGrid cannot (yet) handle vector tile GL styles, so first you'll have to define the
styling for all the data layers with the [Leaflet specific styling code](http://leafletjs.com/reference-1.0.3.html#path):

```js
var vectorStyles = {
  water: {	// Apply these options to the "water" layer...
    fill: true,
    weight: 1,
    fillColor: '#06cccc',
    color: '#06cccc',
    fillOpacity: 0.2,
    opacity: 0.4,
  },
  transportation: {	// Apply these options to the "transportation" layer...
    weight: 0.5,
    color: '#f2b648',
    fillOpacity: 0.2,
    opacity: 0.4,
  },

  // And so on, until every layer in https://openmaptiles.org/schema/ has a style

  // aeroway:
  // boundary:
  // building:
  // housenumber:
  // landcover:
  // landuse:
  // park:
  // place:
  // poi:
  // transportation:
  // transportation_name:
  // water:
  // water_name:
  // waterway:
};
```

If you have worked with Leaflet before, you'll notice that those options are the same
that are used for `L.Polyline`s and `L.Polygon`s.

That is a very basic styling for the data. Consult [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid)'s
documentation for how to apply more complex styles.

### Create your VectorGrid

Once you have your style, create an instance of `L.VectorGrid.Protobuf` like this:

```js
var openMapTilesUrl = "https://free-{s}.tilehosting.com/data/v3/{z}/{x}/{y}.pbf.pict?key={key}"

var openMapTilesLayer = L.vectorGrid.protobuf(openMapTilesUrl, {
  vectorTileLayerStyles: vectorStyles,
  subdomains: '0123',
  attribution: '© OpenStreetMap contributors, © OpenMapTiles',
  key: 'abcdefghi01234567890' // Get yours at https://openmaptiles.com/hosting/
});
```

And add your layer to your Leaflet map:

```js
openMapTilesLayer.addTo(map);
```

