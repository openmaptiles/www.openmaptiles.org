---
layout: docs
category: terminology
title: minzoom
description: minzoom is the lowest zoom level at which a tileset holds tiles or a style layer is drawn.
---

**minzoom** defines the lowest [zoom level](/docs/terminology/zoom-level/) defines the lowest zoom level at which data or layers are displayed. Like [maxzoom](/docs/terminology/maxzoom/), it appears in both tileset metadata (sources) and style layers, but serves a distinct purpose in each context.

## minzoom on a source

On a source, `minzoom` states the lowest level at which map tiles were generated. For OpenMapTiles, it is 0, where the entire world is a single tile.

Unlike maxzoom, minzoom does not support fallback rendering. Beyond maxzoom, a renderer overzooms (scales up) the highest-detail tile to keep the map functional. Below minzoom, no lower-detail parent tiles exist to scale, leaving the area blank.

This behavior often affects partial regional extracts. If a tileset begins at zoom 6, zooming out to zoom 5 renders a blank screen. Map styles handle this by layering a global tileset underneath or setting a minimum zoom limit on the map view.

## minzoom and maxzoom on a layer

On a [style layer](/docs/terminology/layer-style/), the pair sets the zoom range in which that layer is drawn. `minzoom` is the level at which the layer first appears and `maxzoom` the level after which it stops rendering.

This is the main tool for controlling how much a map shows at once. Highways use a low minzoom to stay visible at low zoom levels, whereas residential streets and house numbers use a high minzoom to avoid cluttering the view. The source data remains in the tile regardless; the style simply toggles its visibility.

A layer's range is bounded by its source. A layer with a `minzoom` of 2 draws nothing at zoom 2 if the source has no tiles that shallow.

## Related resources

- [maxzoom](/docs/terminology/maxzoom/)
- [Zoom level](/docs/terminology/zoom-level/)
- [Layer style](/docs/terminology/layer-style/)
- [Mapbox GL style specification](/docs/style/mapbox-gl-style-spec/)
