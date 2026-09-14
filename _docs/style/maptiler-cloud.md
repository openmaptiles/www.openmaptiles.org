---
layout: docs
category: style
title: Style map with MapTiler
description: Edit map style with MapTiler Customize map design tool.
order: 1
---

## Customize Map Styles with the Visual Editor

Because OpenMapTiles uses a structured, standardized schema (with clearly defined layers like `water`, `road`, `building`, `landuse`, etc.), designing custom map styles is incredibly straightforward.

Instead of manually editing raw JSON stylesheets containing thousands of lines of style rules, you can use the **MapTiler Customize visual editor** to modify map designs in real time right in your web browser.

### Visual Map Customization

The MapTiler Customize tool provides an easy-to-use, slide-out configuration panel designed for rapid map styling:

- **Quick Colors**: Change the main colors of your map (land, water, forests, roads, and buildings) with simple color pickers.
- **Font Control**: Choose from a wide range of modern typefaces to style labels globally.
- **Language Selection**: Toggle map labels to show local names, English translations, or bilingual labels with a single click.
- **Layer Visibility**: Easily show or hide complete categories (such as transit networks, specific labels, or administrative boundaries) based on your use case.

### Advanced Style Editor

If you need fine-grained control over individual OpenMapTiles layers, the Customize tool allows you to switch into the **Advanced Editor**:

- Edit specific filters, font sizes, line widths, and opacity values for individual layers (e.g., secondary roads vs. motorways).
- Directly view and modify the underlying Mapbox GL Style JSON structure.
- Add your own custom vector sources or raster imagery overlays.
- Set up zoom-dependent rules for styling elements differently at various map scale levels.

### Deploying Your Custom Style

Once you are satisfied with your custom map design, publishing and deploying it is incredibly fast:

1. Click the **Save** and then **Publish** buttons in the editor.
2. MapTiler Cloud will host your style on a global CDN and generate standard endpoints.
3. You can reference the CDN-served Style JSON directly in web applications (using MapLibre GL JS, Leaflet, or OpenLayers), mobile applications (Android/iOS SDKs), or desktop applications (GIS software).

```javascript
const map = new maplibregl.Map({
    container: 'map',
    // Your custom style CDN endpoint hosted on MapTiler Cloud
    style: 'https://api.maptiler.com/maps/YOUR-CUSTOM-STYLE-ID/style.json?key=YOUR_API_KEY'
});
```

<a href="https://www.maptiler.com/cloud/customize/" class="btn">Start Customizing Map Styles Online</a>
