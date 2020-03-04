---
layout: docs
category: style
order: 3
title: CartoCSS style with Mapbox Studio Classic
titlehtml: CartoCSS style with Mapbox Studio Classic
titlesidebar: CartoCSS with Mapbox Studio Classic
description: Design a CartoCSS Style with Mapbox Studio Classic
keywords: Mapbox Studio Classic
---

Another way of designing a map style is to use [Mapbox Studio Classic](https://www.mapbox.com/help/define-mapbox-studio-classic/) desktop application in combination with OpenMapTiles to create Tilemill2 tile styles for Mapnik renderer. Even though this workflow is still functional, it is recommended to switch to the [MapBox Studio](/docs/style/mapbox-studio/).

NOTE: If you need raster tiles, it is highly recommended to use the [TileServerGL project](https://openmaptiles.org/docs/host/tileserver-gl/), which provides raster tiles rendered on the server side from the vector tiles and the modern GL styles.


## Change the Source

Go to [Vector tile hosting](https://maptiler.com/cloud/) and get a free key. Then download TileJSON from URL
```
https://api.maptiler.com/tiles/v3/tiles.json?key={key}
```
and save it as a file with `.json` extension (the extension is necessary for Mapbox Studio Classic). Upload the JSON to the web, e.g. using [Gist](https://gist.github.com/). Finally change the source of your TM2 style to URL of your TileJSON and save the style.

![Mapbox Studio Classic change of the source](/media/mapbox_studio_classic_change_url.png)

## Write CartoCSS

Change the [CartoCSS](https://www.mapbox.com/help/getting-started-cartocss/) selector to match the OpenMapTiles layers. Learn more about the OpenMapTiles [vector tile schema](/schema) to find layers and attributes you need to create your own map.

Check out the video tutorial how to port an existing TM2 style to OpenMapTiles.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/JFQ7_9jvEFM" frameborder="0" allowfullscreen></iframe>

## Ported Classic Styles

To simplify your effort, we already ported some nice-looking open licensed raster tile styles.

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
