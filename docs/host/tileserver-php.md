---
layout: docs
category: host
title: TileServer PHP
description: TileServer-php
keywords: TileServer-php
redirect_to:
- https://github.com/klokantech/tileserver-php
---

In case you wish to publish vector tiles and already have a PHP stack running
you can use TileServer-PHP for serving MVT vector tiles.
TileServer-PHP is implementing the OGC WMTS standard for pre-rendered
raster tiles but it is fully prepared for fast serving of vector tiles.

[GitHub page of the project](https://github.com/klokantech/tileserver-php)

### Requirements for running
- Apache webserver (with mod_rewrite / .htaccess supported)
- PHP 5.2+ with SQLite module (php5-sqlite)

### Installation
TileServer-PHP is only one PHP file which you need to copy together with the MBTiles file.
Download the project files as a zip archive from GitHub and unpack
it into a web-hosting or LAMP/WAMP. It is distributed with built-in JavaScript
client to debug your vector tiles.

![X-Ray](/docs/media/tileserver-php_1.png)



