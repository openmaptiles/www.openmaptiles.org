---
title: waterway
---

![Waterway ETL Graph](/media/etl_waterway.png)
![Waterway Mapping Graph](/media/mapping_waterway.png)

```sql
SELECT geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", class, brunnel, intermittent FROM layer_waterway(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
```

OpenStreetMap [waterways](https://wiki.openstreetmap.org/wiki/Waterways) for higher zoom levels (z9 and more)
and Natural Earth rivers and lake centerlines for low zoom levels (z3-z8).
Linestrings that have no name or are too short are filtered
out at low zoom levels.
Up to z11, only the `river` class is present; at z12, `canal` is also generated;
starting at z13, no generalization by `class` is applied.
Waterways do not have a `subclass` field.

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the waterway. Language-specific values are in `name:xx`.
The `name` field may be empty for Natural Earth data or at lower zoom levels.

### name_en

English name `name:en` if available, otherwise `name`. This is deprecated and will be removed in a future release in favor of `name:en`.

### name_de

German name `name:de` if available, otherwise `name` or `name:en`. This is deprecated and will be removed in a future release in favor of `name:de`.

### class

The original value of the [`waterway`](http://wiki.openstreetmap.org/wiki/Key:waterway) tag.

Possible values:

- `stream`
- `river`
- `canal`
- `drain`
- `ditch`


### brunnel

Mark whether the way is a tunnel or bridge.

Possible values:

- `bridge`
- `tunnel`


### intermittent

Mark with `1` if it is an [intermittent](http://wiki.openstreetmap.org/wiki/Key:intermittent) waterway.

Possible values:

- `0`
- `1`





