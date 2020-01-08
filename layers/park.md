---
layout: page
category: layer
title: park
etl_graph: media/etl_park.png
mapping_graph: media/mapping_park.png
sql_query: SELECT geometry, class, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", rank FROM layer_park(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14, 1)
---
The park layer contains parks from OpenStreetMap tagged with either [`boundary=national_park`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dnational_park) or [`leisure=nature_reserve`](http://wiki.openstreetmap.org/wiki/Tag:leisure%3Dnature_reserve).

## Fields

### name_en

English name `name:en` if available, otherwise `name` (point features only).

### name_de

German name `name:de` if available, otherwise `name` or `name:en` (point features only).

### class

Use the **class** to differentiate between different parks.

Possible values:

- `national_park`
- `nature_reserve`

### rank

Rank of the park within one tile, starting at 1 that is the most important park (point features only).

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the park (point features only).




