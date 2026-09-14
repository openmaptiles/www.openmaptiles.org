---
title: water
---

![Water ETL Graph](/media/etl_water.png)
![Water Mapping Graph](/media/mapping_water.png)

```sql
SELECT id, geometry, class, intermittent, brunnel FROM layer_water(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
```

Water polygons representing oceans and lakes. Covered water areas are excluded (`covered=yes`).
At low zoom levels all water originates from Natural Earth. To get a more correct display of the South Pole you should also
style the covering ice shelves over the water.
On higher zoom levels water polygons from [OpenStreetMapData](http://osmdata.openstreetmap.de/) are used.
The polygons are split into many smaller polygons to improve rendering performance.
This, however, can lead to fewer rendering options in clients, since these boundaries show up. So you might not be
able to use border styling for ocean water features.

## Fields

### id

From zoom 6, OSM IDs are used. Up to zoom 5, Natural Earth lakes are used, with OSM IDs propagated instead of Natural Earth IDs.
For areas smaller than the planet, NE lakes keep their Natural Earth IDs.

### class

All water polygons from [OpenStreetMapData](http://osmdata.openstreetmap.de/) have the class `ocean`.
The water-covered areas of flowing water bodies with the [`water=river`](http://wiki.openstreetmap.org/wiki/Tag:water=river),
[`water=canal`](http://wiki.openstreetmap.org/wiki/Tag:water=canal),
[`water=stream`](http://wiki.openstreetmap.org/wiki/Tag:water=stream),
[`water=ditch`](http://wiki.openstreetmap.org/wiki/Tag:water=ditch), or
[`water=drain`](http://wiki.openstreetmap.org/wiki/Tag:water=drain) tags are classified as `river`. Wet and dry docks
tagged [`waterway=dock`](http://wiki.openstreetmap.org/wiki/Tag:waterway=dock) are classified as `dock`.
Various minor water bodies are classified as `pond`.
Swimming pools tagged [`leisure=swimming_pool`](https://wiki.openstreetmap.org/wiki/Tag:leisure=swimming_pool) are classified as `swimming_pool`.
All other water bodies are classified as `lake`.

Possible values:

- `dock`
- `river`
- `pond`
- `lake`
- `ocean`
- `swimming_pool`


### intermittent

Mark with `1` if it is an [intermittent](http://wiki.openstreetmap.org/wiki/Key:intermittent) water polygon.

Possible values:

- `0`
- `1`


### brunnel

Identifies the type of crossing as either a bridge or a tunnel.

Possible values:

- `bridge`
- `tunnel`





