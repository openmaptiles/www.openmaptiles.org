---
layout: docs
category: what-is
title: LineString
description: A LineString is a geometry type made of an ordered list of coordinates that join up into a connected line.
---

A **LineString** is a geometry made of two or more positions joined in order. It is how [vector data](/docs/what-is/vector-data/) represents anything linear: a road, a river, a railway, a contour, a route.

The order of the coordinates is part of the data, not an implementation detail. It sets the direction of the line, which matters for one-way streets, for the direction a river flows, and for deciding which side of a road a label or a casing belongs on.

A LineString is one continuous line. A road that splits into separate roadways, or a river that disappears under a tunnel and comes back, needs more than one line to describe it, and those lines are carried together as a single feature.

## LineStrings in vector tiles

Most of the linear data in an OpenMapTiles tileset is in the `transportation` and `waterway` layers, with the names carried separately in `transportation_name`.

The `transportation_name` layer is where multi-part lines show up most obviously: road segments that share a name are stitched together, so a label can be placed along the whole road instead of on each small piece.

OpenMapTiles has no MultiLineString type, which is worth knowing if you come from a GIS background (namely if you are familiar with GeoJSON or PostGIS terminilogy). The [MVT specification](https://github.com/mapbox/vector-tile-spec/blob/master/2.1/README.md) defines only Point, LineString, and Polygon, and a multi-part line is an ordinary LineString feature that happens to contain more than one line.

Because tiles are cut into a grid, a line crossing a tile boundary is clipped and appears in both tiles. This is normal and the renderer joins them visually, but it is worth knowing if you are counting features or measuring lengths from tile data rather than from the source database.

## Related resources

- [Vector tile schema](/docs/schema/)
- [Custom vector tiles from GeoJSON and Shapefile](/docs/generate/custom-vector-from-shapefile-geojson/)
