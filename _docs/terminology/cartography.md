---
layout: docs
category: terminology
title: Cartography
description: Cartography is the practice of designing maps, deciding what to show at each scale and how to draw it so the map stays readable.
---

**Cartography** is the design discipline behind a map. It is the set of decisions about which features appear at which zoom, what gets simplified, what color carries what meaning, and which labels earn their space.

![The same streets of central Amsterdam drawn twice: a flat, unreadable treatment on the left, and a considered style with clear hierarchy and labels on the right](/img/terminology/cartography.webp)

## Cartography in a vector tile stack

In a vector tile stack those decisions are split across two places, and it helps to know which is which.

The [schema](/docs/schema/) decides what data is available. It sets the layers, the attributes, and the zoom level at which each feature first appears. Dropping a minor road from low zooms is a schema decision, and no style can bring it back if the data is not in the tile.

The **style**, written as a [style JSON](/docs/terminology/style-json/), decides how the available data looks. Colors, widths, fonts, label priorities, and which layers are drawn at all are decisions made in each [layer style](/docs/terminology/layer-style/), and they can be changed at any time without regenerating anything.

The practical consequence is that if a feature is missing from your map, the first question is which of the two is responsible. If it is not in the tile, the style cannot help.

## Generalization

The hardest part is generalization: keeping a map legible as it zooms out. Coastlines are simplified, small features are dropped, parallel roads are merged, and labels compete for room. Done well it is invisible, and the map simply looks right at every scale.

## Related resources

- [Style your map with MapTiler](/docs/style/maptiler-cloud/)
- [Style your map with Maputnik](/docs/style/maputnik/)
- [Vector tile schema](/docs/schema/)
- [Mapbox GL Style Spec](/docs/style/mapbox-gl-style-spec/)
