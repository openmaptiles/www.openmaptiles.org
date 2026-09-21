---
layout: docs
category: what-is
title: Maps API
description: A maps API is a hosted service that delivers map tiles, styles, fonts, and sprites over HTTP so you do not have to run a tile server.
---

A **maps API** is a hosted service that serves the pieces a map needs over HTTP. Instead of running your own server, you request tiles and styles from an endpoint and authenticate with a key.

## What a maps API serves

In practice you point your map at a single URL, the style:

```
{{ site.maps.domain }}/maps/openstreetmap/style.json?key=YOUR_MAPTILER_API_KEY
```

That [style JSON](/docs/what-is/style-json/) names everything else the map needs, so the client fetches the rest on its own: the tiles, either vector or [raster tiles](/docs/what-is/raster-tiles/), the font glyphs that labels are drawn from, and the sprite holding the style's icons. Serving all four from one endpoint, behind one key, is what a maps API is for.

## Hosted or self-hosted

Running the pipeline yourself gives you full control and no per-request cost, but you take on the imports, the updates, and the storage. A hosted maps API removes that work in exchange for a subscription and a dependency.

Because the schema is open, this is not a one-way decision. A style written against the [OpenMapTiles schema](/docs/schema/) works against a hosted endpoint or your own server, so you can start on one and move to the other.

## Related resources

- [Ready-to-use maps API](/docs/host/maptiler-cloud/)
- [Serve maps with MapTiler Server](/docs/host/maptiler-server/)
- [Serve maps with TileServer GL](/docs/host/tileserver-gl/)
