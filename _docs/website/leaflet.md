---
layout: docs
category: website
title: Leaflet
description: Display maps on a web using the Leaflet JavaScript library.
order: 3
---

## Displaying Maps with Leaflet

[Leaflet](https://leafletjs.com/) is the most popular lightweight, open-source JavaScript library for mobile-friendly interactive maps. Weighing in at only about 42 KB of JS, Leaflet offers a highly extensible, modular ecosystem with hundreds of plugins for any mapping requirement.

While Leaflet is traditionally designed for displaying raster tile layers, you can seamlessly integrate it with OpenMapTiles. This can be achieved by loading pre-rendered raster tiles, using the [official MapTiler Leaflet SDK plugin](https://github.com/maptiler/leaflet-maptilersdk), or using a generic **MapLibre vector tile plugin** bridge.

### Option A: Serve Raster Tiles (Simple & Fast)

The simplest way to use Leaflet with OpenMapTiles is to load pre-rendered raster tiles. This approach has near-universal browser support and does not require complex client-side WebGL compilation.

You can point your Leaflet layer to a tile hosting service (like MapTiler Cloud) or your own self-hosted [TileServer GL](/docs/host/tileserver-gl/) or [TileServer PHP](/docs/host/tileserver-php/) instance:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>OpenMapTiles with Leaflet Raster Tiles</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        // Initialize Leaflet map
        const map = L.map('map').setView([47.3769, 8.5417], 13); // Zurich, Switzerland

        // Load raster tiles generated from OpenMapTiles
        L.tileLayer('https://api.maptiler.com/maps/openstreetmap/{z}/{x}/{y}.png?key=YOUR_API_KEY', {
            attribution: '<a href="https://openmaptiles.org/" target="_blank">&copy; OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
            maxZoom: 19
        }).addTo(map);
    </script>
</body>
</html>
```

### Option B: MapTiler Leaflet SDK Plugin (Official & Easiest Vector)

If you host your maps on MapTiler Cloud or use standard OpenMapTiles styles, the [official MapTiler Leaflet SDK plugin](https://github.com/maptiler/leaflet-maptilersdk) (`@maptiler/leaflet-maptilersdk`) is the recommended way to display vector tiles in Leaflet.

It provides an extremely simple API that loads high-performance vector basemaps natively under the hood using MapTiler's optimized rendering configurations:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>OpenMapTiles with MapTiler Leaflet SDK</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />

    <!-- Leaflet CSS & JS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <!-- MapTiler Leaflet SDK Plugin -->
    <script src="https://cdn.maptiler.com/leaflet-maptilersdk/v4.1.0/leaflet-maptilersdk.umd.min.js"></script>

    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        // Initialize Leaflet map
        const map = L.map('map').setView([47.3769, 8.5417], 13); // Zurich, Switzerland

        // Add the official MapTiler vector layer to Leaflet
        const mtLayer = L.maptiler.maptilerLayer({
            apiKey: 'YOUR_MAPTILER_API_KEY_HERE',
            style: L.maptiler.MapStyle.OPENSTREETMAP
        }).addTo(map);
    </script>
</body>
</html>
```

### Option C: Render Vector Tiles via MapLibre Bridge

If you are self-hosting your vector tiles or style specifications (for instance, using TileServer GL), you can use the open-source **MapLibre GL Leaflet plugin** (`@maplibre/maplibre-gl-leaflet`). This plugin acts as a bridge, allowing MapLibre GL JS to render your OpenMapTiles vector layers directly inside Leaflet.

This lets you take advantage of sharp, zoomable vector layers and custom styling:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>OpenMapTiles with Leaflet Vector Tiles</title>
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />

    <!-- Leaflet CSS & JS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <!-- MapLibre GL JS CSS & JS -->
    <script src="https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.js"></script>
    <link href="https://unpkg.com/maplibre-gl@5.24.0/dist/maplibre-gl.css" rel="stylesheet" />

    <!-- MapLibre GL Leaflet Bridge -->
    <script src="https://unpkg.com/@maplibre/maplibre-gl-leaflet@0.1.4/leaflet-maplibre-gl.js"></script>

    <style>
        body { margin: 0; padding: 0; }
        #map { position: absolute; top: 0; bottom: 0; width: 100%; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        // Initialize Leaflet map
        const map = L.map('map').setView([47.3769, 8.5417], 13); // Zurich, Switzerland

        // Initialize MapLibre GL layer inside Leaflet
        const glLayer = L.maplibreGL({
            style: 'https://api.maptiler.com/maps/openstreetmap/style.json?key=YOUR_API_KEY'
        }).addTo(map);
    </script>
</body>
</html>
```

### Choosing the Right Approach

- **Use Option A (Raster Tiles)** if you require broad support for legacy mobile devices, have highly restrictive performance constraints, or are building simple apps with basic mapping needs.
- **Use Option B (MapTiler Leaflet SDK)** if you want the easiest, plug-and-play setup for high-fidelity vector tiles, automatic multi-language label translation, and official MapTiler Cloud styles.
- **Use Option C (MapLibre Leaflet Bridge)** if you are self-hosting your vector tiles, running a custom TileServer GL pipeline, or using an independent style URL.

<a href="https://leafletjs.com/" class="btn">Discover the Leaflet Ecosystem</a>
