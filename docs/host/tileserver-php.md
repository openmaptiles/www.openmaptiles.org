---
layout: docs
category: host
title: TileServer PHP
description: TileServer-php
keywords: TileServer-php
order: 3
---

In case you wish to publish vector tiles and already have a PHP stack running
you can use TileServer PHP for serving vector or raster tiles.
TileServer PHP is implementing the OGC WMTS standard for pre-rendered
raster tiles but it is fully prepared for fast serving of vector tiles.
TileServer PHP is only one PHP file which you need to copy together with the
MBTiles file. More information on [GitHub page of the project](https://github.com/klokantech/tileserver-php).

[GitHub page of the project](https://github.com/klokantech/tileserver-php)

### Requirements for running
- Apache webserver (with mod_rewrite / .htaccess supported)
- PHP 5.2+ with SQLite module (php5-sqlite)

Note: If you don't have PHP stack already installed you can use WAMP or XAMPP package for quick installation.

## Quick start
### 1. Download TileServer PHP
Source code is available on TileServer's <a href="https://github.com/klokantech/tileserver-php">GitHub</a>. Download the latest release and
unpack it to directory on your LAMP/WAMP server.

### 2. Download Vector Tiles
Go to the <a href="https://openmaptiles.com/downloads/">Downloads page</a> and download the vector tiles for your region or the
planet. You need to copy this file into a directory with TileServer-php.

### 3. Open TileServer in your browser
Tileserver is distributed with sample viewer for debugging. So you can view vector tiles directly without style.

### 4. Own viewer with style
TileServer doesn't serve styles so you need to host them with your apache in separate folder.
Create your own <a href="/docs/website/mapbox-gl-js/">HTML viewer with MapBox GL JS</a> and link TileJSON from TileServer with links to PBF tiles.

![X-Ray](/docs/media/tileserver-php_1.png)

## Styling your tiles

The screenshot above is a raw debug view of your map data. To get a pretty map out of it, you will need a browser tile renderer, such as [Mapbox GL JS](https://github.com/mapbox/mapbox-gl-js), and configure a style file for it that points at your tile server. You may also need to serve various supporting files that the renderer uses, such as fonts to render the labels.

You can start from an existing style, and adjust it as needed. [OSM Bright](https://github.com/openmaptiles/osm-bright-gl-style) is a good starting point. Note that you will need to clone the [gh-pages](https://github.com/openmaptiles/osm-bright-gl-style/tree/gh-pages) branch, rather than master, to get the files that you'll need for your website.

Once you have the files in place for your web server to serve, edit style-cdn.json and adjust the URLs inside to point at your tile server. Find the snippet that looks like this:

```json
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://free.tilehosting.com/data/v3.json?key=RiS4gsgZPZqeeMlIyxFo"
    }
  },
```

and change the value of `"url"` to point at TileJSON output from your TileServer PHP. For example, if your server is installed at http://example.com/tileserver.php, and you're serving an .mbtiles file named `united_states_of_america.mbtiles`, then this snippet should read:

```json
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "http://example.com/tileserver.php?/united_states_of_america.json"
    }
  },
  ```
You will also need to adjust the URL in `"sprite"` right below. This should point to the folder on your server where you have extracted the style, and in particular, where sprite.json and sprite.png files are. Assuming the same server, and that the files are in its root, the URL would be:

```json
"sprite": "http://example.com/sprite",
```
Note that you also need to include the beginning of the filename - `sprite` - after `/` here. The renderer will then append .json and .png to that as needed.

You should have the map working now - open index.html for the style in web browser to test.

### Hosting everything locally

After the steps above, you're serving tiles directly from your webserver, and the style is served by it as well. However, the renderer (Mapbox GL JS) comes from Mapbox servers, and the fonts come from http://fonts.openmaptiles.org/. If you would like to serve everything from your own server, there are a few more steps.

First, get Mapbox GL JS. You will need all the files from the [dist](https://github.com/mapbox/mapbox-gl-js/tree/master/dist/) folder of the GitHub repository, and also the .js file. You can generate the .js yourself if you clone the entire mapbox-gl-js repository and follow the steps; but this requires Node.js. Alternatively, you can download the pregenerated .js file from the URL provided at the [Mapbox GL JS documentation page](https://www.mapbox.com/mapbox-gl-js/api/) - it's the one used for `<script src="...">`. The .js file should go alongside the .css file.

Then, edit index.html of your style to point at your mapbox-gl-js copy. For example, if you're serving mapbox-gl.js and accompanying files from the root alongside your index.html, such that everything is in the same directory, then the latter should reference the former like so:

```html
<link rel="stylesheet" type="text/css" href="mapbox-gl.css" />
<script src="mapbox-gl.js"></script>
```

Now you will need the fonts. These can be obtained from [this OpenMapTiles repository](https://github.com/openmaptiles/fonts) - note that you will again need the [gh-pages](https://github.com/openmaptiles/fonts/tree/gh-pages) branch of it, rather than master, to get the actual font files. You only need the directories, not the .zip files. Place them all in a separate directory from where your webserver can serve them, and then edit style-cdn.json to point at that directory. You will need to adjust the `"glyphs"` setting, which will initially look something like this:

```json
"glyphs": "http://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
```

For example, if your style index is at http://example.com/index.html, and your font directories are under http://example.com/fonts/, then the above becomes:

```json
"glyphs": "http://example.com/fonts/{fontstack}/{range}.pbf",
```

You will also need to adjust the font references in the style, so that they only reference a single font family at once, rather than several alternatives - alternatives are not supported when hosting fonts as static files. You will need to find *all* places that mention `"text-font"`, which will look something like this:

```json
"text-font": [
  "Open Sans Italic",
  "Klokantech Noto Sans Italic",
  "Klokantech Noto Sans CJK Regular"
],
```

and edit *each one*, so that the list only has one font in it, e.g.:

```json
"text-font": [
  "Open Sans Italic"
],
```

(Don't forget to remove the comma before the closing `]`! If your style suddenly stops working after you did this change, it's probably because you have forgotten a comma somewhere.)

Now you can test your changes by reloading index.html. If everything was done right, you should see the rendered map again.

With this setup, you can serve maps from a server running on the same machine as the browser without an Internet connection - effectively, the combination of TileServer PHP and Mapbox GL JS becomes an offline vector .mbtiles map viewer.

## Server from folder structure
This functionality is used to increase the performance of serving.
The vector tiles can be unpacked from MBTiles (SQLite) container and hosted just
a in direct folder structure - the same way as raster tiles are typically made
with a software like MapTiler or GDAL2Tiles. The demonstration of such approach
is visible at http://klokantech.github.io/mapbox-gl-js-offline-example/.

To unpack and ungzip the tiles is useded mb-util than it is neccesery to unzip PBF files:

```
./mb-util --image_format=pbf countries.mbtiles countries
gzip -d -r -S .pbf *
find . -type f -exec mv '{}' '{}'.pbf \;
```
