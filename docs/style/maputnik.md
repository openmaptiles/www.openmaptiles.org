---
layout: docs
category: style
title: Design a Style with Maputnik
description: Create a Style with Mapbox Studio
keywords: create, style
---

[Maputnik](https://github.com/maputnik/editor) is a free and open visual editor for the [Mapbox GL style specification](https://www.mapbox.com/mapbox-gl-style-spec/).
You can either use the publicly available version of Maputnik
at [http://maputnik.com/editor](http://maputnik.com/editor)
 or [download the editor](https://github.com/maputnik/editor/releases) to use it locally.

## Choose a Style

The easiest way to get started is choosing an existing style as a starting point.
Under [Styles](http://openmaptiles.org/styles) you can find a list of styles targeted using OpenMapTiles.

In this example we will use the [Positron style](https://github.com/openmaptiles/positron-gl-style).

Clone the repository containing the style JSON file.

```bash
git clone https://github.com/openmaptiles/positron-gl-style.git
```

## Edit the Style

You can either upload the `style.json` file to [http://maputnik.com/editor](http://maputnik.com/editor) or work locally with the [maputnik CLI](https://github.com/maputnik/editor/releases).

```
maputnik --watch --file style.json
```

This will expose Maputnik on `http://localhost:8000`.
Check out the video tutorial how to use Maputnik to edit a local style.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/vCFsrwocE9s" frameborder="0" allowfullscreen></iframe>
