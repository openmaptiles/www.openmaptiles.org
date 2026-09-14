---
layout: docs
category: raster
title: Ready-to-use API
description: Serve raster and vector tiles with MapTiler Cloud
order: 1
canonical: /docs/host/maptiler-cloud/
---

## MapTiler Cloud

The MapTiler team provides a **free (for non-commercial use), highly reliable maps API** with map styles based on the **OpenMapTiles schema** and powered by **OpenStreetMap data**. The entire planet is updated weekly, with both high-performance vector and raster tiles available instantly to developers and companies.

Setting up your own map server, maintaining PostGIS databases, importing massive OpenStreetMap datasets, and configuring tile rendering pipelines (like Docker or TileServer GL) can be complex and resource-intensive. MapTiler Cloud offers a fully managed alternative that lets you start serving beautiful maps in seconds.

### Why use MapTiler Cloud for OpenMapTiles?

- **Native OpenMapTiles Support**: The vector tile service directly implements the official OpenMapTiles schema. This means any styles, workflows, or client applications designed for OpenMapTiles will work out of the box with zero modifications.
- **Weekly Planet Updates**: No need to manage server updates or delta imports. The global map data is continuously updated to reflect the latest OpenStreetMap changes.
- **Global High-Speed CDN**: Maps are delivered through a fast, geographically distributed content delivery network, ensuring low latency and maximum reliability worldwide.
- **Fully Customizable**: Use the intuitive visual customizer or the advanced GL style editor to modify colors, fonts, and layers in real time.

### Quick Start with [MapTiler SDK JS](/docs/website/maptiler-sdk-js/)

To load OpenMapTiles vector or raster maps from MapTiler Cloud in your web application, you can use the lightweight and high-performance [MapTiler SDK JS](/docs/website/maptiler-sdk-js/) library.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>OpenMapTiles with MapTiler SDK JS</title>
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

        // Initialize the map with standard OpenMapTiles-compatible style
        const map = new maptilersdk.Map({
            container: 'map',
            style: maptilersdk.MapStyle.OPENSTREETMAP,
            center: [8.5417, 47.3769], // Zurich, Switzerland
            zoom: 12
        });
    </script>
</body>
</html>
```

Visit [maptiler.com/cloud](https://www.maptiler.com/cloud/) to create a free developer account and obtain your API key.

<a href="https://www.maptiler.com/cloud/" class="btn">Get a Free MapTiler Cloud Account</a>
