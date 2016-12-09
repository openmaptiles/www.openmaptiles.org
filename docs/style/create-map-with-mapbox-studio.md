---
layout: docs
category: style
title: Create a new Style with new Mapbox Studio 
description: Create a new Style with new Mapbox Studio 
keywords: create, style, Mapbox Studio 
---

## Steps
- Choose sample style
- Download sample style
- Upload sample style to Mapbox Studio



## Choose sample style
Simple way how to start with styling is to choose one of existing styles that is close to what you want to achieve, and edit the style as you want. You can choose from following styles:

### OSM Bright
[![OSM Bright](https://api.mapbox.com/styles/v1/openmaptiles/ciw6czz2n00242kmg6hw20box/static/8.540587,47.370555,14.08,0.00,0.00/300x200?access_token=pk.eyJ1Ijoib3Blbm1hcHRpbGVzIiwiYSI6ImNpdnY3eTJxZzAwMGMyb3BpdWJmajcxNzcifQ.hP1BxcxldIhakMcPSJLQ1Q)](https://openmaptiles.github.io/osm-bright-gl-style/#13.27/47.3704/8.5480)

[GitHub](https://github.com/openmaptiles/osm-bright-gl-style)

### Positron
[![Positron](https://api.mapbox.com/styles/v1/openmaptiles/ciwf3o3u2008z2pmq7pmvm6xq/static/8.540587,47.370555,14.08,0.00,0.00/300x200?access_token=pk.eyJ1Ijoib3Blbm1hcHRpbGVzIiwiYSI6ImNpdnY3eTJxZzAwMGMyb3BpdWJmajcxNzcifQ.hP1BxcxldIhakMcPSJLQ1Q)](https://openmaptiles.github.io/positron-gl-style/#13.27/47.3704/8.5480)

[GitHub](https://github.com/openmaptiles/positron-gl-style)

### Dark Matter
[![Dark Matter](https://api.mapbox.com/styles/v1/openmaptiles/ciwf4jmfe00882qmzvu5vh0zx/static/8.540587,47.370555,14.08,0.00,0.00/300x200?access_token=pk.eyJ1Ijoib3Blbm1hcHRpbGVzIiwiYSI6ImNpdnY3eTJxZzAwMGMyb3BpdWJmajcxNzcifQ.hP1BxcxldIhakMcPSJLQ1Q)](https://openmaptiles.github.io/dark-matter-gl-style/#13.27/47.3704/8.5480)

[GitHub](https://github.com/openmaptiles/dark-matter-gl-style)

### KlokanTech Basic
[![KlokanTech Basic](https://api.mapbox.com/styles/v1/openmaptiles/ciwf4zbsv007y2pmt2rspc1dc/static/8.540587,47.370555,14.08,0.00,0.00/300x200?access_token=pk.eyJ1Ijoib3Blbm1hcHRpbGVzIiwiYSI6ImNpdnY3eTJxZzAwMGMyb3BpdWJmajcxNzcifQ.hP1BxcxldIhakMcPSJLQ1Q)](https://openmaptiles.github.io/klokantech-basic-gl-style/#13.27/47.3704/8.5480)

[GitHub](https://github.com/openmaptiles/klokantech-basic-gl-style)

## Download sample style
Go to GitHub repository of chosen style and download it as zip file (Clone or download > Download ZIP). The repository consists of `style.json` that contains style definitions, and optionally also `icons/` folder, that contains SVG files that are used as symbols in the map.
To correctly display your style, you will also need to download fonts used in `style.json`. Those can be found in [OpenMapTiles Fonts repository](https://github.com/openmaptiles/fonts).

## Upload sample style to Mapbox Studio
[Mapbox Studio](https://www.mapbox.com/studio/) is design platform by Mapbox that you can use to edit your style.
- Create new account if you don't have any.
- Go to [Fonts](https://www.mapbox.com/studio/styles/fonts/), click __Upload fonts__ and upload fonts that you downloaded before.
- Go to [Tilesets](https://www.mapbox.com/studio/tilesets/), click __New tileset__, and upload tileset you will use for styling. Note this can be only a sample (e.g. one city) and not the whole tileset you want to publish later. After the tileset is uploaded, go back to list of tilesets, click on your tileset and remember __Map ID__ on the right side.
- Edit `style.json` in text editor and change tileset's __Map ID__ to yours:
```
  "sources": {
    "openmaptiles": {
      "url": "__mapbox://<YOUR TILESET'S MAP ID>",
      "type": "vector"
    }
  },
```
- Go to [Styles](https://www.mapbox.com/studio/styles/) section and click __New style__ button. Name your style and select __Empty__ from style previews.
- Go to [Styles](https://www.mapbox.com/studio/styles/) click __Edit__ next to your style, click __Properties__ in the bottom left corner, then __Images__, click to input field next to `Background pattern`, then __Add SVG Images__ and upload SVG files from `icons` folder you downloaded before.


Mapbox Studio is the new map design platform by Mapbox.
Mapbox provides [great resources for getting started](https://www.mapbox.com/help/getting-started-mapbox-studio-1/){:target="_blank"} how to design your own maps.
This tutorial will show you how to customize the OSM Bright style for Mapbox GL.

Visit [the Mapbox Studio Editor](https://www.mapbox.com/studio/){:target="_blank"} and follow the tutorial.

## Create new style project

Create a new style project. Make sure you start of a base map that only requires Mapbox Streets.
A Mapbox Terrain equivalent is not available by OSM2VectorTiles.

In `Styles` create a new style, choose `Bright` and save your project.

![Create new project with new Mapbox Studio](/media/mapbox_studio_create_style.gif){:target="_blank"}

## Download Mapbox GL Style

Once you are satisfied with your personal map you can download the
[Mapbox GL Style](https://www.mapbox.com/mapbox-gl-style-spec/){:target="_blank"}.

![Download Mapbox GL Style](/media/download_mapbox_gl_style_json.png){:target="_blank"}

## Deploy your Map

Once you've downloaded the Mapbox GL Style you need to modify it
to work together with OSM2VectorTiles. Ensure you are serving vector tiles as explained in the [getting started tutorial](/docs/getting-started/).

The downloaded Mapbox GL Style defines how each feature of the map should be styled and where the assets like vector tiles, fonts and sprites are stored. In order to use your personal style together with OSM2VectorTiles the references to vector tiles, fonts and sprites need to be updated like in the style example below.

<script src="https://gist.github.com/manuelroth/d67f1ae67dddbb659ff17a7bb854096d.js"></script>
