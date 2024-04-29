---
layout: page
category: layer
title: transportation_name
etl_graph: media/etl_transportation_name.png
mapping_graph: media/mapping_transportation_name.png
sql_query: SELECT geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", ref, ref_length, network::text, class::text, subclass, brunnel, layer, level, indoor, route_1_network, route_1_ref, route_1_name, route_1_colour, route_2_network, route_2_ref, route_2_name, route_2_colour, route_3_network, route_3_ref, route_3_name, route_3_colour, route_4_network, route_4_ref, route_4_name, route_4_colour, route_5_network, route_5_ref, route_5_name, route_5_colour, route_6_network, route_6_ref, route_6_name, route_6_colour FROM layer_transportation_name(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
---
This is the layer for labelling the highways. Only highways that are named `name=*` and are long enough
to place text upon appear. The OSM roads are stitched together if they contain the same name
to have better label placement than having many small linestrings.
For motorways you should use the `ref` field to label them while for other roads you should use `name`.

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the highway.

### name_en

English name `name:en` if available, otherwise `name`. This is deprecated and will be removed in a future release in favor of `name:en`.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`. This is deprecated and will be removed in a future release in favor of `name:de`.

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
- `ca-provincial-arterial`
- `ca-provincial`
- `gb-motorway`
- `gb-trunk`
- `gb-primary`
- `ie-motorway`
- `ie-national`
- `ie-regional`
- `road (default)`


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
- `motorway_junction`


### subclass

Distinguish more specific classes of path:
Subclass is value of the
[`highway`](http://wiki.openstreetmap.org/wiki/Key:highway) (for paths),
and "junction" for [`motorway junctions`](http://wiki.openstreetmap.org/wiki/Tag:highway=motorway_junction).

Possible values:

- `pedestrian`
- `path`
- `footway`
- `cycleway`
- `steps`
- `bridleway`
- `corridor`
- `platform`
- `junction`


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


### route_1_network

1st route concurrency network.

### route_1_ref

1st route concurrency ref.

### route_1_name

1st route concurrency name.

### route_1_colour

1st route concurrency colour.

### route_2_network

2nd route concurrency network.

### route_2_ref

2nd route concurrency ref.

### route_2_name

2nd route concurrency name.

### route_2_colour

2nd route concurrency colour.

### route_3_network

3rd route concurrency network.

### route_3_ref

3rd route concurrency ref.

### route_3_name

3rd route concurrency name.

### route_3_colour

3rd route concurrency colour.

### route_4_network

4th route concurrency network.

### route_4_ref

4th route concurrency ref.

### route_4_name

4th route concurrency name.

### route_4_colour

4th route concurrency colour.

### route_5_network

5th route concurrency network.

### route_5_ref

5th route concurrency ref.

### route_5_name

5th route concurrency name.

### route_5_colour

5th route concurrency colour.

### route_6_network

6th route concurrency network.

### route_6_ref

6th route concurrency ref.

### route_6_name

6th route concurrency name.

### route_6_colour

6th route concurrency colour.




