# Leaflet.GeoJSON.Alloy
A [Leaflet](https://leafletjs.com/) plugin to fetch and visualise layers from Alloy, [Yotta](https://weareyotta.com/)'s Asset Management System, in GeoJson format. It is essentially an extesion of L.GeoJSON.

## Demo
[Check the demo!](https://arnaufp.github.io/Leaflet.GeoJSON.Alloy/demo/)

## Requirements
The Leaflet.GeoJSON.Alloy requires the following Javascript libraries to be available:
* [Leaflet](http://leafletjs.com/)
* [Sphericalmercator](https://github.com/mapbox/sphericalmercator)

## Usage
Download Leaflet.GeoJSON.Alloy and include it in your page after including Leaflet ans Sphericalmercator, e.g.:  

    <head>
      ...
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script src="sphericalmercator.js"></script>
      <script src="Leaflet.GeoJSON.Alloy.js"></script>>
    </head>
 
In order to get data out from Alloy API you need an API Key, the layer code, the visualisation type and optionally the style id:

```js
// add Alloy layer to map.
new L.GeoJSON.Alloy(null,{
   apiKey:'<insert API key here>',
   layerCode: '<insert layer code here>',
   visualisation: '<insert visualisation here>',
}).addTo(map)
```

### Options
|Option|Type|Required|Description|
|---|---|---|---|
|`apiKey`|`String`|Yes|API key is linked to an Alloy project|
|`layerCode`|`String`|Yes|Each layer in a project has a unique identifier code| 
|`visualisation`|`String`|Yes|'cluster', 'network' or 'basic' visualisation|
|`styleIds`|`Array of strings`|No|Each layer can have one or more styles. If not set, it gets all the styles of a layer|

### Methods
All methods of L.GeoJSON are available. In addition, the following methods are also available:

|Method|Return|Description|
|---|---|---|
|`getAlloyLayer()`|`None`|Fetches the data from Alloy API and adds it to the Leaflet layer|
|`getAlloyLayerInfo()`|`Object`|Returns object with information of the Alloy layer (name, style names, codes, etc.)|
|`getLayerCode()`|`String`|Returns string with the current layer code|
|`setLayerCode(string)`|`String`|Changes the layer code and refetches data from the Alloy API|
|`getStyleIds()`|`Array of strings`|Returns array of strings with the current styleIds|
|`setStyleIds(Array of strings)`|`Array of strings`|Changes the style ids and refetches data from the Alloy API|
|`getVisualisation()`|`String`|Returns string with the current visualisation type|
|`setVisualisation(string)`|`String`|Changes the visualisation type and refetches data from the Alloy API|
|`getApiKey()`|`String`|Returns string with the current API key|
|`setApiKey(string)`|`String`|Changes the API key and refetches data from the Alloy API|

## License

This plugin is licensed under the MIT license, see the LICENSE file.

Sphericalmercator is licensed under the BSD 3-Clause "New" or "Revised" License, see the LICENSE file in lib directory.
