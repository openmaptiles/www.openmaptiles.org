---
layout: docs
category: website
title: Leaflet
description: Leaflet
keywords: Leaflet VectorGrid
order: 4
---

[Leaflet](http://www.leafletjs.com) is a lightweight open-source library for online maps. If you haven't worked with Leaflet before, take a look at its [tutorials](http://leafletjs.com/examples.html).

There are three ways how to use OpenMapTiles as a map layer in Leaflet:
* raster tiles from server
* vector tiles with [mapbox-gl-leaflet](https://github.com/mapbox/mapbox-gl-leaflet) plugin
* vector tiles with [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) plugin

### Raster tiles from server

Leaflet doesn't support vector tiles by default. For basemaps, it is recommended to use it with traditional raster tiles (Mercator XYZ). Such tiles can be generated on demand for any of the [GL styles](/styles/) with the open-source server software called [TileServer GL](/docs/host/tileserver-gl/).

A preview of the Leaflet viewer showing the raster tiles is available at [viewers](https://openmaptiles.org/viewers/) example page.


### Vector tiles with a mapbox-gl-leaflet plugin

Leaflet can also load and render the vector tiles directly - with the help of the [mapbox-gl-leaflet](https://github.com/mapbox/mapbox-gl-leaflet) plugin.

The plugin is experimental and it is not actively supported by Mapbox.

<iframe src="/maps/leaflet-mapbox-gl.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>


#### Load Leaflet and mapbox-gl-leaflet

Paste this code in the `<head>` section of your HTML page:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
  <link href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.35.1/mapbox-gl.css" rel='stylesheet' />
  <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.35.1/mapbox-gl.js"></script>
  <script src="/js/leaflet-mapbox-gl.js"></script>
</head>
```

Always check which versions of Leaflet, mapbox-gl and mapbox-gl-js you are using, because there might be a newer version.

#### Create your VectorGrid

Create an instance of `L.mapboxGL` like this:

```js
var map = L.map('map');
map.options.minZoom = 2;
var gl = L.mapboxGL({
    accessToken: '{token}',
    style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json'
}).addTo(map);
map.fitWorld();
```

Notice the `style` property that points to a [GL style](/styles/) that you have chosen for the map. The style contains path to OpanMapTiles data as well as its visualization. If you are not using data from Mapbox hosting, the `accessToken` property can be set to any string.

### Vector tiles with a VectorGrid plugin

Leaflet has also the ability to load and render the vector tiles directly - with the help of the [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid) plugin.

The plugin is not yet ready for drawing the basemaps with fonts etc but is very practical for other applications.

<iframe src="/maps/leaflet-vectorgrid.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>

#### Load Leaflet and VectorGrid

Paste this code in the `<head>` section of your HTML page:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.0.3/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.vectorgrid@1.2.0"></script>
</head>
```

Always check which versions of Leaflet and VectorGrid you are using, because there might be a newer version.

#### Define a style

VectorGrid cannot handle vector tile GL styles (yet), therefore first you have to define the styling for all the data layers with the [Leaflet specific styling code](http://leafletjs.com/reference-1.0.3.html#path):

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

If you have worked with Leaflet before, you'll notice that those options are the same as the ones used for `L.Polyline`s and `L.Polygon`s.

That is a very basic styling for the data. Check [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid)'s documentation for more info about how to apply more complex styles.

#### Create your VectorGrid

Once your style is ready, create an instance of `L.VectorGrid.Protobuf` like this:

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
