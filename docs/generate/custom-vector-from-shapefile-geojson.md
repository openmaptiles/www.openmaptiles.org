---
layout: docs
category: generate
order: 1
title: Custom Vector Tiles from GeoJSON or ShapeFile
titlehtml: Custom Vector Tiles from GeoJSON or ShapeFile
titlesidebar: Custom Vector Tiles from GeoJSON or ShapeFile
description: Custom Vector Tiles from GeoJSON or ShapeFile
keywords: custom, vector, data, geojson, shapefile, openmaptiles
redirect_from: /docs/generate/custom-vector/
---

You can combine OpenMapTiles with your custom vector data saved in **ShapeFile** or **GeoJSON** (there is separate article for [data stored in **PostGIS** database](/docs/generate/custom-vector-from-postgis/)). Easy way is to convert your data into vector tiles and then [combine it with standard OpenMapTiles source in a map style](https://openmaptiles.org/docs/raster/custom-raster/#prepare-map-style). Big advantage of this approach is that you don't need to generate the whole OpenMapTiles schema that is quite time-consuming.


# Create vector tiles from GeoJSON or ShapeFile

If you are on Linux or OS, you can use a command-line tool [**tippecanoe**](https://github.com/mapbox/tippecanoe) from Mapbox. See [installation instructions](https://www.mapbox.com/help/large-data-tippecanoe/#install-tippecanoe-and-gdal).

Before using tippecanoe, you need to transform your data into EPSG:4326. You can use for example `ogr2ogr` utility that is part of [gdal](http://www.gdal.org/):
```bash
ogr2ogr -f GeoJSON your_data_in_4326.json -t_srs EPSG:4326 your_data.shp
```

Having your data in right EPSG, you can do the conversion using tippecanoe. The most simple use case is:
```bash
tippecanoe -o your_data.mbtiles your_data_in_4326.json
```

It will convert your data into MBTiles for zoom levels 0 to 14. Tippecanoe enables much more sophisticated options including layer and attribute management, dropping features, generalization, and more. See [documentation](https://github.com/mapbox/tippecanoe#options).

You can visually check the generated MBTiles file using [TileServer-GL](/docs/host/tileserver-gl/):
```bash
docker run -it -v $(pwd):/data -p 8080:80 klokantech/tileserver-gl your_data.mbtiles
```

Data preview with TileServer-GL:
<img src='/img/custom-vector-tileserver-gl.png' alt='Data preview with TileServer-GL' />

## Combine your vector tiles with OpenMapTiles
After creating vector tiles, you can combine it with standard OpenMapTiles layer in one map style. It can be done in the same way as in case of [raster tiles](/docs/raster/custom-raster/#prepare-map-style).
