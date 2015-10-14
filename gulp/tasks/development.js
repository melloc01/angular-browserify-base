'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dev', ['clean'], function(cb) {

  cb = cb || function() {};

  global.isProd = false;

  runSequence(['styles', 'css', 'scripts', 'images', 'fonts', 'views', 'browserify', 'translate'], 'watch', cb);

});