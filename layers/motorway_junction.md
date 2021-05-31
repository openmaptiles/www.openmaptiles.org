---
layout: page
category: layer
title: motorway_junction
etl_graph: media/etl_motorway_junction.png
mapping_graph: media/mapping_motorway_junction.png
sql_query: SELECT osm_id, geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", ref FROM layer_motorway_junction(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14, 1)
---
[Motorway junctions](http://wiki.openstreetmap.org/wiki/Tag:highway%3Dmotorway_junction)

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) (not exit number) of the junction.

### name_en

English name `name:en` if available, otherwise `name`.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`.

### ref

The exit number.

