---
layout: docs
category: what-is
title: Layer style
description: A layer style is the block inside a map style that decides how one layer of map data is drawn.
---

A **layer style** is a single entry in the `layers` array of a [style JSON](/docs/what-is/style-json/). It takes one slice of the [vector data](/docs/what-is/vector-data/) and says how to paint it. A map is built by stacking dozens of these, each responsible for one thing.

## What a layer style contains

| Property | Purpose |
| --- | --- |
| `id` | A unique name for this layer within the style |
| `type` | How to draw it: `fill`, `line`, `symbol`, `circle`, `raster`, `background` |
| `source` | Which declared source to read from |
| `source-layer` | Which layer inside the tiles to read, for vector sources |
| `filter` | An expression selecting which features to include |
| `minzoom`, [`maxzoom`](/docs/what-is/maxzoom/) | The zoom range in which the layer is drawn |
| `layout` | Properties applied when the geometry is laid out |
| `paint` | Properties applied when it is painted |

## Layout and paint

The split between `layout` and `paint` is about cost, not style. Layout properties, such as the icon a symbol uses or how a line joins, affect how geometry is prepared, so changing one forces the renderer to redo that work. Paint properties, such as color and opacity, are applied at draw time and can be changed cheaply, including with an animation.

One source layer usually feeds several layer styles. Roads often need a wide dark line drawn first and a narrower light line on top to produce a casing, which is two layer styles reading the same data.

## Related resources

- [Mapbox GL Style Spec](/docs/style/mapbox-gl-style-spec/)
- [Style your map with Maputnik](/docs/style/maputnik/)
- [Vector tile schema](/docs/schema/)
