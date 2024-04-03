---
layout: page
category: layer
title: water_name
etl_graph: media/etl_water_name.png
mapping_graph: media/mapping_water_name.png
sql_query: SELECT osm_id, geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", class, intermittent FROM layer_water_name(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
---
Lake center lines for labelling lake bodies.
This is based of the [osm-lakelines](https://github.com/openmaptiles/osm-lakelines) project
which derives nice centerlines from OSM water bodies. Only the most important lakes contain labels.

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the water body. Language-specific values are in `name:xx`.

### name_en

English name `name:en` if available, otherwise `name`. This is deprecated and will be removed in a future release in favor of `name:en`.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`. This is deprecated and will be removed in a future release in favor of `name:de`.

### class

Distinguish between `lake`, `ocean`, `bay`, `strait`, and `sea`.

Possible values:

- `lake`
- `bay`
- `strait`
- `sea`
- `ocean`


### intermittent

Mark with `1` if it is an [intermittent](http://wiki.openstreetmap.org/wiki/Key:intermittent) lake.

Possible values:

- `0`
- `1`





