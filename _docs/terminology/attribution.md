---
layout: docs
category: terminology
title: Attribution
description: Attribution is the credit line a map displays to acknowledge the data, the schema and the software it was built from.
---

**Attribution** is the credit line shown on a map that names the sources it was built from. For maps built with OpenMapTiles it is not optional. The [OpenStreetMap](/docs/terminology/openstreetmap/) data is published under the Open Database License, which requires you to credit the source, and the OpenMapTiles project asks to be credited as well.

## What you have to credit

A map built from OpenMapTiles normally carries two credits:

```
© OpenMapTiles © OpenStreetMap contributors
```

The first credits the schema and the tiles, the second credits the underlying data. If you serve the tiles through a hosted [maps API](/docs/terminology/maps-api/), that service may ask for a credit of its own as well.

## Where the credit goes

The credit belongs on the map itself, in a place a reader can find without hunting for it. Every map library has a control for this, usually anchored in a bottom corner, and most of them accept HTML so you can link each credit to its source.

If the map is too small for a visible credit, put it next to the map or behind an information icon, but keep it on the same page.

## Related resources

- [Get started](/docs/)
- [Display a map with MapLibre GL JS](/docs/website/maplibre-gl-js/)
- [OpenStreetMap copyright and license](https://www.openstreetmap.org/copyright)
