---
layout: page
category: layer
title: water
etl_graph: media/etl_water.png
mapping_graph: media/mapping_water.png
sql_query: SELECT geometry, class FROM layer_water(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Water polygons representing oceans and lakes. Covered watered areas are excluded (`covered=yes`).
On low zoom levels all water originates from Natural Earth. To get a more correct display of the south pole you should also
style the covering ice shelves over the water.
On higher zoom levels water polygons from [OpenStreetMapData](http://openstreetmapdata.com/) are used.
The polygons are split into many smaller polygons to improve rendering performance.
This however can lead to less rendering options in clients since these boundaries show up. So you might not be
able to use border styling for ocean water features.

## Fields

### class

All water polygons from [OpenStreetMapData](http://openstreetmapdata.com/) have the class `ocean`.
Water bodies are classified as `lake` or `river` for water bodies with the [`waterway`](http://wiki.openstreetmap.org/wiki/Key:waterway) tag.

Possible values:

- `ocean`
- `lake`
- `river`




