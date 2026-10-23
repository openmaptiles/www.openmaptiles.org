---
layout: docs
category: terminology
title: GeoJSON
description: GeoJSON is a JSON format for geographic features, storing geometry and properties together in plain text.
---

**GeoJSON** is a format for storing geographic [vector data](/docs/terminology/vector-data/) defined by RFC 7946. Because almost every programming language supports JSON, it has become a common way of exchanging geographic data between a web map and its data source.

A single feature carries geometry and properties together:

```json
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [14.42, 50.09]
  },
  "properties": {
    "name": "Prague",
    "population": 1400000
  }
}
```

Individual features are typically wrapped in a `FeatureCollection`. The supported geometry types are `Point`, `LineString`, `Polygon`, their `Multi` variants, and `GeometryCollection`.

## Two details that catch people out

**Coordinates are longitude first.** A position is `[lon, lat]`, the opposite order to what most maps use.

**The coordinate system is fixed.** RFC 7946 specifies just WGS 84 ([EPSG:4326](https://epsg.io/4326)) longitude and latitude. Older files sometimes carry a `crs` member declaring a different projection, which is no longer part of the specification. Data must be reprojected to WGS 84.

## GeoJSON and tiles

GeoJSON is not tiled. A map given a GeoJSON source downloads the whole file and holds it in memory. That is fine for a few thousand features, but painful for millions of features.

Because of this, GeoJSON works well for interactive overlays that change frequently, but it is unsuitable for basemaps. Bigger datasets should be converted into [vector tiles](/docs/terminology/vector-tiles/), usually stored in an [MBTiles](/docs/terminology/mbtiles/) file and served like any other tileset.

Compared to a [Shapefile](/docs/terminology/shapefile/), GeoJSON is a single file instead of a set of three or more, readable without special software, and contains various geometry types within the same collection.

## Related resources

- [Vector data](/docs/terminology/vector-data/)
- [Shapefile](/docs/terminology/shapefile/)
- [Vector tiles](/docs/terminology/vector-tiles/)
- [Custom vector tiles from GeoJSON and Shapefile](/docs/generate/custom-vector-from-shapefile-geojson/)
