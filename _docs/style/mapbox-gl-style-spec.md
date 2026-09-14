---
layout: docs
category: style
order: 3
title: Style map with Mapbox GL
description: Style vector tiles map in browser using the Mapbox GL.
---

## Styles

Styles are written in a JSON format called the [Mapbox GL Style Spec](https://www.mapbox.com/mapbox-gl-style-spec/).

## Using OpenMapTiles with MapLibre GL

Mapbox GL also offers a JavaScript library to display vector maps on a website. However, with the release of version 2.x
it is no longer free to use. We recommend using the open-source fork [MapLibre GL](https://www.maplibre.org).

To display maps with MapLibre GL you need:

1. Style: A JSON style specification that describes what your map looks like
2. Data: Vector Tiles as the data source for your style

OpenMapTiles provides both vector tiles you can download and ready-made styles to use together with them. Check out how to [display a map with MapLibre GL JS](/docs/website/maplibre-gl-js/).

### Data Source

To make your style work with OpenMapTiles vector tiles, you need to point the [data source](https://www.mapbox.com/mapbox-gl-style-spec/#sources) to a tile server.

The easiest way is to point the URL to a TileJSON endpoint (as provided by TileServer GL).

```json
"openmaptiles": {
  "type": "vector",
  "url": "http://openmaptiles.org/tilejson.json"
}
```

### Sprites

Your style also requires [image sprites](https://www.mapbox.com/mapbox-gl-style-spec/#sprite) used for patterns and icons.

```json
"sprite": "http://openmaptiles.org/sprites/"
```

In order to create your own sprites and self-host them via HTTP, you need to use the [spritezero-cli](https://github.com/mapbox/spritezero-cli).

```bash
npm install -g spritezero-cli
```

### Fonts

[Font glyphs](https://www.mapbox.com/mapbox-gl-style-spec/#glyphs) in Mapbox GL are packaged as [signed distance fields](https://blog.mapbox.com/drawing-text-with-signed-distance-fields-in-mapbox-gl-b0933af6f817).

To prepare your own fonts we recommend using [genfontgl](https://github.com/sabas/genfontgl), which packages your TTF fonts.

If you prefer pure open source, we have already prepared a few common fonts for you in [openmaptiles/fonts](https://github.com/openmaptiles/fonts). In order to use the prepared fonts hosted via GitHub Pages, change the glyphs endpoint to `http://fonts.openmaptiles.org/{fontstack}/{range}.pbf`.

```json
"glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
```
