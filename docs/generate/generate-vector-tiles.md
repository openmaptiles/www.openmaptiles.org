---
layout: docs
category: generate
title: Generate your own vector tiles
description: Generate your own vector tiles
keywords: Generate your own vector tiles
---

The [OpenMapTiles vector tile schema](https://github.com/openmaptiles/openmaptiles)
is open source and licensed under MIT. You are free to use it to generate your own vector tiles.


Clone the OpenMapTiles repo.


```bash
git clone https://github.com/openmaptiles/openmaptiles.git
cd ./openmaptiles
```

Download the latest Docker images and generate the vector tiles using
the quickstart bash script.

```bash
docker-compose pull
./quickstart.sh
```
