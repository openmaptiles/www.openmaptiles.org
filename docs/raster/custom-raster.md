---
layout: docs
category: raster
title: Custom Raster Layer with OpenMapTiles
description: MapTiler, TileServer GL
order: 2
---

You can combine OpenMapTiles with any custom raster layer. This includes not only scanned paper map or satellite imagery used as a base layer in your map, but also the semi&#8209;transparent hillshading layer that improves look and feel of standard OpenMapTiles maps.

# Prepare raster tiles

Raster data you want to use for the map should be converted into map tiles first. You can use [MapTiler](https://www.maptiler.com/) for the job. MapTiler is [easy to use](https://www.maptiler.com/how-to/overlay-image-over-map/) and also supports [georeferencing](https://www.maptiler.com/how-to/georeferencing/) in case your raster data do not have geographical position yet. It supports many input formats including PNG, JPEG, GeoTIFF, ECW, or PDF.

We recommend to export map tiles in [MBTiles](https://www.maptiler.com/how-to/folder-mbtiles/) format, but folder as an output is also possible.

# Prepare map style

The next step after creating map tiles is to prepare map style suitable for your data. The easy way is to start with [one of existing GL styles](/styles/) and [edit it locally with Maputnik](/docs/style/maputnik/).

After you clone the style repository and before you start editing in Maputnik, you need to add a source of your raster data. Open `style.json` in a text editor and find `sources` section. It should look like this:
```
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://free.tilehosting.com/data/v3.json?key={key}"
    }
  },
```
Add new source with reference to your map tiles:
```
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://free.tilehosting.com/data/v3.json?key={key}"
    },
    "mymaptiles": {
      "type": "raster",
      "url": "path/to/your/file.mbtiles"
    }
  },
```

Then you can start editing your style in Maputnik and adjust it as you want. Editing raster layer style may be very easy:
```
{
  "id": "mylayer",
  "type": "raster",
  "source": "mymaptiles",
  "layout": {
    "visibility": "visible"
  }
}
```

After you adjust the style, your map is ready. Example of [hillshading raster layer](https://openmaptiles.com/hillshades/) combined with OpenMapTiles:
<iframe
    src="https://openmaptiles.github.io/klokantech-terrain-gl-style/#12.24/47.3416/8.5006"
    style="min-height: 450px; width: 100%"
></iframe>


# Viewing the map

The final map can be served as a combination of OpenMapTiles and raster MBTiles, as well as a single raster tileset using [TileServer GL](/docs/host/tileserver-gl/).
