# Fully Typed GeoPoint

A GeoPoint plugin for [fully-typed](https://www.npmjs.com/package/fully-typed). Validates that a value is an object with required properties for `latitude` and `longitude`.

### Installation

```bash
npm install fully-typed-geopoint
```

### Usage

```js
const Typed = require('fully-typed');
const GeoPoint = require('fully-typed-geopoint');

// register the plugin
Typed.controllers.register(GeoPoint);

// define a schema that uses the plugin
const schema = Typed({
    type: GeoPoint,              // or "geoPoint" as a string
    latitudeRange: [-90, 90],    // this is the default
    longitudeRange: [-180, 180]  // this is the default
});

let error;

// check a value for errors
error = schema.error({ latitude: 21.289373, longitude: -157.917480 });
// error => null

// check a value for errors
error = schema.error(25);
// error => "Expected an object with numeric latitude and longitude values."

// check a value for errors
error = schema.error({ latitude: 1000, longitude: 0 });
// error => "Latitude must be between -90 and 90"

```