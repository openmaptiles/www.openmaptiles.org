---
layout: docs
category: generate
order: 4
title: Create custom Extract
titlehtml: Create custom Extract
titlesidebar: Create custom Extract
description: Create custom Extract of an Area of your Choice
keywords: create, custom, extract
---

If you need an extract which is not included on the [downloads page](http://openmaptiles.org/downloads), you need to download the planet file and create your own extract.

## Preparation

1. [Download the planet file](http://openmaptiles.org/downloads)
2. Install [tilelive](https://github.com/mapbox/tilelive) and [MBTiles support](https://github.com/mapbox/node-mbtiles).

```bash
npm install -g tilelive mbtiles
```

## Choose your Bounding Box

1. Visit [boundingbox.klokantech.com](http://boundingbox.klokantech.com/) and drag a rectangle around your desired area.
2. Copy the bounding box in CSV format

![Choose Bounding Box](/media/choose-bounding-box.png)

## Create Extract

To create an extract, use the `tilelive-copy` utility. It takes a bounding box and a MBTiles file as input and creates an extract clipped to the bounding box.

Replace the bounding box in the following command with your bounding box.

```bash
tilelive-copy \
    --minzoom=0 --maxzoom=14 \
    --bounds="5.9559,45.818,10.4921,47.8084" \
    planet.mbtiles my-extract-for-switzerland.mbtiles
```
