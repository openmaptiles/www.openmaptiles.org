---
layout: page
category: layer
title: waterway
etl_graph: media/etl_waterway.png
mapping_graph: media/mapping_waterway.png
sql_query: SELECT geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", class FROM layer_waterway(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
OpenStreetMap [waterways](http://wiki.openstreetmap.org/wiki/Waterways) for higher zoom levels
and Natural Earth rivers and lake centerlines for low zoom levels.
Linestrings without a name or which are too short are filtered
out at low zoom levels. Waterways do no not have a `subclass` field.

## Fields

### name_en

English name `name:en` if available, otherwise `name`.

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the waterway.
The `name` field may be empty for NaturalEarth data or at lower zoom levels.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`.

### class

The original value of the [`waterway`](http://wiki.openstreetmap.org/wiki/Key:waterway) tag.

Possible values:

- `stream`
- `river`
- `canal`
- `drain`
- `ditch`




