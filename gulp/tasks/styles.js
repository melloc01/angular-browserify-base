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

gulp.task('styles', function () {

  return gulp.src(config.styles.src)
    .pipe(plumber({
            handleError: function (error) {
                handleErrors(error);
                this.emit('end');
            }
    }))
    .pipe(less({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'less',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))
    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 9"))
    .on('error', handleErrors)
    .pipe(concat('main.css'))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});