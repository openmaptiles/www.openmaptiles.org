---
layout: docs
category: what-is
title: OpenStreetMap
description: OpenStreetMap is a free, openly licensed map of the world, built and maintained by a global community of contributors.
---

**OpenStreetMap**, often shortened to OSM, is a free map of the world that anyone can edit. It was started in 2004 and is maintained by a global community of contributors who survey roads, buildings, landuse, addresses, and points of interest, and by organizations that import open government datasets.

OpenStreetMap is the source of the map data behind OpenMapTiles. Where OpenStreetMap is the database, OpenMapTiles is the process that turns it into tiles you can serve.

## OpenStreetMap data

The raw data is [vector data](/docs/what-is/vector-data/): a set of nodes, ways, and relations with free-form keys and values such as `highway=residential` or `building=yes`. The whole planet is available as a single file, and the data changes continuously as contributors edit it.

The data is published under the [Open Database License](https://www.openstreetmap.org/copyright) (ODbL). You can use it commercially and you can modify it, but [attribution](/docs/what-is/attribution/) is required and derived databases have to stay under the same license.

## OpenStreetMap vector tiles

Raw OpenStreetMap data is not practical to load in a browser. The planet file is tens of gigabytes, and the tagging is inconsistent because it grew organically.

OpenMapTiles solves this by importing the data into [PostGIS](/docs/generate/custom-vector-from-postgis/), normalizing the tags, and cutting the result into vector tiles. You get a predictable set of layers and attributes instead of the full tag soup.

## OpenStreetMap layers

The OpenMapTiles schema organizes the data into 16 thematic layers, such as `transportation`, `building`, `water`, `landcover`, and `place`. Each layer has a defined set of attributes and a zoom range, so a style written against the schema works with any tileset generated from it.

## OpenStreetMap styles

A tileset carries no colors, so the [cartography](/docs/what-is/cartography/) comes from the style. The project's own is [OSM OpenMapTiles](/styles/osm-openmaptiles/), which draws every feature the schema carries and is heavily inspired by OSM Carto, the style you see on openstreetmap.org itself. The difference is where the drawing happens: OSM Carto renders [raster tiles](/docs/what-is/raster-tiles/) straight from the database, while OSM OpenMapTiles is drawn from vector tiles in the client. [Other open styles](/#map-styles) on the same schema are starting points for your own designs.

## Related resources

- [Vector tile schema](/docs/schema/)
- [Generate your own map](/docs/generate/generate-openmaptiles/)
- [OpenStreetMap copyright and license](https://www.openstreetmap.org/copyright)
