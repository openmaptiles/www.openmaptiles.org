---
layout: docs
category: what-is
title: 3D terrain
description: 3D terrain uses elevation data to give a map real relief, so hills and valleys have height instead of being drawn flat.
---

**3D terrain** adds the third dimension to a map. Instead of drawing the surface flat, the renderer lifts every point to its real elevation, so ridges, valleys, and coastlines get shape, and a tilted view shows the landscape rather than a plan.

## How elevation is delivered

Elevation arrives as its own tileset, separate from the map data. The usual trick is to encode height into the color channels of an ordinary [raster tile](/docs/what-is/raster-tiles/): each pixel's red, green, and blue values are read back as a single number giving the height in meters at that point.

That lets elevation travel through the same tile infrastructure as everything else, and the client decodes it and builds a mesh from it.

Terrain is a separate source in the [style JSON](/docs/what-is/style-json/), so you add it to an existing map rather than switching to a special one.

## Terrain and hillshading

Terrain and hillshading are often confused. Hillshading is a flat image that simulates light falling across slopes, and it works in a plain top-down map. Terrain is real geometry, which only shows once the camera is tilted. Many maps use both, because hillshading still reads well from directly above.

## Related resources

- [Create a mobile app](/docs/mobile/mobile/)
- [Display a map with MapTiler SDK JS](/docs/website/maptiler-sdk-js/)
