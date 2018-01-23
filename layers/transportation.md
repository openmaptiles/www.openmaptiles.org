---
layout: page
category: layer
title: transportation
etl_graph: media/etl_transportation.png
mapping_graph: media/mapping_transportation.png
sql_query: SELECT geometry, class, subclass, oneway, ramp, brunnel, service, layer, level, indoor FROM layer_transportation(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
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

### layer

Experimental feature! Filled only for steps and footways. Original
value of [`layer`](http://wiki.openstreetmap.org/wiki/Key:layer) tag.
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

### level

Experimental feature! Filled only for steps and footways. Original
value of [`level`](http://wiki.openstreetmap.org/wiki/Key:level) tag.
### brunnel

Mark whether way is a tunnel or bridge.

Possible values:

- `bridge`
- `tunnel`
- `ford`

### indoor

Experimental feature! Filled only for steps and footways. Original
value of [`indoor`](http://wiki.openstreetmap.org/wiki/Key:indoor) tag.

Possible values:

- `1`

### ramp

Mark with `1` whether way is a ramp (link or steps)
or not with `0`.

Possible values:

- `0`
- `1`

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

### oneway

Mark with `1` whether way is a oneway (in the direction of the way)
or not with `0`.

Possible values:

- `0`
- `1`

### class

Distinguish between more and less important roads or railways.
Class is derived from the value of the
[`highway`](http://wiki.openstreetmap.org/wiki/Key:highway),
[`railway`](http://wiki.openstreetmap.org/wiki/Key:railway),
[`aerialway`](http://wiki.openstreetmap.org/wiki/Key:aerialway), or
[`route`](http://wiki.openstreetmap.org/wiki/Key:route) tag (for
shipping ways).

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
- `cable_car`
- `ferry`




