---
layout: page
category: layer
title: transportation
etl_graph: media/etl_transportation.png
mapping_graph: media/mapping_transportation.png
sql_query: SELECT geometry, class, subclass, network, oneway, ramp, brunnel, service, access, toll, expressway, layer, level, indoor, bicycle, foot, horse, mtb_scale, surface FROM layer_transportation(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
---
**transportation** contains roads, railways, aerial ways, and shipping
 lines.
This layer is directly derived from the OSM road hierarchy.
At lower zoom levels major highways from Natural Earth are used.
It contains all roads from motorways to primary, secondary and
tertiary roads to residential roads and
foot paths. Styling the roads is the most essential part of the map.
The `transportation` layer also contains polygons for features like plazas.

## Fields

### class

Distinguish between more and less important roads or railways and roads under construction.
Class is derived from the value of the
[`highway`](http://wiki.openstreetmap.org/wiki/Key:highway),
[`construction`](http://wiki.openstreetmap.org/wiki/Key:construction),
[`railway`](http://wiki.openstreetmap.org/wiki/Key:railway),
[`aerialway`](http://wiki.openstreetmap.org/wiki/Key:aerialway),
[`route`](http://wiki.openstreetmap.org/wiki/Key:route) tag (for
shipping ways),
[`busway`](https://wiki.openstreetmap.org/wiki/Key:busway), or
[`man_made`](http://wiki.openstreetmap.org/wiki/Key:man_made).

Possible values:

- `motorway`
- `trunk`
- `primary`
- `secondary`
- `tertiary`
- `minor`
- `path`
- `service`
- `track`
- `raceway`
- `busway`
- `bus_guideway`
- `ferry`
- `motorway_construction`
- `trunk_construction`
- `primary_construction`
- `secondary_construction`
- `tertiary_construction`
- `minor_construction`
- `path_construction`
- `service_construction`
- `track_construction`
- `raceway_construction`


### subclass

Distinguish more specific classes of railway and path:
Subclass is value of the
[`railway`](http://wiki.openstreetmap.org/wiki/Key:railway),
[`highway`](http://wiki.openstreetmap.org/wiki/Key:highway) (for paths), or
[`public_transport`](http://wiki.openstreetmap.org/wiki/Key:public_transport) (for platforms) tag.

Possible values:

- `rail`
- `narrow_gauge`
- `preserved`
- `funicular`
- `subway`
- `light_rail`
- `monorail`
- `tram`
- `pedestrian`
- `path`
- `footway`
- `cycleway`
- `steps`
- `bridleway`
- `corridor`
- `platform`
- `ferry (DEPRECATED - use class)`


### network

The network type derived mainly from [`network`](http://wiki.openstreetmap.org/wiki/Key:network) tag of the road.
See more info about [`us-*`](http://wiki.openstreetmap.org/wiki/Road_signs_in_the_United_States),
[`ca-transcanada`](https://en.wikipedia.org/wiki/Trans-Canada_Highway),
[`gb-*`](http://wiki.openstreetmap.org/wiki/United_Kingdom_Tagging_Guidelines#UK_roads),
or [`ie-*`](http://wiki.openstreetmap.org/wiki/Ireland/Roads).

### brunnel

Mark whether way is a tunnel or bridge.

Possible values:

- `bridge`
- `tunnel`
- `ford`


### oneway

Mark with `1` whether way is a oneway in the direction of the way,
with `-1` whether way is a oneway in the opposite direction of the way
or not a oneway with `0`.

Possible values:

- `1`
- `-1`


### ramp

Mark with `1` whether way is a ramp (link or steps)
or not with `0`.

Possible values:

- `1`


### service

Original value of the [`service`](http://wiki.openstreetmap.org/wiki/Key:service) tag.

Possible values:

- `spur`
- `yard`
- `siding`
- `crossover`
- `driveway`
- `alley`
- `parking_aisle`


### access

Access restrictions on this road.  Supported values of the
[`access`](http://wiki.openstreetmap.org/wiki/Key:access) tag are `no` and `private`,
which resolve to `no`.

Possible values:

- `False`


### toll

Whether this is a toll road, based on the [`toll`](http://wiki.openstreetmap.org/wiki/Key:toll) tag.

Possible values:

- `0`
- `1`


### expressway

Whether this is an expressway, based on the [`expressway`](http://wiki.openstreetmap.org/wiki/Key:expressway) tag.

Possible values:

- `1`


### layer

Original value of the [`layer`](http://wiki.openstreetmap.org/wiki/Key:layer) tag.

### level

Experimental feature! Filled only for steps and footways. Original
value of the [`level`](http://wiki.openstreetmap.org/wiki/Key:level) tag.

### indoor

Experimental feature! Filled only for steps and footways. Original
value of the [`indoor`](http://wiki.openstreetmap.org/wiki/Key:indoor) tag.

Possible values:

- `1`


### bicycle

Original value of the [`bicycle`](http://wiki.openstreetmap.org/wiki/Key:bicycle) tag (highways only).

### foot

Original value of the [`foot`](http://wiki.openstreetmap.org/wiki/Key:foot) tag (highways only).

### horse

Original value of the [`horse`](http://wiki.openstreetmap.org/wiki/Key:horse) tag (highways only).

### mtb_scale

Original value of the [`mtb:scale`](http://wiki.openstreetmap.org/wiki/Key:mtb:scale) tag (highways only).

### surface

Values of [`surface`](https://wiki.openstreetmap.org/wiki/Key:surface) tag devided into 2 groups `paved` (paved, asphalt, cobblestone, concrete, concrete:lanes, concrete:plates, metal, paving_stones, sett, unhewn_cobblestone, wood) and `unpaved` (unpaved, compacted, dirt, earth, fine_gravel, grass, grass_paver, gravel, gravel_turf, ground, ice, mud, pebblestone, salt, sand, snow, woodchips).

Possible values:

- `paved`
- `unpaved`





