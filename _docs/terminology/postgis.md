---
layout: docs
category: terminology
title: PostGIS
description: PostGIS is an extension that adds geographic types, spatial indexes, and spatial functions to PostgreSQL.
---

**PostGIS** is an extension for [PostgreSQL](https://www.postgresql.org/) that enables the database to store, index, and query spatial data. With PostGIS installed, tables can store geometry columns alongside standard attributes, allowing you to run spatial queries to check for spatial intersections, proximity, or containment (for example, finding features within 500 meters of a point).

It serves as the standard storage backend for active [vector data](/docs/terminology/vector-data/) before it is processed into a tileset.

## What the extension adds

| Addition | Purpose |
| --- | --- |
| `geometry` and `geography` types | Store points, lines, and polygons directly in database columns |
| Spatial indexes | GiST indexes that optimize spatial queries and prevent full table scans |
| `ST_` functions | Operations for measuring, testing, and transforming geometries |
| SRID | Spatial Reference Identifiers that specify the coordinate system of a geometry |

Understanding SRIDs is essential when working with PostGIS. Every geometry carries an SRID—most commonly `4326` (WGS 84 longitude/latitude) or `3857` (Web Mercator). PostGIS requires geometries to share the same SRID before performing spatial operations; use `ST_Transform` to reproject data between coordinate systems.

## PostGIS in a tile pipeline

OpenMapTiles can generate [vector tiles](/docs/terminology/vector-tiles/) directly from PostGIS or use it [with custom data to generate map tiles](/docs/generate/custom-vector-from-postgis/) and combine those layers with base OpenMapTiles in your map style.

## Related resources

- [Vector data](/docs/terminology/vector-data/)
- [Custom vector tiles from PostGIS](/docs/generate/custom-vector-from-postgis/)
- [Generate your own map](/docs/generate/generate-openmaptiles/)
