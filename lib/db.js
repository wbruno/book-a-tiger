'use strict';

let debug           = require('debug')('bat:lib:db'),
    config          = require('./config'),
    Client          = require('pg-native');

debug('config.postgres', config.postgres);

let db = {
  query: function(sql, params, callback) {
    let client = new Client();

    client.connect(_getConnectionString(config.postgres), function(err) {
      if(err) throw err;

      client.query(sql, params, function(err, rows) {
        client.end();

        callback(err, rows);
      });
    });
  }
};

/**
 * private
 */
function _getConnectionString(_config) {
  let configDefault = {
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    database: 'postgres'
  };
  let config = Object.assign(configDefault, _config);

  return `postgresql://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`;
}

module.exports = db;
