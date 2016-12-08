---
layout: layer
title: transportation
etl_graph: media/etl_transportation.png
mapping_graph: media/mapping_transportation.png
---
**transportation** contains roads and railways.
This layer is directly derived from the OSM road hierarchy.
Only at zoom level 4 to 6 some major highways from Natural Earth
are used.
It contains all roads from motorways to primary, secondary and
tertiary roads to residential roads and
foot paths. Styling the roads is the most essential part of the map.
The `transportation` layer also contains polygons for things like plazas.
## Fields

### brunnel

Mark whether way is a tunnel or bridge.

Possible values:

- `bridge`
- `tunnel`
- `ford`

### ramp

Mark with `1` whether way is a ramp (link or steps)
or not with `0`.

Possible values:

- `0`
- `1`

### class

Distinguish between more and less important roads or railways.
Class is derived from the value of the
[`highway`](http://wiki.openstreetmap.org/wiki/Key:highway) or
[`railway`](http://wiki.openstreetmap.org/wiki/Key:railway) tag.

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

### oneway

Mark with `1` whether way is a oneway (in the direction of the way)
or not with `0`.

Possible values:

- `0`
- `1`




