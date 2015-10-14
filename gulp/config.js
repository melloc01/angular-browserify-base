'use strict';

module.exports = {

  'browserport'  : 3000,
  'uiport'       : 3001,
  'serverport'   : 3002,

  'styles': {
    'src' : 'app/styles/style.less',
    'dest': 'build/css',
    'css': 'app/styles/**/*css',
    'watch' : 'app/styles/*.less'
  },

  'scripts': {
    'src' : 'app/js/**/*.js',
    'dest': 'build/js'
  },

  'assetsjs':{
      'src': [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js' ,
          'app/assets/js/*.js',
      ],
      'dest': 'build/assetsjs'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'build/images'
  },

  'fonts': {
    'src' : ['app/assets/fonts/**/*'],
    'dest': 'build/fonts'
  },

  'translations': {
    'watch': [
      'i18n/*'
    ]
  },

  'views': {
    'watch': [
      'app/index.html',
      'app/views/**/*.html'
    ],
    'src': 'app/views/**/*.html',
    'dest': 'app/js'
  },

  'gzip': {
    'src': 'build/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'build/',
    'options': {}
  },

  'dist': {
    'root'  : 'build'
  },

  'browserify': {
    'entries'   : ['./app/js/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};
