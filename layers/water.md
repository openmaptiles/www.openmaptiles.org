---
layout: page
category: layer
title: water
etl_graph: media/etl_water.png
mapping_graph: media/mapping_water.png
sql_query: SELECT geometry, class, intermittent, brunnel FROM layer_water(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Water polygons representing oceans and lakes. Covered watered areas are excluded (`covered=yes`).
On low zoom levels all water originates from Natural Earth. To get a more correct display of the south pole you should also
style the covering ice shelves over the water.
On higher zoom levels water polygons from [OpenStreetMapData](http://osmdata.openstreetmap.de/) are used.
The polygons are split into many smaller polygons to improve rendering performance.
This however can lead to less rendering options in clients since these boundaries show up. So you might not be
able to use border styling for ocean water features.

## Fields

### class

All water polygons from [OpenStreetMapData](http://osmdata.openstreetmap.de/) have the class `ocean`.
Water bodies are classified as `lake` or `river` for water bodies with the [`waterway`](http://wiki.openstreetmap.org/wiki/Key:waterway) tag.

Possible values:

- `lake`
- `dock`
- `river`
- `ocean`


### intermittent

Mark with `1` if it is an [intermittent](http://wiki.openstreetmap.org/wiki/Key:intermittent) water polygon.

Possible values:

- `0`
- `1`


### brunnel

Identifies the type of crossing as either a bridge or a tunnel.

Possible values:

- `bridge`
- `tunnel`





