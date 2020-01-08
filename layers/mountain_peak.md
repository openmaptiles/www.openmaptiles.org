---
layout: page
category: layer
title: mountain_peak
etl_graph: media/etl_mountain_peak.png
mapping_graph: media/mapping_mountain_peak.png
sql_query: SELECT osm_id, geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", class, ele, ele_ft, rank FROM layer_mountain_peak(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14, 1)
---
[Natural peaks](http://wiki.openstreetmap.org/wiki/Tag:natural%3Dpeak)

## Fields

### name_de

German name `name:de` if available, otherwise `name` or `name:en`.

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the peak.

### ele_ft

Elevation (`ele`) in feets.

### name_en

English name `name:en` if available, otherwise `name`.

### class

Use the **class** to differentiate between mountain peak and volcano.

Possible values:

- `peak`
- `volcano`

### rank

Rank of the peak within one tile (starting at 1 that is the most important peak).

### ele

Elevation (`ele`) in meters.




