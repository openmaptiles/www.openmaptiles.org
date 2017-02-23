---
layout: docs
category: website
title: Tangram
description: Using OpenMapTiles with Tangram
keywords: tangram
order: 5
---

[Tangram](https://mapzen.com/products/tangram/) is an other open source WebGL based
rendering client that supports the [Mapbox vector tiles specification](https://www.mapbox.com/vector-tiles/specification/)
and therefore can be used together with OpenMapTiles.

<iframe src="/maps/tangram.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>

### Data Source

Specify OpenMapTiles as data source of type `MVT` inside your Tangram scene file.

```yaml
sources:
    osm:
        type: MVT
        url: 'http://openmaptiles.org/{z}/{x}/{y}.vector.pbf'
        max_zoom: 16

```

Create a HTML page and include the Tangram viewer and reference your scene file.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Tangram with OpenMapTiles</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://mapzen.com/js/mapzen.css">
    <script src="https://mapzen.com/js/mapzen.min.js"></script>
    <style>
      #map { height: 100%; width: 100%; position: absolute; }
      html, body {margin: 0; padding: 0}
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      var map = L.Mapzen.map('map', {
        scene: 'https://gist.githubusercontent.com/petrsloup/27ee74e2cdebc7ac72129da3a89a440f/raw/19385aae40b9d0ba0a6c0ef1c3afe87f2743d54d/gistfile1.txt'
      });
      map.setView([45.2, -9.3], 2);

      L.Mapzen.locator().setPosition('bottomright').addTo(map);
      L.Mapzen.hash({
        map: map
      });
    </script>
  </body>
</html>
```
