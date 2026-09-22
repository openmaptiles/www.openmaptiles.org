---
layout: docs
category: terminology
title: maxzoom
description: maxzoom is the highest zoom level for which a tile source actually contains tiles, or the level at which a style layer stops drawing.
---

**maxzoom** is the highest zoom level a tileset was generated for. It appears in tileset metadata, in a [style JSON](/docs/terminology/style-json/)'s source declaration, and on individual style layers, and it means something slightly different in each place.

## maxzoom on a source

On a source, `maxzoom` states the deepest level at which real tiles exist. For most OpenMapTiles tilesets that is 14.

This does not mean the map stops at zoom 14. Past the source maxzoom the renderer keeps using the last real tile and scales it up, which is called overzooming. With vector tiles the result still looks sharp, because the geometry is scaled rather than the pixels, so zoom 18 draws crisp roads from zoom 14 data.

Generating tiles beyond 14 is worth it only in specific cases, such as indoor or cadastral data whose fine detail cannot be recovered by overzooming. The number of tiles quadruples at every level, and [vector data](/docs/terminology/vector-data/) overzooms well enough that the extra storage usually buys very little.

## minzoom and maxzoom on a layer

On a [layer style](/docs/terminology/layer-style/) the pair sets the zoom range in which that layer is drawn. This is how a style shows motorways at low zoom and adds residential streets only when you get close, and how label density is kept under control.

The two uses interact: a layer with a `maxzoom` of 12 stops drawing at 12 regardless of how deep the source goes.

## Related resources

- [Vector tile schema](/docs/schema/)
- [Mapbox GL Style Spec](/docs/style/mapbox-gl-style-spec/)
