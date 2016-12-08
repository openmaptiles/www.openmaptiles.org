---
layout: layer
title: place
etl_graph: media/etl_place.png
mapping_graph: media/mapping_place.png
sql_query: SELECT geometry, name, name_en, class, rank, capital FROM layer_place(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14, 1)
---
The place layer consists out of [countries](http://wiki.openstreetmap.org/wiki/Tag:place%3Dcountry),
[states](http://wiki.openstreetmap.org/wiki/Tag:place%3Dstate) and [cities](http://wiki.openstreetmap.org/wiki/Key:place).
Apart from the roads this is also one of the more important layers to create a beautiful map.
We suggest you use different font styles and sizes to create a text hierarchy.

## Fields

### name_en

The English `name:en` value or local `name` if not available.

### capital

The **capital** field marks the
[`admin_level`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level)
of the boundary the place is a capital of.

Possible values:

- `2`
- `4`

### class

description: |
    Original value of the
    [`place`](http://wiki.openstreetmap.org/wiki/Key:place) tag.
    Distinguish between continents, countries, states and
    places like settlements or smaller entities.
    Use **class** to separately style the different places and build
    a text hierarchy according to their importance.
values:
- continent
- country
- state
- city
- town
- village
- hamlet
- suburb
- neighbourhood
- isolated_dwelling

### rank

Countries, states and the most important cities all have a
**rank** to boost their importance on the map.
The **rank** field for counries and states ranges from
`1` to `6` while the **rank** field for cities ranges from
`1` to `10` for the most important cities
and continues from `10` serially based on the
local importance of the city (derived from population and city class).
You can use the **rank** to limit density of labels or improve
the text hierarchy.
The rank value is a combination of the Natural Earth
`scalerank`, `labelrank` and `datarank` values for countries
and states and for cities consists out of a shifted
Natural Earth `scalerank` combined with a local rank
within a grid for cities that do not have a Natural Earth `scalerank`.
### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the POI.




