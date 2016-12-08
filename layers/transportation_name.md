---
layout: page
title: transportation_name
etl_graph: media/etl_transportation_name.png
mapping_graph: media/mapping_transportation_name.png
sql_query: SELECT geometry, name, ref, ref_length, class::text FROM layer_transportation_name(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
This is the layer for labelling the highways. Only highways that are named `name=*` and are long enough
to place text upon appear. The OSM roads are stitched together if they contain the same name
to have better label placement than having many small linestrings.
For motorways you should use the `ref` field to label them while for other roads you should use `name`.

## Fields

### ref

The OSM [`ref`](http://wiki.openstreetmap.org/wiki/Key:ref) tag of the motorway or road.

### ref_length

Length of the `ref` field. Useful for having a shield icon as background for labeling motorways.

### class

Distinguish between more and less important roads.

Possible values:

- `motorway`
- `trunk`
- `primary`
- `secondary`
- `tertiary`
- `minor`
- `service`
- `track`
- `path`
- `raceway`
- `rail`
- `transit`

### network

The OSM [`network`](http://wiki.openstreetmap.org/wiki/Key:network) tag of the road.

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Highways#Names_and_references) value of the highway.




