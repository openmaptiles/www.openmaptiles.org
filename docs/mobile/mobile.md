---
layout: docs
category: mobile
title: Create a mobile app
description: Create a native mobile app for Android and iOS using the MapLibre SDK.
---

## Overview

Based on free OpenStreetMap data, it is possible to create beautiful, accurate and fast maps - with native vector rendering, and live customizable styling - directly on a mobile device. The native mobile rendering is fast and responds to user touch interaction immediately.

The map tiles can be easily displayed in custom native mobile applications on Android, iOS, or other platforms. The developers can load map tiles online from any [vector maps provider](https://www.maptiler.com/cloud/), from an [on-premises map server](https://www.maptiler.com/server/), or implement [offline maps](https://www.maptiler.com/data/) from downloaded or bundled tile extracts.

## Native mobile apps

Our OpenStreetMap vector tiles are encoded in the widely used and openly documented [vector tile format](https://github.com/mapbox/vector-tile-spec). This means the tiles are compatible with all software tools implementing this format specification. The style definition for the design of the map may vary in different tools - our open styles are implemented in [GL Style](https://docs.maptiler.com/gl-style-specification/).

The [open-source MapLibre SDK for iOS](https://docs.maptiler.com/maplibre-gl-native-ios/tutorials/) and [SDK for Android](https://docs.maptiler.com/maplibre-gl-native-android/) provide the most natural way of displaying the tiles and styles in a mobile app natively.

### Sample app for Android and iOS

To demonstrate the capabilities of the SDK and show the performance of OpenMapTiles vector tiles made from OpenStreetMap, we have developed a [sample mobile app](/mobile-app) for both Android and iOS.

[<img src='/img/mobile/banner_1.png' style="width:40%;"/>](/mobile-app)

These apps show the vector map tiles displayed from a custom tile server, so you can choose a tile hosting service or implement your own. Map tiles can also be bundled with the mobile app or users can download a tileset for a region of their choice.

## Packed web applications

The fastest way to develop mobile apps with high performance and access to native features is by using [Flutter](https://docs.maptiler.com/flutter/).

An alternative way to develop multiplatform mobile apps is to use the existing [web viewers](/viewers/) while using HTML, CSS, and JavaScript and packaging the web applications into native applications with a framework like [React Native](https://docs.maptiler.com/react-native/).

## Desktop and embedded apps

To develop cross-platform map applications with vector tiles, you can use MapLibre or select an alternative such as [CEF - Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) or [MapLibre Native QT](https://github.com/maplibre/maplibre-native-qt).
