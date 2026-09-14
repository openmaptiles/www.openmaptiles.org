---
title: housenumber
---

![House number ETL Graph](/media/etl_housenumber.png)
![House number Mapping Graph](/media/mapping_housenumber.png)

```sql
SELECT geometry, housenumber FROM layer_housenumber(ST_SetSRID('BOX3D(-20037508.34 -20037508.34, 20037508.34 20037508.34)'::box3d, 3857), 14)
```

Everything in OpenStreetMap that contains an `addr:housenumber` tag, useful for labeling house numbers on a map.
This adds significant size to *z14*. For buildings, the centroid of the building is used as the housenumber.
Duplicates within a tile are dropped if they have the same street/block_number (records without a `name` tag are prioritized for preservation).

## Fields

### housenumber

Value of the [`addr:housenumber`](http://wiki.openstreetmap.org/wiki/Key:addr) tag. If there are multiple values separated by semicolons, the first and last values are joined with a dash.




