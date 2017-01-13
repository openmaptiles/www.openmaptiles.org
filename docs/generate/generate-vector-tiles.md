---
layout: docs
category: generate
order: 1
title: Generate your own vector tiles
description: Generate your own vector tiles
keywords: Generate your own vector tiles
---

The [OpenMapTiles vector tile schema](https://github.com/openmaptiles/openmaptiles)
is open source and licensed under MIT. You are free to use it to generate your own vector tiles
and then use those vector tiles however you would like while respecting the
original [ODbL license](http://wiki.openstreetmap.org/wiki/Open_Database_License) of OpenStreetMap.

<iframe src="https://ghbtns.com/github-btn.html?user=openmaptiles&repo=openmaptiles&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px" style="margin: 0;"></iframe>

### Requirements

To work on OpenMapTiles you need Docker.

- Install [Docker](https://docs.docker.com/engine/installation/). Minimum version is 1.10.0+.
- Install [Docker Compose](https://docs.docker.com/compose/install/). Minimum version is 1.6.0+.


Clone the [OpenMapTiles repo](https://github.com/openmaptiles/openmaptiles).

```bash
git clone https://github.com/openmaptiles/openmaptiles.git
cd ./openmaptiles
```

### Generate the Vector Tiles

Download the latest Docker images.

```bash
docker-compose pull
```

Now generate the vector tiles using the quickstart bash script.

```bash
./quickstart.sh
```
