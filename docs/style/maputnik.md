---
layout: docs
category: style
order: 1
title: Design a Style with Maputnik
description: Edit Style with Mapbox Studio
keywords: create, style
---

[Maputnik](https://github.com/maputnik/editor) is a free and open visual editor for the [Mapbox GL style specification](https://www.mapbox.com/mapbox-gl-style-spec/).
You can either use the publicly available version of Maputnik
at [http://editor.openmaptiles.org](http://editor.openmaptiles.org)
 or [download the editor](https://github.com/maputnik/editor/releases) to use it locally.

## Choose a Style

The easiest way to get started is choosing an existing style as a starting point.
On [http://editor.openmaptiles.org](http://editor.openmaptiles.org) you can choose from many existing
styles that work well with OpenMapTiles and directly edit them.

Once you are done editing the style you can download the modified style JSON.

![Choose style in Maputnik](/media/maputnik_choose_style.png)

## Edit the Style locally

If you want to edit the style locally with the [Maputnik CLI](https://github.com/maputnik/editor/releases) you can clone the GitHub repository of one of the OpenMapTiles styles.  Under [Styles](http://openmaptiles.org/styles) you can find a list of styles.

In this example we will use the [Positron style](https://github.com/openmaptiles/positron-gl-style).
Clone the repository containing the style JSON file.

```bash
git clone https://github.com/openmaptiles/positron-gl-style.git
```

Now start Maputnik and tell it to watch the `style.json` file for changes. Any time you change
something in Maputnik it will save back the changes to the `style.json` file.
You can even edit the `style.json` file in your favorite text editor and it will reload Maputnik.

After Maputnik has started visit `http://localhost:8000` to access the editor.

```
maputnik --watch --file style.json
```

Check out the video tutorial how to use Maputnik to edit a local style.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/vCFsrwocE9s" frameborder="0" allowfullscreen></iframe>
