---
layout: docs
category: website
title: MapTiler SDK JS
description: Display maps on a web using the modern MapTiler SDK JS library.
order: 1
---

## MapTiler SDK JS

[MapTiler SDK JS](https://github.com/maptiler/maptiler-sdk-js) is a modern, high-performance JavaScript library for interactive web maps. Built as a direct extension of **MapLibre GL JS**, it preserves the complete feature set of MapLibre while adding several helper classes, simplifying API configuration, and providing elegant built-in components.

Since the MapTiler SDK JS is designed to work seamlessly with the OpenMapTiles schema, it is the recommended client library if you host your maps on MapTiler Cloud or use standard OpenMapTiles styles.

### Key Benefits

- **Simpler Configuration**: No need to manually construct complex style URLs. Simply specify style presets (e.g., `STREETS`, `SATELLITE`, `OUTDOOR`, `WINTER`) and let the SDK handle the rest.
- **Auto-Configured Endpoints**: Fonts (glyphs) and sprites are automatically set up using optimal CDN endpoints compatible with the official OpenMapTiles schemas.
- **Advanced UI Controls**: Includes built-in support for language selection (easily switch the language of OpenMapTiles labels), geocoding (search for places), and coordinates controls out of the box.
- **3D Terrain & Globe**: Native support for 3D terrain representation and seamless global projection.

### Quick Start

To use the MapTiler SDK JS, include the library and CSS files in the `<head>` of your HTML document:

```html
<script src="https://cdn.maptiler.com/maptiler-sdk-js/v4.1.0/maptiler-sdk.umd.min.js"></script>
<link href="https://cdn.maptiler.com/maptiler-sdk-js/v4.1.0/maptiler-sdk.css" rel="stylesheet" />
```

Then, initialize the map inside a container element:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Display Map with MapTiler SDK JS</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <script src="https://cdn.maptiler.com/maptiler-sdk-js/v4.1.0/maptiler-sdk.umd.min.js"></script>
    <link href="https://cdn.maptiler.com/maptiler-sdk-js/v4.1.0/maptiler-sdk.css" rel="stylesheet" />
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        // Configure your API key
        maptilersdk.config.apiKey = 'YOUR_MAPTILER_API_KEY';

        // Initialize the map
        const map = new maptilersdk.Map({
            container: 'map',
            style: maptilersdk.MapStyle.OPENSTREETMAP, // Preset compatible with OpenMapTiles
            center: [8.5417, 47.3769], // Zurich, Switzerland
            zoom: 12
        });

        // Easily change language of OpenMapTiles labels dynamically
        map.on('load', () => {
            map.setLanguage(maptilersdk.Language.ENGLISH);
        });
    </script>
</body>
</html>
```

### Full Compatibility with OpenMapTiles

When loading standard vector tiles from OpenMapTiles, the SDK translates schema definitions under the hood, ensuring perfect vector representation of administrative borders, road symbols, POIs, and geographic features.

<a href="https://docs.maptiler.com/sdk-js/" class="btn">Explore MapTiler SDK JS API Reference</a>
