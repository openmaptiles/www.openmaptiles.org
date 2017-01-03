---
layout: docs
category: website
title: Mapbox GL JS
description: Mapbox GL JS
---

<iframe src="/maps/mapboxgljs.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>

Create a HTML page and include the Tangram viewer and reference your scene file.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset='utf-8' />
    <title>OpenMapTiles OSM Bright style</title>
    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.29.0/mapbox-gl.css' rel='stylesheet' />
    <style>
        body { margin:0; padding:0; }
        #map { position:absolute; top:0; bottom:0; width:100%; }
    </style>
</head>
<body>
    <div id='map'></div>
    <script>
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json',
            center: [8.5456, 47.3739],
            zoom: 11
        });
    </script>
</body>
</html>
```
