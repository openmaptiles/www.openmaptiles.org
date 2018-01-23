---
layout: page
category: layer
title: landcover
etl_graph: media/etl_landcover.png
mapping_graph: media/mapping_landcover.png
sql_query: SELECT geometry, class, subclass FROM layer_landcover(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Landcover is used to describe the physical material at the surface of the earth. At lower zoom levels this is
from Natural Earth data for glaciers and ice shelves and at higher zoom levels the landcover is [implied by OSM tags](http://wiki.openstreetmap.org/wiki/Landcover). The most common use case for this layer
  is to style wood (`class=wood`) and grass (`class=grass`) areas.

## Fields

### class

Use the **class** to assign natural colors for **landcover**.

Possible values:

- `farmland`
- `ice`
- `wood`
- `grass`
- `wetland`

### subclass

Use **subclass** to do more precise styling.
Original value of either the
[`natural`](http://wiki.openstreetmap.org/wiki/Key:natural),
[`landuse`](http://wiki.openstreetmap.org/wiki/Key:landuse),
[`leisure`](http://wiki.openstreetmap.org/wiki/Key:leisure),
or [`wetland`](http://wiki.openstreetmap.org/wiki/Key:wetland) tag.

Possible values:

- `allotments`
- `farm`
- `farmland`
- `orchard`
- `plant_nursery`
- `vineyard`
- `grass`
- `grassland`
- `glacier`
- `meadow`
- `forest`
- `village_green`
- `recreation_ground`
- `park`
- `garden`
- `wetland`
- `grassland`
- `bog`
- `swamp`
- `wet_meadow`
- `marsh`
- `reedbed`
- `saltern`
- `tidalflat`
- `saltmarsh`
- `mangrove`




