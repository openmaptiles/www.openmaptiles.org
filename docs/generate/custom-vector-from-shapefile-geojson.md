---
layout: docs
category: generate
order: 2
title: Custom vector tiles from GeoJSON or Shapefile
description: Custom Vector Tiles from GeoJSON or Shapefile using open-source tools
redirect_from: /docs/generate/custom-vector/
---

You can combine OpenMapTiles with your custom vector data saved in **Shapefile** or **GeoJSON** format (there is the separate article for [data stored in **PostGIS** database](/docs/generate/custom-vector-from-postgis/)). The easiest way is to convert your data into vector tiles and then [combine it with standard OpenMapTiles source in a map style](https://openmaptiles.org/docs/raster/custom-raster/#prepare-map-style). The big advantage of this approach is that you don't need to generate the whole OpenMapTiles schema which is quite time-consuming.

## Preparation

On Linux and macOS, you can use a command-line tool [**tippecanoe**](https://github.com/felt/tippecanoe) originaly from Mapbox. See [installation instructions](https://github.com/felt/tippecanoe?tab=readme-ov-file#installation).

Before using tippecanoe, you need to transform your data into EPSG:4326 coordinate system. You can use for example `ogr2ogr` utility which is part of [gdal](http://www.gdal.org/):

```bash
ogr2ogr -f GeoJSON your_data_in_4326.json -t_srs EPSG:4326 your_data.shp
```

## Generate the Vector Tiles

Having your data in correct coordinate system, you can do the conversion using tippecanoe. The most simple use case is:

```bash
tippecanoe -o tiles.mbtiles your_data_in_4326.json
```

It will convert your data into MBTiles for zoom levels 0 to 14. Tippecanoe enables much more sophisticated options including layer and attribute management, dropping features, generalization, and more. See [documentation](https://github.com/felt/tippecanoe?tab=readme-ov-file#cookbook).

You can visually check the generated MBTiles file using [TileServer-GL](/docs/host/tileserver-gl/):

```bash
make start-tileserver
```

Data preview with TileServer-GL:
<img src='/img/custom-vector-tileserver-gl.png' alt='Data preview with TileServer-GL' />

## Combine your vector tiles with OpenMapTiles

After creating vector tiles, you can combine them with the standard OpenMapTiles layer in one map style. It can be done in the same way as in case of [raster tiles](/docs/raster/custom-raster/#prepare-map-style).

## User-friendly software

Alternatively, you can use commercial [map tiling software](https://www.maptiler.com/desktop/) with a user-friendly GUI to generate your vector data overlay.
