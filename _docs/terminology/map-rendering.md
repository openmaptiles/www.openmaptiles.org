---
layout: docs
category: terminology
title: Map rendering
description: Map rendering is the work of turning map data and a style into the picture on screen, either on a server or in the client as you use the map.
---

**Map rendering** is the work of turning map data into a picture. It takes geometry, decides which features to draw and in what order, applies colors and widths, places the labels, and produces pixels. With [vector tiles](/docs/terminology/vector-tiles/) it is not a one-off step: the client keeps the tiles it has downloaded and draws the map again whenever the view changes, as you pan, zoom, rotate, or switch the style. It reuses the tiles it already has and fetches only those for newly visible areas or zoom levels.

The question that shapes everything else is where the drawing happens: in the client as you look at the map, or on a server before the map is sent.

## Client-side rendering of vector tiles

The client receives [vector data](/docs/terminology/vector-data/) and a [style JSON](/docs/terminology/style-json/), and draws the map itself. Decoding the tiles and placing the labels runs on the CPU, while the drawing itself goes through WebGL, which uses the device's graphics card (GPU). Because the client draws the map itself, the map can be rotated, tilted to show [3D terrain](/docs/terminology/3d-terrain/), and restyled instantly, labels can stay upright while the map turns, and the language of every label can be switched without fetching new tiles.

The cost is that the client has to be capable of it. Very old browsers and constrained devices cannot, which is when a pre-rendered fallback is worth having.

## Server-side rendering of raster tiles

The server draws the map and sends [raster tiles](/docs/terminology/raster-tiles/) as images (PNG, JPEG, or WebP). Very often the tiles are rendered ahead of time and the server only sends the stored images; others are rendered on the first request and then cached. The client just displays them, so it needs no rendering ability at all, and the result is identical everywhere.

The cost is flexibility. The style is baked into the images, so changing a color means re-rendering. A raster map can still be rotated and tilted, but the picture turns as a whole, so labels rotate with it and can end up sideways or upside down.

## Label placement

Whichever side renders, most of the difficulty is in the labels. Names have to avoid overlapping, follow curved roads, survive rotation, and stay stable as you zoom, and getting this right is a large part of the [cartography](/docs/terminology/cartography/) that separates a readable map from a cluttered one.

## Related resources

- [Vector tiles](/docs/terminology/vector-tiles/)
- [Raster tiles](/docs/terminology/raster-tiles/)
- [Style JSON](/docs/terminology/style-json/)
- [Interactive web viewers](/viewers/)
