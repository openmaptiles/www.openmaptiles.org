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

You can also use [Mapbox Studio Classic](https://www.mapbox.com/help/define-mapbox-studio-classic/) in combination with
OpenMapTiles to create Tilemill2 tile styles for Mapnik renderer.

NOTE: If you need raster tiles it is highly recomended to use the <a href="https://openmaptiles.org/docs/host/tileserver-gl/">TileServerGL project</a>, which provides raster tiles rendered on server side from the vector tiles and the modern GL styles.


## Change the Source

Go to [Vector tile hosting](https://openmaptiles.com/hosting/) and get a free key. Then download tilejson from URL
```
https://free.tilehosting.com/data/v3.json?key={key}
```
and save it as a file with `.json` extension (the extension is necessary for Mapbox Studio Classic).
Upload the JSON to the web, e.g. using [Gist](https://gist.github.com/).
Finally change the source of your TM2 style to URL of your tilejson and save the style.

![Mapbox Studio Classic hange source](/media/mapbox_studio_classic_change_url.png)

## Write CartoCSS

Change the [CartoCSS](https://www.mapbox.com/help/getting-started-cartocss/) selector to match the OpenMapTiles layers.
Study the OpenMapTiles [vector tile schema](/schema) to find layers and attributes you need to create your map.

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
