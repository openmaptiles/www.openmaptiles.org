---
layout: docs
category: generate
order: 1
title: Custom Vector Data with OpenMapTiles
titlehtml: Custom Vector Data with OpenMapTiles
titlesidebar: Custom Vector Data with OpenMapTiles
description: Custom Vector Data with OpenMapTiles
keywords: custom, vector, data, geojson, shapefile, postgis, openmaptiles
---

You can combine OpenMapTiles with your custom vector data saved in ShapeFile, GeoJSON, or PostGIS. Easy way is to convert your data into vector tiles and then [combine it with standard OpenMapTiles source in a map style](https://openmaptiles.org/docs/raster/custom-raster/#prepare-map-style). Big advantage of this approach is that you don't need to generate the whole OpenMapTiles schema that is quite time-consuming.


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

# Create vector tiles from PostGIS

An alternative to tippecanoe is to use OpenMapTiles repository and **PostgreSQL&PostGIS** database. Setup of this solution is little bit harder, but it gives you even better control over tiles generation plus you can use familiar SQL syntax.

### Before importing the data into PostGIS
First, you need to install Docker and Docker Compose and to clone OpenMapTiles repository as [described here](/docs/generate/generate-openmaptiles/) (space and memory requirements are not so high in this case).

Add `data` directory as another volume of postgres service in `docker-compose.yml`:
```yml
services:
  postgres:
    image: "openmaptiles/postgis:2.3"
    volumes:
    - pgdata:/var/lib/postgresql/data
    - ./data:/data
    ...
```

Run the database container:
```bash
docker-compose up -d postgres
```

### Import the data into PostGIS
Move your data into `data/` directory and ensure it has EPSG:3857 projection. You can use ogr2ogr for transformation:
```bash
ogr2ogr -f "ESRI ShapeFile" your_data_in_3857.shp -t_srs EPSG:3857 your_data.shp
```

Files inside `data/` directory are visible from Docker container. Get into the postgres container:
```
docker-compose run --rm postgres bash
```

And import your data into PostgreSQL database by [shp2pgsql utility](http://postgis.net/docs/manual-2.3/using_postgis_dbmanagement.html#shp2pgsql_usage):
```
shp2pgsql -s 3857 -I -g geometry /data/your_data_in_3857.shp your_table_name > /data/your_data.sql
PGPASSWORD=openmaptiles psql --host=postgres --port=5432 --dbname=openmaptiles --username=openmaptiles -f /data/your_data.sql | grep -v "INSERT 0 1"
```

Inside the container, you can run
```bash
psql postgresql://openmaptiles@postgres/openmaptiles
```
to get into the database and check that the data was imported correctly.

Run `exit` to exit from container.


### Configure OpenMapTiles

The next step is to configure OpenMapTiles project so that it generates tiles from your data. Basically, you need to
- create layer definition of your data
- change `openmaptiles.yaml` so that it contains only your layer(s)
- create `data/docker-compose-config.yml` with zoom range and bounding box of generated tiles


#### Create custom layer definition
The layer definition might be the most complicated step depending on how many logic you want to implement. Very simple example consists of two files:

**layers/pubtran/pubtran.yaml:**
```yml
layer:
  id: "pubtran"
  description: |
      Links of Public Transport in Prague.
  buffer_size: 4
  fields:
    number:
      description: |
          Number of the link.
    number:
      description: |
          Category of the link.
  datasource:
    geometry_field: geometry
    query: (SELECT geometry, custom_attribute FROM layer_pubtran(!bbox!, z(!scale_denominator!))) AS t
schema:
  - ./layer.sql
```
**layers/pubtran/layer.sql:**
```sql
CREATE OR REPLACE FUNCTION layer_pubtran(bbox geometry, zoom_level int)
RETURNS TABLE(geometry geometry, custom_attribute text) AS $$
    SELECT geometry, custom_attribute
    FROM your_table_name
    WHERE geometry && bbox;
$$ LANGUAGE SQL IMMUTABLE;
```
To better understand this example, check the [documentation](https://github.com/openmaptiles/openmaptiles-tools#define-your-own-layer) and inspire in definitions of [OpenMapTiles layers](https://github.com/openmaptiles/openmaptiles/tree/master/layers) used in production.

#### Change openmaptiles.yaml

Change `openmaptiles.yaml` so that it contains only your layer(s). It may look like:
```yml
tileset:
  layers:
    - layers/pubtran/pubtran.yaml
  name: OpenMapTiles
  version: 3.3.0
  id: pubtran
  description: "Sample tileset of Prague Public Transportation"
  attribution: '<a href="http://opendata.praha.eu" target="_blank">&copy; OpenStreetMap contributors</a>'
  center: [14.403076, 50.043029, 4]
  maxzoom: 14
  minzoom: 0
  defaults:
    srs: +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0.0 +k=1.0 +units=m +nadgrids=@null +wktext +no_defs +over
    datasource:
      srid: 900913
```
You should change also at least `attribution` and `center` properties.

#### Create data/docker-compose-config.yml
Create `data/docker-compose-config.yml` with zoom range and bounding box of generated tiles:
```yml
version: "2"
services:
  generate-vectortiles:
    environment:
      BBOX: "14.224435,49.941898,14.706787,50.177433"
      OSM_MAX_TIMESTAMP : "2017-04-19T20:14:29Z"
      OSM_AREA_NAME: "prague"
      MIN_ZOOM: "0"
      MAX_ZOOM: "14"
```
You can get the bounding box easily with [http://boundingbox.klokantech.com/](http://boundingbox.klokantech.com/).

#### Generate your tiles

Run these commands to create/update other configuration files needed for generating:
```bash
docker run -v $(pwd):/tileset openmaptiles/openmaptiles-tools make clean
docker run -v $(pwd):/tileset openmaptiles/openmaptiles-tools make
docker-compose run --rm import-sql
```

Finally generate your tiles:
```bash
docker-compose -f docker-compose.yml -f ./data/docker-compose-config.yml  run --rm generate-vectortiles
```

Your MBTiles file is now at `data/tiles.mbtiles`. You can preview it using [TileServer-GL](/docs/host/tileserver-gl/):
```bash
docker run -it -v $(pwd):/data -p 8080:80 klokantech/tileserver-gl data/tiles.mbtiles
```
<img src='/img/custom-vector-tileserver-gl2.png' alt='Data preview with TileServer-GL' />


# Combine your vector tiles with OpenMapTiles
After creating vector tiles, you can combine it with standard OpenMapTiles layer in one map style. It can be done in the same way as in case of [raster tiles](http://localhost:4000/docs/raster/custom-raster/#prepare-map-style).
