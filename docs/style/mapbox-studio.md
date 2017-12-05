---
layout: docs
category: style
order: 2
title: Upload Style to Mapbox Studio
titlehtml: Upload Style to Mapbox Studio
titlesidebar: Upload Style to Mapbox Studio
description: Create a Style with Mapbox Studio
keywords: create, style, Mapbox Studio
---

MapBox Studio can be used for styling your tiles or as a OpenMapTiles tile hosting.

## Choose a Style

The easiest way to create your own style is choosing an existing style that is close to your desired output, and edit the style as you want.

On [Styles](http://openmaptiles.org/styles) page, you can find a list of styles with a preview as well as links to their GitHub repositories.

## Download a style

To download a style of your choice, visit GitHub repository of the chosen style and download it as a ZIP archive (`Clone or download > Download ZIP`). The repository consists of `style.json` that contains style definitions, and optionally also `icons/` folder, which contains SVG files that are used as symbols in the map.

For correct display of your style, you also need to download fonts used in `style.json`. Those can be found in [OpenMapTiles Fonts repository](https://github.com/openmaptiles/fonts).

## Upload sample style to Mapbox Studio
[Mapbox Studio](https://www.mapbox.com/studio/) is an online platform developed by Mapbox which you can use to design your style.

First, you have to create a new account if you don't have any. After that, go to [Fonts](https://www.mapbox.com/studio/styles/fonts/), click __Upload fonts__ and upload fonts you downloaded before.

![](/media/mapbox_studio_upload_fonts.png)

Go to [Tilesets](https://www.mapbox.com/studio/tilesets/), click __New tileset__, and upload OpenMapTiles tileset you will use for styling. Note, this can be only a sample (e.g. one city) and not the whole tileset you want to publish later. After the tileset is uploaded, go back to list of tilesets, click on your tileset and remember __Map ID__ displayed on the right side.

![](/media/mapbox_studio_upload_tileset.png)

Edit `style.json` in any text editor and change tileset's __Map ID__ to yours:

```javascript
  "sources": {
    "openmaptiles": {
      "url": "mapbox://<YOUR TILESET'S MAP ID>",
      "type": "vector"
    }
  },
```

Go to [Styles](https://www.mapbox.com/studio/styles/) section and click on the __New style__ button. Name your style and select __Empty__ from style previews.

![](/media/mapbox_studio_empty_style.png)

Visit [Styles](https://www.mapbox.com/studio/styles/) section again, click __Edit__ next to your style, click __Properties__ in the bottom left corner, then __Images__, click to input field next to __Background pattern__, then __Add SVG Images__ and upload SVG files from `icons` folder you downloaded before.

![](/media/mapbox_studio_svgs.png)

Go to [Styles](https://www.mapbox.com/studio/styles/), click to menu button next to your style, select __Replace__, and upload your `style.json`.

![](/media/mapbox_studio_replace_style.png)

Now you are ready to edit your style using Mapbox Studio. When you are done, download your style from Mapbox Studio and save it anywhere you want (go to [Styles](https://www.mapbox.com/studio/styles/), click to menu button next to your style, select __Download__). Then you can use the style e.g. for web or mobile viewers.

![](/media/mapbox_studio_download_style.png)
