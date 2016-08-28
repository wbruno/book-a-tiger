'use strict';

let debug  = require('debug')('bat:test:tigerMatcher');
let tigerMatcher = require('../lib/tigerMatcher');
let assert = require('assert');

describe('tigerMatcher', function() {

  it('#query simple', function(done) {
    this.timeout = 5000;
    let options = {
      country: 'de',
      geo: '52.5126466,13.4154251'
    };
    tigerMatcher.query(options, function(err, rows) {
      let expected = [
        {
          id: 'NWU13z1PbC32Dg3KroTt',
          name: 'David',
          gender: 'M',
          preferences: 'fridge,windows,laundry,oven'
        },
        {
          id: 'dfT9wFR37QemWyyikzEx',
          name: 'Maria',
          gender: 'F',
          preferences: 'fridge,windows,laundry,ironing,oven'
        },
        {
          id: 'LALVxHwPvNbnNYsKrO6O',
          name: 'Kathrin',
          gender: 'F',
          preferences: 'laundry'
        }
      ];

      assert.deepEqual(expected, rows);
      done();
    });
  });

  it('#query with gender', function(done) {
    this.timeout = 5000;
    let options = {
      country: 'de',
      geo: '52.5126466,13.4154251',
      gender: 'M'
    };
    tigerMatcher.query(options, function(err, rows) {
      let expected = [
        {
          id: 'NWU13z1PbC32Dg3KroTt',
          name: 'David',
          gender: 'M',
          preferences: 'fridge,windows,laundry,oven'
        }
      ];

      assert.deepEqual(expected, rows);
      done();
    });
  });

  it('#query with preferences', function(done) {
    this.timeout = 5000;
    let options = {
      country: 'de',
      geo: '52.5126466,13.4154251',
      preferences: 'oven'
    };
    tigerMatcher.query(options, function(err, rows) {
      let expected = [
        {
          id: 'NWU13z1PbC32Dg3KroTt',
          name: 'David',
          gender: 'M',
          preferences: 'fridge,windows,laundry,oven'
        },
        {
          "gender": "F",
          "id": "dfT9wFR37QemWyyikzEx",
          "name": "Maria",
          "preferences": "fridge,windows,laundry,ironing,oven"
        }
      ];

      assert.deepEqual(expected, rows);
      done();
    });
  });

  it('#defaultOptions', function() {
    let options = tigerMatcher.defaultOptions();
    let expected = `Usage: $ gulp get-matches --country=aa --geo=lat,long [--gender=(F,M) --preferences=(fridge,windows,laundry,ironing,oven) --output=json]
             $ gulp get-matches -c aa -g lat,long`;

    assert.equal(expected, options);
  });

});

