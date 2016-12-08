---
layout: layer
title: aeroway
etl_graph: media/etl_aeroway.png
mapping_graph: media/mapping_aeroway.png
sql_query: SELECT geometry, class FROM layer_aeroway(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Aeroway polygons based of OpenStreetMap [aeroways](http://wiki.openstreetmap.org/wiki/Aeroways).
Airport buildings are contained in the **building** layer but all
other airport related polygons can be found in the **aeroway** layer.

## Fields

### class

The original value of the [`aeroway`](http://wiki.openstreetmap.org/wiki/Key:aeroway) tag.

Possible values:

- `aerodrome`
- `heliport`
- `runway`
- `helipad`
- `taxiway`
- `apron`




