'use strict';

let debug           = require('debug')('bat:lib:tigerMatcher'),
    commandLineArgs = require('command-line-args'),
    GeoUtil         = require('./GeoUtil'),
    db              = require('./db');


let tigerMatcher = {
  find: function() {
    let options = tigerMatcher.getOptions();

    if (_showHelp(options)) {
      return tigerMatcher.defaultOptions();
    }

    debug('user options', options);

    tigerMatcher.query(options, function(err, rows) {
      if (err) throw err;

      debug('result', rows);
    });
  },

  query: function(options, callback) {
    let geo = GeoUtil.geo2LatLng(options.geo);
    let radius = GeoUtil.getRadiusByCountry(options.country);
    let points = GeoUtil.getGeoCircle(geo.latitude, geo.longitude, radius);

    debug('geolocation max and min points', points);

    let sql = `SELECT id, name, gender, preferences
          FROM cleaners
          WHERE country_code = $1::text
          AND latitude BETWEEN $2::numeric AND $3::numeric
          AND longitude BETWEEN $4::numeric AND $5::numeric`;
    let params = [
      options.country,
      points.latitude.min, points.latitude.max,
      points.longitude.min, points.longitude.max
    ];

    if (options.gender) {
      sql += ' AND gender = $6::text';
      params.push(options.gender);
    }
    if (options.preferences) {
      let preferencesQuery = options.preferences.split(',').map(p => {
        return ` AND '${p}' = ANY(CONCAT('{',preferences,'}')::text[])`;
      });
      sql += preferencesQuery.join('');
    }

    debug('sql', sql);
    debug('params', params);
    db.query(sql, params, callback);
  },

  getOptions: function() {
    return commandLineArgs([
      { name: 'help' },
      { name: 'country', alias: 'c', type: String },
      { name: 'geo', alias: 'g', type: String },
      { name: 'gender', type: String },
      { name: 'preferences', type: String }
    ]);
  },

  defaultOptions: function() {
    let out = `Usage: $ gulp get-matches --country=aa --geo=lat,long [--gender=(F,M) --preferences=(fridge,windows,laundry,ironing,oven) --output=json]
             $ gulp get-matches -c aa -g lat,long`;
    console.log(out);
    return out;
  }
};

/**
 * private
 */
function _showHelp(options) {
  let hasParams = !!Object.keys(options).length;
  let hasValidGeo = GeoUtil.isValidGeo(options.geo);
  let hasRequiredParams = options.country && hasValidGeo;

  if(!hasValidGeo) {
    console.error(`Invalid geolocalization: ${options.geo || ''}. Ex: 52.3650172,4.8375675`);
  }
  return !hasParams || options.help || !hasRequiredParams;
}

module.exports = tigerMatcher;
