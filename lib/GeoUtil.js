'use strict';

const DEG2RAD = Math.PI/180;
const RAD2DEG = 180/Math.PI;
const EARTHSRADIUS = 6371;

let config = require('./config');

let GeoUtil = {
  getGeoCircle: function(latitude, longitude, radius) {
    return {
      latitude: {
        max: latitude + RAD2DEG * (radius/EARTHSRADIUS),
        min: latitude - RAD2DEG * (radius/EARTHSRADIUS)
      },
      longitude: {
        max: longitude + (RAD2DEG * (Math.asin(radius/EARTHSRADIUS)) / Math.cos(DEG2RAD * latitude)),
        min: longitude - (RAD2DEG * (Math.asin(radius/EARTHSRADIUS)) / Math.cos(DEG2RAD * latitude))
      }
    }
  },

  geo2LatLng: function(geo) {
    let s = geo.split(',');
    return {
      latitude: parseFloat(s[0], 10),
      longitude: parseFloat(s[1], 10)
    }
  },

  getRadiusByCountry: function(country) {
    return config.distances[country] || config.distances.default;
  },

  isValidGeo: function(geo) {
    return /(\d+\.\d+)\,(\d+\.\d+)/.test(geo);
  }
};

module.exports = GeoUtil;
