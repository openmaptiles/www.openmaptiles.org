---
layout: docs
category: terminology
title: PostGIS
description: PostGIS is an extension that adds geographic types, spatial indexes, and spatial functions to PostgreSQL.
---

**PostGIS** is an extension for [PostgreSQL](https://www.postgresql.org/) that enables the database to store, index, and query spatial data. With PostGIS installed, tables can store geometry columns alongside standard attributes, allowing you to run spatial queries to check for spatial intersections, proximity, or containment (for example, finding features within 500 meters of a point).

It is a common place to store and prepare [vector data](/docs/terminology/vector-data/) before it is processed into a tileset, and the OpenMapTiles reference pipeline is built on it.

## What the extension adds

| Addition | Purpose |
| --- | --- |
| `geometry` and `geography` types | Store points, lines, and polygons directly in database columns |
| Spatial indexes | GiST indexes that optimize spatial queries and prevent full table scans |
| `ST_` functions | Operations for measuring, testing, and transforming geometries |
| SRID | Spatial Reference Identifiers that specify the coordinate system of a geometry |

Understanding SRIDs is essential when working with PostGIS. Every geometry carries an SRID, most commonly [`4326`](https://epsg.io/4326) (WGS 84 longitude/latitude) or [`3857`](https://epsg.io/3857) (Web Mercator). In OpenMapTiles, the OpenStreetMap data comes in WGS 84 (4326) and is converted to Web Mercator (3857) when it is imported with imposm, so all spatial operations in the database are performed in 3857.

## PostGIS in a tile pipeline

OpenMapTiles can generate [vector tiles](/docs/terminology/vector-tiles/) directly from PostGIS or use it [with custom data to generate map tiles](/docs/generate/custom-vector-from-postgis/) and combine those layers with base OpenMapTiles in your map style.

You can also serve vector tiles straight from PostgreSQL without generating them first. `postserve` from [openmaptiles-tools](https://github.com/openmaptiles/openmaptiles-tools), run in Docker with `make start-postserve`, builds each tile from the database when it is requested, which is handy while you develop a schema or a style.

## Related resources

- [Vector data](/docs/terminology/vector-data/)
- [Custom vector tiles from PostGIS](/docs/generate/custom-vector-from-postgis/)
- [Generate your own map](/docs/generate/generate-openmaptiles/)
