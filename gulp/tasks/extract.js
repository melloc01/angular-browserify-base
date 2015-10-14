'use strict';

var gulp   						= require('gulp');
var config        		= require('../config');
var extractTranslate 	= require('gulp-angular-translate-extractor');
var angularTranslate  = require('gulp-angular-translate');


gulp.task('extract', function() {


	var i18nsrc = config.scripts.src		  // your source files
  var i18ndest = 'i18n';               //destination directory

  return gulp.src(i18nsrc)
      .pipe(extractTranslate({

        defaultLang: 'en-US',         // default language
          lang: ['en-US', 'pt_BR'],   // array of languages

          dest: i18ndest,             // destination
          safeMode: false,            // do not delete old translations, true - contrariwise
          stringifyOptions: true     // force json to be sorted, false - contrariwise

      }))
      .pipe(gulp.dest(i18ndest));


});