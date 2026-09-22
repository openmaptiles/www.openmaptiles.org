---
layout: docs
category: terminology
title: Open maps
description: Open maps are maps built from openly licensed data, schemas, styles and software, so you can host and change every part of the stack yourself.
---

**Open maps** are maps you can run and modify without asking anyone for permission. Every layer of the stack carries an open license: the data, the schema that organizes it, the styles that paint it, and the software that serves and renders it.

This matters because a map is not one product. If any single layer is closed, you are locked in at that layer even when the rest is open.

## Open-source maps

The OpenMapTiles stack is open at each step:

- **Data** comes from [OpenStreetMap](/docs/terminology/openstreetmap/) under the Open Database License, with some layers from Natural Earth.
- **Schema** defines the layers and attributes in the tiles, and is published under CC-BY.
- **Styles** such as [OSM OpenMapTiles](/styles/osm-openmaptiles/), the project's official style, are published as a [style JSON](/docs/terminology/style-json/) and can be edited or forked.
- **Tools** for generating tiles and serving them are open-source, so you can run the whole pipeline on your own hardware.

## Open tiles

An open tile schema is the part that keeps the stack from locking you in. Because the layer names, attributes, and zoom ranges are documented and openly licensed, a style written against them works with any tileset built to the same schema, whoever generated or hosts it.

That gives you a real exit: you can move from a hosted [maps API](/docs/terminology/maps-api/) to your own server, or the other way, without rewriting your styles or your application code.

## Related resources

- [About OpenMapTiles](/about/)
- [Vector tile schema](/docs/schema/)
- [Generate your own map](/docs/generate/generate-openmaptiles/)
