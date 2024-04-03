---
layout: page
category: layer
title: aerodrome_label
etl_graph: media/etl_aerodrome_label.png
mapping_graph: media/mapping_aerodrome_label.png
sql_query: SELECT id, geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", class, iata, icao, ele, ele_ft FROM layer_aerodrome_label(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
---
[Aerodrome labels](http://wiki.openstreetmap.org/wiki/Tag:aeroway%3Daerodrome)

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the aerodrome. Language-specific values are in `name:xx`.

### name_en

English name `name:en` if available, otherwise `name`. This is deprecated and will be removed in a future release in favor of `name:en`.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`. This is deprecated and will be removed in a future release in favor of `name:de`.

### class

Distinguish between more and less important aerodromes.
Class is derived from the value of
[`aerodrome`](http://wiki.openstreetmap.org/wiki/Proposed_features/Aerodrome)
and `aerodrome:type` tags.

Possible values:

- `international`
- `public`
- `regional`
- `military`
- `private`
- `other`


### iata

3-character code issued by the IATA.

### icao

4-letter code issued by the ICAO.

### ele

Elevation (`ele`) in meters.

### ele_ft

Elevation (`ele`) in feets.




