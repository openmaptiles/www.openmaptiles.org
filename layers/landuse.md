---
layout: page
category: layer
title: landuse
etl_graph: media/etl_landuse.png
mapping_graph: media/mapping_landuse.png
sql_query: SELECT geometry, class FROM layer_landuse(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Landuse is used to describe use of land by humans. At lower zoom levels this is
from Natural Earth data for residential (urban) areas and at higher zoom levels mostly OSM `landuse` tags.

## Fields

### class

Use the **class** to assign special colors to areas.
Original value of either the
[`landuse`](http://wiki.openstreetmap.org/wiki/Key:landuse),
[`amenity`](http://wiki.openstreetmap.org/wiki/Key:amenity),
[`leisure`](http://wiki.openstreetmap.org/wiki/Key:leisure),
[`tourism`](http://wiki.openstreetmap.org/wiki/Key:tourism),
[`place`](http://wiki.openstreetmap.org/wiki/Key:place)
or [`waterway`](http://wiki.openstreetmap.org/wiki/Key:waterway) tag.

Possible values:

- `railway`
- `cemetery`
- `military`
- `residential`
- `commercial`
- `industrial`
- `retail`
- `bus_station`
- `school`
- `university`
- `kindergarten`
- `college`
- `library`
- `hospital`
- `stadium`
- `pitch`
- `playground`
- `track`
- `theme_park`
- `zoo`
- `suburb`
- `neighbourhood`
- `dam`




