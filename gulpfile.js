'use strict';

let gulp            = require('gulp'),
    debug           = require('debug')('bat:gulpfile'),
    tigerMatcher    = require('./lib/tigerMatcher');

gulp.task('get-matches', tigerMatcher.find);
