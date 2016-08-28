'use strict';

let GeoUtil = require('../lib/GeoUtil');
let assert = require('assert');

describe('GeoUtil', function() {
  it('#getGeoCircle', function() {
    let points = GeoUtil.getGeoCircle(52.3650172,4.8375675,5);

    assert.deepEqual(points, {
      "latitude": {
        "max": 52.40998328029593,
        "min": 52.32005111970406
      },
      "longitude": {
        "max": 4.911206485446974,
        "min": 4.763928514553025
      }
    });

    let points2 = GeoUtil.getGeoCircle(52.3650172,4.8375675,10);

    assert.deepEqual(points2, {
      "latitude": {
        "max": 52.45494936059187,
        "min": 52.275085039408125
      },
      "longitude": {
        "max": 4.984845516249782,
        "min": 4.690289483750218
      }
    });
  });

  it('#geo2LatLng', function() {
    let s = GeoUtil.geo2LatLng('52.3650172,4.8375675');
    assert.deepEqual(s, { latitude: 52.3650172, longitude: 4.8375675 });
  });

  it('#getRadiusByCountry', function() {
    let radius = GeoUtil.getRadiusByCountry('de');
    assert.deepEqual(radius, 10);
  });

  it('#isValidGeo', function() {
    let radius = GeoUtil.isValidGeo('52.3650172,4.8375675');
    assert.ok(radius);

    let invalidRadius = GeoUtil.isValidGeo('52,4.8375675');
    assert.ok(!invalidRadius);
  });
});
