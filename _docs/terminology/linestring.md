---
layout: docs
category: terminology
title: LineString
description: A LineString is a geometry type made of an ordered list of coordinates that join up into a connected line.
---

A **LineString** is a geometry made of two or more positions joined in order. It is how [vector data](/docs/terminology/vector-data/) represents anything linear: a road, a river, a railway, a contour, a route.

The order of the coordinates is part of the data, not an implementation detail. It sets the direction of the line, which matters for one-way streets, for the direction a river flows, and for deciding which side of a road a label or a casing belongs on.

A LineString is one continuous line. A road that splits into separate roadways, or a river that disappears under a tunnel and comes back, needs more than one line to describe it. Those lines can be stored as separate features or grouped into a single multi-part feature.

## LineStrings in vector tiles

Most of the linear data in an OpenMapTiles tileset is in the `transportation`, `waterway`, and `boundary` layers. Road names are carried separately in `transportation_name`, while waterway names stay on the `waterway` features.

The `transportation_name` layer is where multi-part lines show up most obviously: road segments that share a name are stitched together, so a label can be placed along the whole road instead of on each small piece.

The [MVT specification](https://github.com/mapbox/vector-tile-spec/blob/master/2.1/README.md) defines only three geometry types, Point, LineString, and Polygon, but each of them can hold more than one part. A multi-part line is stored as a single LineString feature with several parts, and when you decode it, for example into [GeoJSON](/docs/terminology/geojson/) or [PostGIS](/docs/terminology/postgis/), it becomes a MultiLineString. OpenMapTiles has multi-part lines in several layers, for example in `boundary` and `transportation_name`.

Because tiles are cut into a grid, a line crossing a tile boundary is clipped and appears in both tiles. This is normal and the renderer joins them visually, but it is worth knowing if you are counting features or measuring lengths from tile data rather than from the source database.

## Related resources

- [Vector data](/docs/terminology/vector-data/)
- [GeoJSON](/docs/terminology/geojson/)
- [Shapefile](/docs/terminology/shapefile/)
- [Vector tile schema](/docs/schema/)
