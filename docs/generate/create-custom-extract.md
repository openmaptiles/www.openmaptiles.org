---
layout: docs
category: generate
order: 4
title: Create custom map extract
description: Create custom map extract of an area of your choice
---

If you need an extract which is not included on the [downloads page](http://openmaptiles.org/downloads), you need to download the planet file and create your own MBTiles extract. Or you need smaller area than it is available as OSM.PBF extract on e.g. [Geofabrik](https://geofabrik.de/) the extract could be done before importing into database

## Preparation

[Download map tiles of the entire world](https://data.maptiler.com/downloads/planet/)

or 

[Download OpenStreetMap extract](https://download.geofabrik.de/).

## Choose your Bounding Box

1. Visit [boundingbox.klokantech.com](http://boundingbox.klokantech.com/) and drag a rectangle around your desired area.
2. Copy the bounding box in CSV format

![Choose Bounding Box](/media/choose-bounding-box.png)

## Create MBTiles Extract

To create an extract, use the [`mbtiles-tools copy`](https://github.com/openmaptiles/openmaptiles-tools/blob/master/bin/mbtiles-tools) utility included in [openmaptiles-tools](https://github.com/openmaptiles/openmaptiles-tools/) docker. It takes a bounding box and a MBTiles file as input and creates an extract clipped to the bounding box.

Replace the bounding box and center zoom in the following command with your bounding box.

```bash
make bash

export CENTER_ZOOM=5

mbtiles-tools copy ./data/tiles.mbtiles ./data/smaller_tiles.mbtiles \
        --reset \
        --auto-minmax \
        --bbox=16.2882,49.0093,16.9248,49.4175
```

## Create OSM.PBF Extract

Creating extract from OSM.PBF, use the `osmconvert` tool included in [openmaptiles-tools](https://github.com/openmaptiles/openmaptiles-tools/) docker. It takes a bounding box and a OSM.PBF file as input and creates an extract clipped to the bounding box.

```bash
make bash

osmconvert ./data/planet.osm.pbf \
        -b=-14.53,28.89,43.21,59.8 \
        -o=./data/part_europe.osm.pbf
```
