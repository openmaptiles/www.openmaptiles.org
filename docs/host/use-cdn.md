---
layout: docs
category: host
title: Use the OpenMapTiles.com CDN
description: Use the public CDN
---

**[OpenMapTiles.com](https://openmaptiles.com/hosting/)** provides a free CDN for non-commercial
and demonstration purposes.

### Sign In

Head over to [OpenMapTiles.com](https://openmaptiles.com/hosting/) and sign in using your GitHub, Google or mail account.
In the **hosting** section request a new key for your application.

![Request a access key](/media/openmaptiles_com_request_key.png)

Once you click on an access key you get to a fast public [Tileserver GL](/docs/host/tileserver-gl) endpoint.
There you can access the TileJSON endpoint of the latest OpenMapTiles (or other data sources).

![Public Tileserver GL endpoint](/media/openmaptiles_com_endpoint.png)

Copy the TileJSON endpoint and reference it in the `url` of your Mapbox GL style specification `source`.

Copy the TileJSON endpoint and point the
[vector data source](https://www.mapbox.com/mapbox-gl-style-spec/#sources) of your style
to it.

```json
"openmaptiles": {
  "type": "vector",
  "url": "https://free.tilehosting.com/data/v3.json?key={access_key}"
}
```
