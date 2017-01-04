---
layout: docs
category: host
title: TileServer-php with vector tiles
description: TileServer-php
keywords: TileServer-php
---

In case you wish to publish vectortiles, there is no need server hosting or 
expensive cloud for server that are hard to install and maintain.

There is an alternative, TileServer-PHP, which is open-source project
written in PHP. TileServer-PHP is implementing OGC WMTS standard for pre-rendered 
raster tiles but it is fully prepared for fast serving of vector tiles.

[GitHub page of project](https://github.com/klokantech/tileserver-php)

### Requirements for running
- Apache webserver (with mod_rewrite / .htaccess supported)
- PHP 5.2+ with SQLite module (php5-sqlite)

### Instalation
TileServer-PHP is only one PHP file which you need to copy together with MBTiles file. 
Download the project files as a zip archive from GitHub and unpack 
it into a web-hosting or LAMP/WAMP. It is distributed with build in JavaScript 
client which can display vector tiles in testing X-Ray viewer.

![X-Ray](/docs/media/tileserver-php_1.png)



