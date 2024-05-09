---
layout: docs
category: style
order: 2
title: Design a style with Maputnik
description: Edit map style with open-source Maputnik map design tool.
---

[Maputnik](https://maputnik.github.io/) is a free and open source visual editor for the [GL style specification](https://docs.maptiler.com/gl-style-specification/). You can either use the online version of Maputnik at [https://maplibre.org/maputnik/](https://maplibre.org/maputnik/) or [download the editor](https://github.com/maplibre/maputnik/releases) to use it locally.

## Edit the Style online

The easiest way to get started is choosing an existing style as a starting point. On [https://maplibre.org/maputnik/](https://maplibre.org/maputnik/) you can choose from many existing styles that work well with OpenMapTiles and directly edit them.

Once you are done editing the style you can download the modified style in JSON format.

![Choose style in Maputnik](/media/maputnik_choose_style.png)

## Edit the Style locally

If you want to edit the style locally with the [Maputnik CLI](https://github.com/maplibre/maputnik/releases), clone one of the OpenMapTiles styles GitHub repository. On [Styles](http://openmaptiles.org/styles) page you can find a list of styles with a preview.

In our example, we will use the [Positron style](https://github.com/openmaptiles/positron-gl-style). Clone the repository containing the style JSON file using following command:

```bash
git clone https://github.com/openmaptiles/positron-gl-style.git
```

Now start Maputnik and tell the programm to watch the `style.json` file for changes. Any time you change something in Maputnik, it will also save the changes to the `style.json` file. You can even manually edit the `style.json` file in your favorite text editor and then reload Maputnik to see the result.

To start with edit, run Maputnik and visit `http://localhost:8000` in your browser to access the editor.

```bash
maputnik --watch --file style.json
```

Check out the video tutorial how to use Maputnik to edit a local style.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/vCFsrwocE9s" frameborder="0" allowfullscreen></iframe>
