'use strict';

var config       = require('../config');
var gulp         = require('gulp');
var less         = require('gulp-less');
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('scripts', function () {

  return gulp.src(config.assetsjs.src)
    .pipe(concat('theme.js'))
    .pipe(gulp.dest(config.assetsjs.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({stream : true})));

});