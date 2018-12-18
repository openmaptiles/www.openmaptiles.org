---
layout: page
category: layer
title: boundary
etl_graph: media/etl_boundary.png
mapping_graph: media/mapping_boundary.png
sql_query: SELECT geometry, admin_level, disputed, maritime FROM layer_boundary(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Contains administrative boundaries as linestrings.
Until z5 [Natural Earth data](http://www.naturalearthdata.com/downloads/)
is used after which OSM boundaries ([`boundary=administrative`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative)) are present from z6 to z14 (also for maritime boundaries with admin_level <= 2 at z4 and z5).
OSM data contains several [`admin_level`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level)
but for most styles it makes sense to just style `admin_level=2` and `admin_level=4`.

## Fields

### admin_level

OSM [admin_level](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level)
indicating the level of importance of this boundary.
The `admin_level` corresponds to the lowest `admin_level`
the line participates in.
At low zoom levels the Natural Earth boundaries are mapped to the equivalent admin levels.

### disputed

Mark with `1` if the border is disputed.

Possible values:

- `0`
- `1`

### maritime

Mark with `1` if it is a maritime border.

Possible values:

- `0`
- `1`




