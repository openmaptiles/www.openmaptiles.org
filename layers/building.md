---
layout: page
category: layer
title: building
etl_graph: media/etl_building.png
mapping_graph: media/mapping_building.png
sql_query: SELECT osm_id, geometry, render_height, render_min_height, colour, hide_3d FROM layer_building(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
---
All [OSM Buildings](http://wiki.openstreetmap.org/wiki/Buildings). All building tags are imported ([`building=*`](http://wiki.openstreetmap.org/wiki/Key:building)).
Only buildings with tag location:underground are excluded.

## Fields

### render_height

An approximated height from levels and height of the building or building:part.

### render_min_height

An approximated height from minimum levels or minimum height of the bottom of the building or building:part.

### colour

Colour

### hide_3d

If True, building (part) should not be rendered in 3D. Currently, [building outlines](https://wiki.openstreetmap.org/wiki/Simple_3D_buildings) are marked as hide_3d.




