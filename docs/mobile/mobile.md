---
layout: docs
category: mobile
title: Create a mobile app
description: Create a native mobile app for Android and iOS using the MapLibre SDK.
---

## Overview

Based on free OpenStreetMap data, it is possible to create beautiful, accurate and fast maps - with native vector rendering, and live customizable styling - directly on a mobile device. The native mobile rendering is fast and response to user touch interaction immediately.

The map tiles can be easily displayed in custom native mobile applications on Android or iOS or other platforms. The developers can load the map tiles online from a TileServer of a choice or implement offline maps in the app - displaying the maps from downloaded or bundled tile extracts.

## Native mobile apps

Our OpenStreetMap vector tiles are encoded in the widely used and openly documented [vector tile format](https://github.com/mapbox/vector-tile-spec). This means the tiles are compatible with all software tools implementing this format specification. The style definition for the design of the map may vary in different tools - our open styles are implemented in [GL Style](https://www.mapbox.com/mapbox-gl-js/style-spec/).

The [open-source Mapbox SDK for iOS](https://www.mapbox.com/ios-sdk/) and [SDK for Android](https://www.mapbox.com/android-sdk/) provides the most natural way how to display the tiles and styles in a mobile app natively.

The source code of the Mapbox SDKs is [available at GitHub](https://github.com/mapbox/mapbox-gl-native).

There are alternative open-source SDKs for native mobile apps as well, for example, TangramES or Carto/Nutiteq SDK.

### Sample app for Android and iOS

To demonstrate the capabilities of the SDK and show the performance of OpenMapTiles vector tiles made from OpenStreetMap we have developed a [sample mobile app](/mobile) for both Android and iOS.

[<img src='/img/mobile/banner_1.png' style="width:40%;"/>](/mobile)

These apps shows the vector map tiles displayed from a custom tile server, so you can choose a tile hosting service or implement your own. Map tiles can be also bundled with the mobile app or users can download a tileset for a region of their choice.

Displaying of the tiles directly from MBTiles, running in an offline environment, requires patching of Mapbox SDKs. We offer the [complete source code of the demo mobile app](https://openmaptiles.org/mobile-app/) to the interested developers to speed up the start of the development of their own commercial apps.

## Packed web applications

An alternative way for the development of multiplatform mobile apps is a use of the existing [web viewers](/viewers/) while using HTML, CSS, and JavaScript and packaging the web applications into native applications with a framework like [Apache Cordova](https://cordova.apache.org/).

The modern mobile phones support WebGL and maps are acceptably performant, however native apps are still faster and ensure better compatibility with various devices.

While developing the mobile apps in JavaScript users can also use native components such as Cordova app React Native.

## Desktop and embedded apps

For the development of native desktop applications and software for hardware appliances with embedded mapping systems powered by Linux and running completely offline with our vector tiles, one can use the open-source [QT SDK](https://github.com/mapbox/mapbox-gl-native/tree/master/platform/qt).

Mapbox GL Native does not compile (yet) on Microsoft Windows. So for fully multiplatform desktop apps with vector tile maps inside, the embedded web window (possibly with [CEF - Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) and enabled WebGL support) is still the best option.
