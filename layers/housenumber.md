---
layout: page
title: housenumber
etl_graph: media/etl_housenumber.png
mapping_graph: media/mapping_housenumber.png
sql_query: SELECT geometry, housenumber FROM layer_housenumber(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Everything in OpenStreetMap which contains a `addr:housenumber` tag useful for labelling housenumbers on a map.
This adds significant size to *z14*. For buildings the centroid of the building is used as housenumber.

## Fields

### housenumber

Value of the [`addr:housenumber`](http://wiki.openstreetmap.org/wiki/Key:addr) tag.




