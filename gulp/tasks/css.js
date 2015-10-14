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

gulp.task('css', function () {

  return gulp.src(config.styles.css)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});