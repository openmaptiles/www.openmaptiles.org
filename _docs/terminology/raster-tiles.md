---
layout: docs
category: terminology
title: Raster tiles
description: Raster tiles are pre-rendered map images cut into a fixed grid and addressed by zoom level, column and row.
---

**Raster tiles** are map images that have already been drawn. The map is rendered ahead of time, cut into a grid of small images, and served by [zoom level](/docs/terminology/zoom-level/), column, and row. All the [map rendering](/docs/terminology/map-rendering/) happened in advance, so the client just places the images next to each other.

Tiles are usually 256x256 or 512x512 pixels, in PNG, JPEG, or WebP. Zoom 0 is one tile for the whole world, and each level splits every tile into four, so zoom 1 has 4 tiles, zoom 2 has 16, and so on.

## Raster tiles and vector tiles

[Vector tiles](/docs/terminology/vector-tiles/) carry [vector data](/docs/terminology/vector-data/), and the client draws the map. Raster tiles carry the finished picture. The trade is straightforward:

- **Raster tiles** work everywhere, including old browsers, print workflows, and desktop GIS, and need no rendering power on the client. The look is fixed at generation time, and changing it means re-rendering.
- **Vector tiles** can be restyled instantly, relabeled in another language, and rotated or tilted, but need a renderer capable of drawing them.

## Generating raster tiles

Raster tiles are normally rendered from vector tiles plus a [style JSON](/docs/terminology/style-json/). That means the same tileset can serve a modern web map directly and also feed a [WMTS](/docs/terminology/wmts/) endpoint for the GIS clients that need images.

## Related resources

- [Vector tiles](/docs/terminology/vector-tiles/)
- [Ready-to-use raster tiles API](/docs/raster/maptiler-cloud/)
- [Raster tiles from TileServer GL](/docs/raster/tileserver-gl/)
- [Custom raster layer](/docs/raster/custom-raster/)
