---
layout: docs
category: host
title: Serve maps with MapTiler Server
description: Serve raster and vector tiles with an open-source MapTiler Server
order: 2
---
## MapTiler Server

**The easiest way how to deploy world basemap powered by OpenStreetMap.**

### Download and install

Download an installer for your system:

<a class="btn" href="https://www.maptiler.com/server/download/">Server Download</a>

On Windows, open the installer and follow the installation wizard.

On Linux, install with:

- (DEB) `sudo dpkg -i maptiler-server-x.x.x.deb`
- (RPM) `sudo rpm -i maptiler-server-x.x.x.rpm`

### 2. Start server

Windows: Launch the installed application

Linux: Run directly with `maptiler-server` or as system service `maptiler-server-servicify`.

### 3. Add data and run administration

Put MBTiles into the server's work directory and visit the web administration at **`http://localhost:3560/admin`** in your browser.

#### More articles

[How to run MapTiler Server on Linux](https://documentation.maptiler.com/hc/en-us/articles/4404723578897-How-to-run-MapTiler-Server-on-Linux)

[How to run MapTiler Server on Windows](https://documentation.maptiler.com/hc/en-us/articles/360020806497-How-to-run-MapTiler-Server-on-Windows)

[How to run MapTiler Server on macOS](https://documentation.maptiler.com/hc/en-us/articles/360020949778-How-to-run-MapTiler-Server-on-macOS)
