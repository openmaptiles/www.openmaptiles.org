---
layout: docs
category: website
title: Mapbox GL JS
description: Mapbox GL JS
order: 1
---

[Mapbox GL JS](https://www.mapbox.com/mapbox-gl-js/api/) is a web mapping library based on WebGL. Using Mapbox GL JS for serving OpenMapTiles tileset is the most common use case.

<iframe src="/maps/mapboxgljs.html" frameborder="0" scrolling="0" width="100%" height="540px" style="margin-bottom:25px;"></iframe>

### Reference the Style

Create an HTML page and include the Mapbox GL JS viewer. You need to point the `style` to an HTTP endpoint of your [Mapbox GL style specification JSON](/docs/style/mapbox-gl-style-spec).

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
            style: '{{ site.maps.domain }}/maps/bright/style.json?key=<key>',
            center: [8.5456, 47.3739],
            zoom: 11
        });
    </script>
</body>
</html>
```

### Use the OpenMapTiles styles

All [OpenMapTiles styles](/styles/) can be referenced directly in a viewer.

- **OSM Bright**:
  `https://openmaptiles.github.io/osm-bright-gl-style/style-cdn.json`
- **Positron**:
  `https://openmaptiles.github.io/positron-gl-style/style-cdn.json`
- **Dark Matter**:
  `https://openmaptiles.github.io/dark-matter-gl-style/style-cdn.json`
- **Klokantech Basic**:
  `https://openmaptiles.github.io/klokantech-basic-gl-style/style-cdn.json`

### Fonts and Sprites

Mapbox GL JS requires fonts being packaged as PBFs and symbols packaged as sprites. Check the [Mapbox GL style specification documentation](/docs/style/mapbox-gl-style-spec) for OpenMapTiles to create your own fonts and sprites packages.
