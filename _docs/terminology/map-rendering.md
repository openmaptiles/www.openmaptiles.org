---
layout: docs
category: terminology
title: Map rendering
description: Map rendering is the work of turning map data and a style into the picture on screen, either once on a server or continuously in the client.
---

**Map rendering** is the work of turning map data into a picture. It takes geometry, decides which features to draw and in what order, applies colors and widths, places the labels, and produces pixels. With [vector tiles](/docs/terminology/vector-tiles/) it is not a single step in a pipeline: the client redraws the map from the same tiles on every frame.

The question that shapes everything else is where the drawing happens: in the client as you look at the map, or on a server before the map is sent.

## Client-side rendering of vector tiles

The client receives [vector data](/docs/terminology/vector-data/) and a [style JSON](/docs/terminology/style-json/), and draws the map itself, normally on the GPU. Because the drawing happens continuously, the map can be rotated, tilted to show [3D terrain](/docs/terminology/3d-terrain/), and restyled instantly, labels can stay upright while the map turns, and the language of every label can be switched without fetching anything new.

The cost is that the client has to be capable of it. Very old browsers and constrained devices cannot, which is when a pre-rendered fallback is worth having.

## Server-side rendering of raster tiles

The server draws the map and sends [raster tiles](/docs/terminology/raster-tiles/). The client just displays them, so it needs no rendering ability at all, and the result is identical everywhere.

The cost is flexibility. The style is baked in at render time, so changing a color means re-rendering, and the map cannot be rotated or tilted.

## Label placement

Whichever side renders, most of the difficulty is in the labels. Names have to avoid overlapping, follow curved roads, survive rotation, and stay stable as you zoom, and getting this right is a large part of the [cartography](/docs/terminology/cartography/) that separates a readable map from a cluttered one.

## Related resources

- [Vector tiles](/docs/terminology/vector-tiles/)
- [Raster tiles](/docs/terminology/raster-tiles/)
- [Style JSON](/docs/terminology/style-json/)
- [Interactive web viewers](/viewers/)
