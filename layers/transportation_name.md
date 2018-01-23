---
layout: page
category: layer
title: transportation_name
etl_graph: media/etl_transportation_name.png
mapping_graph: media/mapping_transportation_name.png
sql_query: SELECT geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", ref, ref_length, network::text, class::text, subclass, layer, level, indoor FROM layer_transportation_name(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
This is the layer for labelling the highways. Only highways that are named `name=*` and are long enough
to place text upon appear. The OSM roads are stitched together if they contain the same name
to have better label placement than having many small linestrings.
For motorways you should use the `ref` field to label them while for other roads you should use `name`.

## Fields

### layer

Experimental feature! Filled only for steps and footways. Original
value of [`layer`](http://wiki.openstreetmap.org/wiki/Key:layer) tag.
### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the highway.

### level

Experimental feature! Filled only for steps and footways. Original
value of [`level`](http://wiki.openstreetmap.org/wiki/Key:level) tag.
### indoor

Experimental feature! Filled only for steps and footways. Original
value of [`indoor`](http://wiki.openstreetmap.org/wiki/Key:indoor) tag.

Possible values:

- `1`

### ref_length

Length of the `ref` field. Useful for having a shield icon as background for labeling motorways.

### subclass

Distinguish more specific classes of path:
Subclass is value of the
[`highway`](http://wiki.openstreetmap.org/wiki/Key:highway) (for paths).

Possible values:

- `pedestrian`
- `path`
- `footway`
- `cycleway`
- `steps`
- `bridleway`
- `corridor`
- `platform`

### name_de

German name `name:de` if available, otherwise `name` or `name:en`.

### name_en

English name `name:en` if available, otherwise `name`.

### ref

The OSM [`ref`](http://wiki.openstreetmap.org/wiki/Key:ref) tag of the motorway or its network.

### class

Distinguish between more and less important roads.

Possible values:

- `motorway`
- `trunk`
- `primary`
- `secondary`
- `tertiary`
- `minor`
- `service`
- `track`
- `path`
- `raceway`
- `rail`
- `transit`

### network

The network type derived mainly from [`network`](http://wiki.openstreetmap.org/wiki/Key:network) tag of the road.
See more info about [`us-*`](http://wiki.openstreetmap.org/wiki/Road_signs_in_the_United_States),
[`ca-transcanada`](https://en.wikipedia.org/wiki/Trans-Canada_Highway),
or [`gb-*`](http://wiki.openstreetmap.org/wiki/United_Kingdom_Tagging_Guidelines#UK_roads).

Possible values:

- `us-interstate`
- `us-highway`
- `us-state`
- `ca-transcanada`
- `gb-motorway`
- `gb-trunk`
- `road (default)`




