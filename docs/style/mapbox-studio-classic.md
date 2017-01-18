---
layout: docs
category: style
order: 3
title: Raster Tiles with Mapbox Studio Classic
titlehtml: Raster Tiles with Mapbox Studio Classic
titlesidebar: Tiles with Mapbox Studio Classic
description: Design a Raster Tile Style with Mapbox Studio Classic
keywords: Mapbox Studio Classic
---

You can also use [Mapbox Studio Classic](https://www.mapbox.com/help/define-mapbox-studio-classic/) in combination with
OpenMapTiles to create Tilemill raster tile styles.


## Change the Source

Change the source of your TM2 style to `http://openmaptiles.org/cdn.json` and save the style.

![Mapbox Studio Classic hange source](/media/mapbox_studio_classic_change_url.png)

## Write CartoCSS

Change the [CartoCSS](https://www.mapbox.com/help/getting-started-cartocss/) selector to match the OpenMapTiles layers)
Study the OpenMapTiles [vector tile schema](/schema) to find the layers and attributes you need to create your map.

Check out the video tutorial how to port an existing TM2 style to OpenMapTiles.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/JFQ7_9jvEFM" frameborder="0" allowfullscreen></iframe>

## Ported Classic Styles

We ported over some nice looking open licensed raster tile styles.

- **Light**:
  [mapbox-studio-light.tm2](https://github.com/openmaptiles/mapbox-studio-light.tm2/)
- **Dark**:
  [mapbox-studio-dark.tm2](https://github.com/openmaptiles/mapbox-studio-dark.tm2/)
- **OSM Bright**:
  [mapbox-studio-osm-bright.tm2](https://github.com/openmaptiles/mapbox-studio-osm-bright.tm2/)
- **Pencil**:
  [mapbox-studio-pencil.tm2](https://github.com/openmaptiles/mapbox-studio-pencil.tm2/)
- **Woodcut**:
  [mapbox-studio-woodcut.tm2](https://github.com/openmaptiles/mapbox-studio-woodcut.tm2/)
- **Pirates**:
  [mapbox-studio-pirates.tm2](https://github.com/openmaptiles/mapbox-studio-pirates.tm2/)
- **Wheatpaste**:
  [mapbox-studio-wheatpaste.tm2](https://github.com/openmaptiles/mapbox-studio-wheatpaste.tm2/)
