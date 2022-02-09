---
layout: page
category: layer
title: aeroway
etl_graph: media/etl_aeroway.png
mapping_graph: media/mapping_aeroway.png
sql_query: SELECT geometry, ref, class FROM layer_aeroway(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
---
Aeroway polygons based of OpenStreetMap [aeroways](http://wiki.openstreetmap.org/wiki/Aeroways).
Airport buildings are contained in the **building** layer but all
other airport related polygons can be found in the **aeroway** layer.

## Fields

### ref

The OSM [`ref`](http://wiki.openstreetmap.org/wiki/Key:ref) tag of the runway/taxiway.

### class

The original value of
[`aeroway`](http://wiki.openstreetmap.org/wiki/Key:aeroway) or
`area:aeroway` tag.

Possible values:

- `aerodrome`
- `heliport`
- `runway`
- `helipad`
- `taxiway`
- `apron`
- `gate`





