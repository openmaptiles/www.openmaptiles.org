---
layout: docs
category: generate
order: 3
title: Generate your own OpenMapTiles
titlehtml: Generate your own OpenMapTiles
titlesidebar: Generate your own OpenMapTiles
description: Generate your own OpenMapTiles
keywords: Generate your own OpenMapTiles
redirect_from: /docs/generate/generate-vector-tiles/
---

The [OpenMapTiles vector tile schema](https://github.com/openmaptiles/openmaptiles)
is open source and licensed under [BSD + CC-BY](https://github.com/openmaptiles/openmaptiles/blob/master/LICENSE.md). You are free to use it to generate your own OpenMapTiles and use those vector tiles afterward. However, you are still obliged to follow original [ODbL license](http://wiki.openstreetmap.org/wiki/Open_Database_License) and attribute OpenStreetMap data properly as well as [attribute the OpenMapTiles project itself](https://github.com/openmaptiles/openmaptiles#license). The correct attribution looks similar to this:

[© OpenMapTiles](http://openmaptiles.org/) [© OpenStreetMap contributors](http://www.openstreetmap.org/copyright)

### Requirements & Recommendations

To work on OpenMapTiles, we recommend:
- Linux on x86_64 CPU
- &gt;15 GB of free disk space
- &gt;3 GB RAM.

More details available in the [repo](https://github.com/openmaptiles/openmaptiles/blob/master/QUICKSTART.md#req).

You also need to install Docker:

- [Docker](https://docs.docker.com/engine/installation/): minimal version 1.12.3+.
- [Docker Compose](https://docs.docker.com/compose/install/): minimal version 1.7.1+.

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

By default, it will generate vector tileset of Albania for zoom levels 0 -- 7 into `data` directory.
