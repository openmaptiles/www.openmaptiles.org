---
layout: page
category: layer
title: transportation_name
etl_graph: media/etl_transportation_name.png
mapping_graph: media/mapping_transportation_name.png
sql_query: SELECT geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", ref, ref_length, network::text, class::text, subclass, brunnel, layer, level, indoor FROM layer_transportation_name(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
This is the layer for labelling the highways. Only highways that are named `name=*` and are long enough
to place text upon appear. The OSM roads are stitched together if they contain the same name
to have better label placement than having many small linestrings.
For motorways you should use the `ref` field to label them while for other roads you should use `name`.

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the highway.

### name_en

English name `name:en` if available, otherwise `name`.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`.

### ref

The OSM [`ref`](http://wiki.openstreetmap.org/wiki/Key:ref) tag of the motorway or its network.

### ref_length

Length of the `ref` field. Useful for having a shield icon as background for labeling motorways.

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

### route_*

The routes that this road is a part of.  If this road is a part of multiple routes
([a route concurrency](https://en.wikipedia.org/wiki/Concurrency_(road))), the most important route will be
listed under `route_1`, the next most important route will be listed under `route_2`, and so forth.  Up to
six concurrencies will be set.

Each route will be in the form `network=ref`, using the `network` and `ref` tags present in the route relation
that the road is a member of.

Example values:

- `CA:transcanada=105` - Trans-Canada 105
- `US:I=95` - US Interstate 95
- `e-road:E 13` - European route E13

### class

Distinguish between more and less important roads and roads under construction.

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
- `motorway_construction`
- `trunk_construction`
- `primary_construction`
- `secondary_construction`
- `tertiary_construction`
- `minor_construction`
- `service_construction`
- `track_construction`
- `path_construction`
- `raceway_construction`
- `rail`
- `transit`


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


### brunnel

Mark whether way is a bridge, a tunnel or a ford.

Possible values:

- `bridge`
- `tunnel`
- `ford`


### level

Experimental feature! Filled only for steps and footways. Original
value of [`level`](http://wiki.openstreetmap.org/wiki/Key:level) tag.

### layer

Experimental feature! Filled only for steps and footways. Original
value of [`layer`](http://wiki.openstreetmap.org/wiki/Key:layer) tag.

### indoor

Experimental feature! Filled only for steps and footways. Original
value of [`indoor`](http://wiki.openstreetmap.org/wiki/Key:indoor) tag.

Possible values:

- `1`





