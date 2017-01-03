---
layout: docs
category: generate
title: Create custom Extract
description: Create custom Extract of an Area of your Choice
keywords: create, custom, extract
---

If you need an extract which is not included on the [downloads page](http://openmaptiles.org/downloads){:target="_blank"},
you need to download the planet file and create your own extract.

## Preparation

1. [Download the planet file](http://openmaptiles.org/downloads){:target="_blank"}
2. Install [tilelive](https://github.com/mapbox/tilelive) and [MBTiles support](https://github.com/mapbox/node-mbtiles).

```bash
npm install -g tilelive mbtiles
```

## Choose your Bounding Box

1. Visit [boundingbox.klokantech.com](http://boundingbox.klokantech.com/){:target="_blank"}
and drag a rectangle around your desired area.
2. Copy the bounding box in CSV format

![Choose Bounding Box](/media/choose-bounding-box.png)

## Create Extract

To create an extract the `tilelive-copy` utility is used.
It takes a bounding box and a MBTiles file as input and
creates an extract clipped to the bounding box.

Replace the bounding box in the following command with your bounding box.

```bash
tilelive-copy \
    --minzoom=0 --maxzoom=14 \
    --bounds="5.9559,45.818,10.4921,47.8084" \
    planet.mbtiles my-extract-for-switzerland.mbtiles
```
