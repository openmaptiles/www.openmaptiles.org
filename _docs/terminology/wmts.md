---
layout: docs
category: terminology
title: WMTS
description: WMTS (Web Map Tile Service) is an OGC standard for serving pre-rendered map tiles over the web and describing them in a capabilities document.
---

**WMTS (Web Map Tile Service)** is an [Open Geospatial Consortium](https://www.ogc.org/standards/wmts/) standard for publishing map tiles on the web. A WMTS server cuts a map into a fixed pyramid of pre-rendered images and publishes an XML capabilities document that describes which tiles exist, in which projection, and at which [zoom levels](/docs/terminology/zoom-level/). A GIS client reads that one document and configures itself, so you do not have to enter tile URLs or projection settings by hand.

The standard was published as version 1.0.0 in 2010. It is still the format most desktop GIS software expects when you add a remote basemap.

## Why tiles instead of images

The older [WMS](https://www.ogc.org/standards/wms/) standard renders a new image for whatever bounding box the client asks for. Every request is different, so the server renders again on every pan and zoom, and almost nothing can be cached.

WMTS renders the map ahead of time into a grid of small, fixed images, usually 256x256 or 512x512 pixels, addressed by zoom level, row, and column. Every client looking at the same area requests the same URL, so tiles can be cached by the server, by a CDN, and by the browser. This is what makes WMTS fast enough for interactive maps, and it is the same approach used by the XYZ tiles in web map libraries.

## Tile matrix sets

A **tile matrix set** is the grid definition: the coordinate reference system, the origin, the tile size, and the scale at each zoom level. Tiles from two different servers line up only if both use the same tile matrix set.

Most web maps use **WebMercatorQuad**: Web Mercator (EPSG:3857), 256x256 pixel tiles, the origin in the top left corner, and one tile at zoom 0 that splits into four at each following level. A service can publish several tile matrix sets for the same layer, and the capabilities document lists all of them.

Inside a tile matrix, three numbers identify a tile:

| Parameter | Meaning |
| --- | --- |
| `TileMatrix` | The zoom level, as named in the tile matrix set |
| `TileRow` | Row index, counting down from the top |
| `TileCol` | Column index, counting right from the left |

For WebMercatorQuad this is the same ordering as the `{z}/{x}/{y}` convention, with `TileCol` as `x` and `TileRow` as `y`. [TMS](https://wiki.osgeo.org/wiki/Tile_Map_Service_Specification) is a different tiling convention that numbers rows from the bottom, which is a common reason a map appears flipped vertically.

## WMTS operations

| Operation | Required | What it does |
| --- | --- | --- |
| `GetCapabilities` | Yes | Returns the XML document describing layers, formats, tile matrix sets and URL templates |
| `GetTile` | Yes | Returns a single tile image |
| `GetFeatureInfo` | No | Returns attributes of the features at a pixel within a tile |

You can encode requests in two ways. **KVP** puts the parameters in the query string, and **RESTful** encoding puts them in the URL path, which looks like an ordinary XYZ tile URL. A service can support either or both, and the capabilities document tells you which.

## Connecting to a WMTS service

Every map in [MapTiler Cloud](/docs/host/maptiler-cloud/) publishes a WMTS capabilities document. This URL is all a GIS client needs:

```
{{ site.maps.domain }}/maps/{map_id}/WMTSCapabilities.xml?key=YOUR_MAPTILER_API_KEY
```

For example, the OpenStreetMap style built on the [OpenMapTiles schema](/docs/schema/):

```
{{ site.maps.domain }}/maps/openstreetmap/WMTSCapabilities.xml?key=YOUR_MAPTILER_API_KEY
```

To add it to QGIS:

1. Open **Layer > Add Layer > Add WMS/WMTS Layer**, then click **New** to create a connection.
2. Name the connection and paste the capabilities URL into the **URL** field, with [your own API key](https://cloud.maptiler.com/account/keys/) in place of `YOUR_MAPTILER_API_KEY`.
3. Click **OK**, then **Connect**. QGIS reads the capabilities document and lists the available layers and tile matrix sets.
4. Select a layer and click **Add**.

The same URL works in any other WMTS-capable desktop GIS or server product.

## WMTS and vector tiles

WMTS carries images, not [vector data](/docs/terminology/vector-data/), so you cannot serve an OpenMapTiles vector tileset over WMTS directly. You have two options:

- **[Raster tiles](/docs/terminology/raster-tiles/) over WMTS**: Render the [vector tiles](/docs/terminology/vector-tiles/) to images and publish those. This is what the capabilities URL above serves, and it is the option to use for GIS software and for any client without WebGL. See [generating raster tiles](/docs/raster/maptiler-cloud/).
- **Vector tiles over XYZ**: Web map libraries request `.pbf` vector tiles by `{z}/{x}/{y}` and style them in the browser. See [displaying a map](/docs/website/maplibre-gl-js/).

Both use the same Web Mercator tiling scheme, so you can mix them in one map.

## Self-hosting a WMTS endpoint

If you generate and host tiles yourself, normally from an [MBTiles](/docs/terminology/mbtiles/) file, each of the tile servers documented here provides a WMTS endpoint:

- [MapTiler Server](/docs/host/maptiler-server/) exposes WMTS next to WMS and OGC API Tiles, and runs on your own hardware with a web administration interface.
- [TileServer GL](/docs/host/tileserver-gl/) provides a WMTS endpoint for each configured style, next to its vector and raster tiles.
- [TileServer PHP](/docs/host/tileserver-php/) implements the OGC WMTS standard for pre-rendered raster tiles and runs on ordinary PHP hosting.

## Related resources

- [Raster tiles](/docs/terminology/raster-tiles/)
- [WMTS via Maps API](/docs/host/maptiler-cloud/)
- [Serve maps with MapTiler Server](/docs/host/maptiler-server/)
- [Serve maps with TileServer GL](/docs/host/tileserver-gl/)
- [Serve maps with TileServer PHP](/docs/host/tileserver-php/)
- [OGC WMTS standard](https://www.ogc.org/standards/wmts/)
