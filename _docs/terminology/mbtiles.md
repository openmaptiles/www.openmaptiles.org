---
layout: docs
category: terminology
title: MBTiles
description: MBTiles is an open format that stores a whole tileset inside a single SQLite database file.
---

**MBTiles** is a format for storing a tileset in one file. Instead of millions of small files in nested folders, the tiles live as rows in a SQLite database, which makes a tileset something you can copy, move, or back up like any other file.

This matters at scale. A planet-wide tileset contains hundreds of millions of tiles, and most filesystems handle one large file far better than that many small ones.

## What is inside

The database holds two things that matter:

- A `tiles` table with a row per tile, keyed by zoom level, column, and row, with the tile itself stored as a blob.
- A `metadata` table with the tileset name, format, bounds, minzoom, and [maxzoom](/docs/terminology/maxzoom/). For vector tilesets it also carries a JSON description of the layers and their fields.

The blobs can be [raster tiles](/docs/terminology/raster-tiles/) or compressed vector tiles, so the same container works for both.

One detail catches people out: MBTiles numbers rows from the bottom, following the TMS convention, while most web maps number them from the top. Tile servers handle the flip for you, but it explains why a map can come out upside down when tiles are read straight from the file.

## Serving MBTiles

You do not extract the file to serve it. A tile server reads the database directly and answers tile requests from it.

## Related resources

- [Create a custom extract](/docs/generate/create-custom-extract/)

