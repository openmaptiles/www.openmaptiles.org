---
layout: page
title: water_name
etl_graph: media/etl_water_name.png
mapping_graph: media/mapping_water_name.png
sql_query: SELECT geometry, name, name_en, class FROM layer_water_name(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Lake center lines for labelling lake bodies.
This is based of the [osm-lakelines](https://github.com/lukasmartinelli/osm-lakelines) project
which derives nice centerlines from OSM water bodies. Only the most important lakes contain labels.

## Fields

### name_en

The english `name:en` value if available.

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the water body.

### class

At the moment only `lake` since no ocean parts are labelled. *Reserved for future use*.




