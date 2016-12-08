---
layout: layer
title: boundary
etl_graph: media/etl_boundary.png
mapping_graph: media/mapping_boundary.png
---
Contains administrative boundaries as linestrings (no maritime boundaries yet) as linestrings.
Until z7 [Natural Earth data](http://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-0-countries/)
is used after which OSM boundaries ([`boundary=administrative`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative)) are present from z8 to z14.
OSM data contains all [`admin_level`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level)
but for most styles it makes sense to just style `admin_level=2` and `admin_level=4`.
## Fields

### admin_level

OSM [admin_level](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level)
indicating the level of importance of this boundary.
The `admin_level` corresponds to the lowest `admin_level`
the line participates in.
At low zoom levels the Natural Earth boundaries are mapped to the equivalent admin levels.

### disputed

Mark with `1` if the boundary is disputed.

Possible values:

- `0`
- `1`




