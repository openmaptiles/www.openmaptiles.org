---
layout: layer
title: park
etl_graph: media/etl_park.png
mapping_graph: media/mapping_park.png
sql_query: SELECT geometry, class FROM layer_park(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
The park layer contains parks from OpenStreetMap tagged with either [`boundary=national_park`](http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dnational_park) or [`leisure=nature_reserve`](http://wiki.openstreetmap.org/wiki/Tag:leisure%3Dnature_reserve).

## Fields

### class

Use the **class** to differentiate between different parks.

Possible values:

- `national_park`
- `nature_reserve`




