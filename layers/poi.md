---
layout: page
category: layer
title: poi
etl_graph: media/etl_poi.png
mapping_graph: media/mapping_poi.png
sql_query: SELECT osm_id, geometry, name, name_en, name_de, NULLIF(tags->'name_int', '') AS "name_int", NULLIF(tags->'name:latin', '') AS "name:latin", NULLIF(tags->'name:nonlatin', '') AS "name:nonlatin", class, subclass, agg_stop, rank FROM layer_poi(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14, 1)
---
[Points of interests](http://wiki.openstreetmap.org/wiki/Points_of_interest) containing
a of a variety of OpenStreetMap tags. Mostly contains amenities, sport, shop and tourist POIs.

## Fields

### name_de

German name `name:de` if available, otherwise `name` or `name:en`.

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the POI.

### name_en

English name `name:en` if available, otherwise `name`.

### agg_stop

Experimental feature! Indicates main platform of public transport
stops (buses, trams, and subways). Grouping of platforms is
implemented using
[`uic_ref`](http://wiki.openstreetmap.org/wiki/Key:uic_ref) tag that
 is not used worldwide.

Possible values:

- `1`

### class

More general classes of POIs. If there is no more general `class` for the `subclass`
this field will contain the same value as `subclass`.
But for example for schools you only need to style the class `school` to filter the subclasses `school`
and `kindergarten`. Or use the class `shop` to style all shops.

### rank

The POIs are ranked ascending according to their importance within a grid. The `rank` value shows the
local relative importance of a POI within it's cell in the grid. This can be used to reduce label density at *z14*.
Since all POIs already need to be contained at *z14* you can use `less than rank=10` epxression to limit
POIs. At some point like *z17* you can show all POIs.

### subclass

Original value of either the
[`amenity`](http://wiki.openstreetmap.org/wiki/Key:amenity),
[`leisure`](http://wiki.openstreetmap.org/wiki/Key:leisure),
[`landuse`](http://wiki.openstreetmap.org/wiki/Key:landuse),
[`railway`](http://wiki.openstreetmap.org/wiki/Key:railway),
[`station`](http://wiki.openstreetmap.org/wiki/Key:station),
[`sport`](http://wiki.openstreetmap.org/wiki/Key:sport),
[`tourism`](http://wiki.openstreetmap.org/wiki/Key:tourism),
[`information`](http://wiki.openstreetmap.org/wiki/Key:information),
[`religion`](http://wiki.openstreetmap.org/wiki/Key:religion)
or [`shop`](http://wiki.openstreetmap.org/wiki/Key:shop)
tag.  Use this to do more precise styling.



