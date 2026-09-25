---
layout: docs
category: terminology
title: Shapefile
description: A Shapefile is an Esri vector data format that stores points, lines or polygons as a set of files sharing one base name.
---

A **Shapefile** is a [vector data](/docs/terminology/vector-data/) format published by Esri in the 1990s. It is still one of the most common ways to exchange geographic data, and most open government datasets are offered in it.

Despite the name, a Shapefile is not one file. It is a set of files that share a base name and have to travel together:

| File | Contents |
| --- | --- |
| `.shp` | The geometries themselves |
| `.shx` | A positional index into the `.shp` |
| `.dbf` | The attribute table, one row per geometry |
| `.prj` | The coordinate reference system, optional but important |

If the `.prj` is missing you have to know the projection from somewhere else, otherwise the data will land in the wrong place on the map.

One Shapefile holds one geometry type. Points, lines, and polygons cannot be mixed in a single file, so a dataset often arrives as several Shapefiles.

## Turning a Shapefile into tiles

A Shapefile cannot be read by a web map directly. To put one on a map you convert it, either into a tileset of its own, normally an [MBTiles](/docs/terminology/mbtiles/) file, or into an overlay combined with a basemap.

## Related resources

- [GeoJSON](/docs/terminology/geojson/)
- [Custom vector tiles from GeoJSON and Shapefile](/docs/generate/custom-vector-from-shapefile-geojson/)
