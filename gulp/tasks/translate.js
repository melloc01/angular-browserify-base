'use strict';

var gulp   						= require('gulp');
var config        		= require('../config');
var angularTranslate  = require('gulp-angular-translate');


gulp.task('translate', ['extract'], function() {

	  return gulp.src('i18n/*')
    .pipe(angularTranslate())
    .pipe(gulp.dest('app/js'));


});