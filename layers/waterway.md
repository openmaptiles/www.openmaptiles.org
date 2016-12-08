---
layout: layer
title: waterway
etl_graph: media/etl_waterway.png
mapping_graph: media/mapping_waterway.png
sql_query: SELECT geometry, name, class FROM layer_waterway(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857 ), 14)
---
Rivers based of OpenStreetMap [waterways](http://wiki.openstreetmap.org/wiki/Waterways) for *z9* to *z14*
and Natural Earth rivers and lake centerlines from *z3* to *z8*.
Linestrings without a name or which are too short are filtered
out at low zoom levels. Waterways do no not have a `subclass` field.

## Fields

### name

The OSM [`name`](http://wiki.openstreetmap.org/wiki/Key:name) value of the waterway.
The `name` field is empty for NaturalEarth data until **z9** when OSM data is used.

### class

The original value of the [`waterway`](http://wiki.openstreetmap.org/wiki/Key:waterway) tag.
Can be one of [`stream`](http://wiki.openstreetmap.org/wiki/Tag:waterway%3Dstream),
[`river`](http://wiki.openstreetmap.org/wiki/Tag:waterway%3Driver),
[`canal`](http://wiki.openstreetmap.org/wiki/Tag:waterway%3Dcanal),
[`drain`](http://wiki.openstreetmap.org/wiki/Tag:waterway%3Ddrain),
[`ditch`](http://wiki.openstreetmap.org/wiki/Tag:waterway%3Dditch)`.




