---
layout: docs
category: website
title: Leaflet
description: Leaflet
keywords: Leaflet VectorGrid
---

[Leaflet](http://www.leafletjs.org) is a lightweight web mapping library. It doesn't
support vector tiles by default, but the [VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid)
plugin allows to load them.

If you haven't worked with Leaflet before, have a look at its [tutorials](http://leafletjs.com/examples.html).

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

VectorGrid cannot (yet) handle vector tile styles, so first you'll have to define the
styling for all the data layers:

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

