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
- Go to [Styles](https://www.mapbox.com/studio/styles/), click __Edit__ next to your style, click __Properties__ in the bottom left corner, then __Images__, click to input field next to __Background pattern__, then __Add SVG Images__ and upload SVG files from `icons` folder you downloaded before.
- Go to [Styles](https://www.mapbox.com/studio/styles/), click to menu button next to your style, select __Replace__, and upload your `style.json`.

Now you are ready to edit your style using Mapbox Studio. When it is done, you can download you style from Mapbox Studio and save it anywhere you want (go to [Styles](https://www.mapbox.com/studio/styles/), click to menu button next to your style, select __Download__). Then you can use the style e.g. for web or mobile viewers.



