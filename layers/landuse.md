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
[`amenity`](http://wiki.openstreetmap.org/wiki/Key:amenity),
[`landuse`](http://wiki.openstreetmap.org/wiki/Key:landuse),
or [`leisure`](http://wiki.openstreetmap.org/wiki/Key:leisure) tag.

Possible values:

- `school`
- `university`
- `kindergarten`
- `college`
- `library`
- `hospital`
- `railway`
- `cemetery`
- `military`
- `residential`
- `commercial`
- `industrial`
- `retail`
- `stadium`




