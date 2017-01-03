---
layout: docs
category: host
title: Serve Raster and Vector Tiles with Tileserver GL
description: TileServer GL
---

Once you have generated or downloaded vector tiles from the [downloads](http://openmaptiles.org/downloads)
you need a tileserver to serve the vector tiles via HTTP to your map clients
or fall back to rendering raster tiles for users with legacy browsers.

Tileserver GL supports both serving vector tiles and raster tiles (through Mapbox GL Native)
and also providing a WMTS endpoint. You can dive into the [main documentation for Tileserver GL](https://tileserver.readthedocs.io/en/latest/).

This tutorial will show you how to serve the downloaded vector tiles from OpenMapTiles.

### Install

You can install the `tileserver-gl` package from npm.

```
npm install -g tileserver-gl
```

Now download the vector tiles from OpenMapTiles.

```
curl -o zurich_switzerland.mbtiles https://openmaptiles.os.zhdk.cloud.switch.ch/v3.3/extracts/zurich_switzerland.mbtiles
```

If the installation fails or you do not have Node.js installed locally we recommend to use
Docker.

```
docker pull klokantech/tileserver-gl
```

### Serve Map Tiles

Start `tileserver-gl` with the downloaded vector tiles.

```
tileserver-gl zurich_switzerland.mbtiles
```

If you are using Docker you should mount the directory containing the vector tiles to the container
and bind the port `80` to a local port.

```
docker run -it -v $(pwd):/data -p 8080:80 klokantech/tileserver-gl
```

This will start a Node.js container with tileserver-gl on your computer.
Visit `http://localhost:8080` to check the Tileserver GL GUI.

In the **Data** section of tileserver you will see your hosted vector tiles.
You can use the provided `TileJSON` endpoint as source in your GL styles
or explore the data using the X-Ray view.

![Tileserver GL vector tiles](/media/tileserver_gl_vector_tiles.png)

In the **Styles** section of the tileserver you will see the preconfigured styles
to render raster tiles from the vector tiles in the **Data** section.
You can check out the styles either using Leaflet and raster tiles (Raster) or Mapbox GL and vector
tiles (Vector). You even get a WMTS endpoint for each of the tiles.

![Tileserver GL raster tiles](/media/tileserver_gl_styles.png)


### More Documentation

Read up on the [main documentation for Tileserver GL](https://tileserver.readthedocs.io/en/latest/)
for more advanced configurations or special needs.
