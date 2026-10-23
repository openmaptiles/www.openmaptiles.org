---
layout: docs
category: terminology
title: Shapefile
description: A Shapefile is an Esri vector data format that stores points, lines or polygons as a set of files sharing one base name.
---

A **Shapefile** is a [vector data](/docs/terminology/vector-data/) format introduced by Esri in the early 1990s. It is an old format with well-known limitations, such as attribute names cut to ten characters and a 2 GB limit for each of its files, but you will still come across it in older datasets and desktop GIS workflows.

Despite the name, a Shapefile is not one file. It is a set of files that share a base name and have to travel together:

| File | Required | Contents |
| --- | --- | --- |
| `.shp` | Yes | The geometries themselves |
| `.shx` | Yes | A positional index into the `.shp` |
| `.dbf` | Yes | The attribute table, one row per geometry |
| `.prj` | No, but important | The coordinate reference system |
| `.cpg`, `.sbn`, `.sbx`, `.shp.xml`, … | No | Text encoding, spatial indexes, metadata |

So a Shapefile is always three or more files.

If the `.prj` is missing you have to know the projection from somewhere else, otherwise the data will land in the wrong place on the map.

One Shapefile holds one geometry type. Points, lines, and polygons cannot be mixed in a single file, so a dataset often arrives as several Shapefiles.

## Turning a Shapefile into tiles

A Shapefile cannot be read by a web map directly. To put one on a map you convert it first: into [GeoJSON](/docs/terminology/geojson/), into a GeoPackage, into a cloud-optimized formats, or into a tileset of its own, normally an [MBTiles](/docs/terminology/mbtiles/) file.

## Related resources

- [GeoJSON](/docs/terminology/geojson/)
- [Custom vector tiles from GeoJSON and Shapefile](/docs/generate/custom-vector-from-shapefile-geojson/)
