---
layout: docs
category: terminology
title: Vector data
description: Vector data describes geographic features as points, lines and polygons with coordinates and attributes, rather than as a grid of pixels.
---

**Vector data** describes the world as shapes with coordinates. A road is a [LineString](/docs/terminology/linestring/), a lake is a polygon, a bench is a point, and each shape carries attributes such as a name, a type, or a height.

The alternative is raster data, which stores a grid of pixels and reaches a map as [raster tiles](/docs/terminology/raster-tiles/). A satellite image or a scanned map is raster: it has a fixed resolution, and zooming past that resolution just makes the pixels bigger. Vector data has no pixels, so the same geometry can be drawn at any scale and stays sharp, although it can never show more detail than was captured in the data.

## Why vector data suits web maps

Because the shapes and their attributes arrive separately from any styling decision, the client can decide at draw time what to do with them. That is what makes it possible to restyle a map, switch label languages, or filter features without fetching new data from the server.

It also keeps the payload small. A tile carrying geometry and attributes is usually far smaller than the same area rendered as an image, and it can be reused for several different looks.

## Vector sources in a style

In a [style JSON](/docs/terminology/style-json/), a **vector source** is the declaration that points at a tileset. It gives the renderer the tile URL template and the zoom range, and each [style layer](/docs/terminology/style-layer/) then names the source it draws from, plus which layer inside the tiles to read.

Separating the source from the layers is what lets one tileset feed many layers in the same style. The water polygons and the water labels can be two different style layers reading the same source.

## Related resources

- [Vector tiles](/docs/terminology/vector-tiles/)
- [GeoJSON](/docs/terminology/geojson/)
- [Shapefile](/docs/terminology/shapefile/)
- [Vector tile schema](/docs/schema/)
