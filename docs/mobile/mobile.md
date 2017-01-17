---
layout: docs
category: mobile
title: Create a mobile app
description: Create a mobile app
keywords: Mobile, apps
---

## Overview

Based on free OpenStreetMap data, it is posisble to create beautiful, accurate and fast maps - with native vector rendering, and live customizable styling - directly on a mobile device. The native mobile rendering is fast and response to user touch interaction immediatelly.

The map tiles can be easily displayed in custom native mobile applications on Android or iOS or other platforms. The developers can load the map tiles online from a tileserver of a choice or implement offline maps in the app - displaying the maps from downloaded or bundled tile extracts.

Based on free OpenStreetMap data, it is posisble to create beautiful, accurate and fast maps - with native vector rendering, and live customizable styling - directly on a mobile device. The native mobile rendering is fast and response to user touch interaction immediatelly.

## Native mobile apps

Our OpenSteetMap vector tiles are encoded in the widely used and openly documented [vector tile format](https://github.com/mapbox/vector-tile-spec). This means the tiles are compatible with all software tools implementing this format specification. The style defintion for the design of the map may vary in different tools - our open styles are implemented in [GL Style]().

The [open-source Mapbox SDK for iOS](https://www.mapbox.com/ios-sdk/) and [SDK for Android](https://www.mapbox.com/android-sdk/) provides the most natural way how to display the tiles and styles in a mobile app natively.

The source code of the Mapbox SDKs is available at https://github.com/mapbox/mapbox-gl-native.

There are alternative open-source SDKs for native mobile apps as well, for example TangramES or Carto/Nutiteq SDK.

### Sample app for Android and iOS

To demostrate the capabilites of the SDK and show the performance of OpenMapTiles vector tiles made from OpenStreetMap we have developed a sample mobile app.

Get it for free for Android ([Google Play]()) or iOS ([App Store]()).

This apps shows the vector map tiles displayed from a custom tile server - so you can choose a tile hosting service or implememnt your own. The map tiles can be also bundled with the mobile app or users can download MBTiles package of tiles for a region of their choice.

Displaying of the tiles directly from MBTiles, running in offline environment, requires patching of Mapbox SDKs. We offer the [complete source code of the demo mobile app]() to the interested developers - to speed up the start of the development of their own commercial apps.

## Packed web applications

An alterantive way for development of multiplatform mobile apps is use of the existing [web viewers]() while using HTML, CSS and JavaScript - and packing of the web applications into native applications with something like Apache Cordova (https://cordova.apache.org/).

The modern mobile phones supports WebGL and maps are acceptably performant - but native apps are still   faster and ensure better compatibility with various devices.

While developing the mobile apps in JavaScript users can also use native components - such as Cordova app React Native.

## Desktop and embedded apps

For the development of native desktop applications and software for hardware apliences with embeded mapping systems powered by Linux and running completely offline with our vector tiles one can use the open-source [QT SDK](https://github.com/mapbox/mapbox-gl-native/tree/master/platform/qt).

Mapbox GL Native does not compile (yet) on Microsoft Windows - so for fully multiplatform desktop apps with vector tile maps inside, the embedded web window (possibly with [CEF - Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) and enabled WebGL support) is still the best option.