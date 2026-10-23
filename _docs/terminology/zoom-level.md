---
layout: docs
category: terminology
title: Zoom level
description: A zoom level is one step in the tile pyramid, defining the geographic scale and detail represented by a single map tile.
---

A **zoom level** is one step in the tile pyramid. It defines the geographic area a single tile covers and serves as the first parameter in a `{z}/{x}/{y}` tile URL.

Zoom 0 consists of a single tile covering the entire world. Each subsequent zoom level splits every tile into four, resulting in a grid that is 2<sup>z</sup> tiles wide by 2<sup>z</sup> tiles tall, quadrupling the total tile count at each step.

| Zoom | Grid | Tiles in total | Roughly what fits in one tile |
| --- | --- | --- | --- |
| 0 | 1 × 1 | 1 | The whole world |
| 4 | 16 × 16 | 256 | Continent or a large country |
| 8 | 256 × 256 | 65,536 | A region |
| 12 | 4,096 × 4,096 | about 16.8 million | A town |
| 14 | 16,384 × 16,384 | about 268 million | A neighborhood |

See the detailed table of resolutions on [MapTiler documentation page](https://docs.maptiler.com/guides/how-maps-work/map-resolution/).

Because tile counts scale exponentially, tileset generation typically caps at a specific maximum zoom level. Each additional level quadruples storage requirements, making planet-wide generation beyond zoom level 14 impractical for details that are rarely requested at full global scale.

## Zoom and scale

A low zoom level is a small number: you look at the Earth from far away and see a large area with little detail. A high zoom level is a large number: you look from close up and see a small area in great detail. In cartographic terms, a high zoom level corresponds to a large map scale such as 1 : 1,000, where you can see single houses, and a low zoom level to a small map scale such as 1 : 10,000,000, where a whole country fits on the screen.

Most web maps use the Web Mercator projection, which creates a fixed relationship between zoom level and ground resolution. With the classic 256×256-pixel tiles, zoom 0 provides a resolution of roughly 156 km per pixel at the equator, halving with each zoom level (approximately 611 m per pixel at zoom 8, and 2.4 m per pixel at zoom 16). MapLibre GL and MapTiler use 512×512-pixel tiles, which show one level more detail, so each of these values applies one zoom level lower.

Moving away from the equator, ground distance per pixel decreases proportionally with the cosine of the latitude: the same projection distortion that exaggerates landmass sizes at high latitudes.

## Zoom in a tileset and in a style

The term refers to two distinct concepts depending on the context:

In a **tileset**, the zoom range specifies the levels at which tiles are physically generated. OpenMapTiles generates tiles from zoom 0 to 14. Beyond zoom 14, client renderers scale up (overzoom) the vector geometry from the highest-detail tile, keeping the map sharp up to zoom 18 or higher without additional tile downloads.

In a **style**, [minzoom](/docs/terminology/minzoom/) and [maxzoom](/docs/terminology/maxzoom/) on a [style layer](/docs/terminology/style-layer/) define the visibility range for specific map elements. This allows major features like highways to appear at low zoom levels, while detailed elements like residential streets or house numbers only render at high zoom levels. The style controls when data in the tile is displayed, but the schema decides from which zoom level each feature is in the tile at all.

Most modern renderers also support fractional zoom levels for smooth pinch-to-zoom transitions. Tile requests are always rounded to integer zoom levels, while the rendering engine smoothly interpolates geometry scale between steps.

## Related resources

- [minzoom](/docs/terminology/minzoom/)
- [maxzoom](/docs/terminology/maxzoom/)
- [Vector tile schema](/docs/schema/)
