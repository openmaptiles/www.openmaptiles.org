---
layout: page
category: layer
title: park
etl_graph: media/etl_park.png
mapping_graph: media/mapping_park.png
sql_query: SELECT geometry, class, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", rank FROM layer_park(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14, 1)
---
The park layer contains parks from OpenStreetMap tagged with
[`boundary=national_park`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dnational_park),
[`boundary=protected_area`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dprotected_area),
or [`leisure=nature_reserve`](http://wiki.openstreetmap.org/wiki/Tag:leisure%3Dnature_reserve).

## Fields

### class

Use the **class** to differentiate between different parks.
The class for `boundary=protected_area` parks is the lower-case of the
[`protection_title`](http://wiki.openstreetmap.org/wiki/key:protection_title)
value with blanks replaced by `_`.
`national_park` is the class of `protection_title=National Park` and `boundary=national_park`.
`nature_reserve` is the class of `protection_title=Nature Reserve` and `leisure=nature_reserve`.
The class for other [`protection_title`](http://wiki.openstreetmap.org/wiki/key:protection_title) 
values is similarly assigned.

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the park (point features only).

### name_en

English name `name:en` if available, otherwise `name` (point features only).

### name_de

German name `name:de` if available, otherwise `name` or `name:en` (point features only).

### rank

Rank of the park within one tile, starting at 1 that is the most important park (point features only).




