---
layout: page
category: layer
title: poi
etl_graph: media/etl_poi.png
mapping_graph: media/mapping_poi.png
sql_query: SELECT geometry, name, name_en, class, subclass, rank FROM layer_poi(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14, 1)
---
[Points of interests](http://wiki.openstreetmap.org/wiki/Points_of_interest) containing
a of a variety of OpenStreetMap tags. Mostly contains amenities, sport, shop and tourist POIs.

## Fields

### name_en

The english `name:en` value if available.

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
[`sport`](http://wiki.openstreetmap.org/wiki/Key:sport),
[`tourism`](http://wiki.openstreetmap.org/wiki/Key:tourism)
or [`shop`](http://wiki.openstreetmap.org/wiki/Key:shop)
tag.  Use this to do more precise styling.
### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the POI.




