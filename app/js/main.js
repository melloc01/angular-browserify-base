'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./factories/_index');
require('./directives/_index');
require('angular-bootstrap-npm');
require('toaster');
require('angular-animate');
require('angular-messages');
require('moment');
require('moment/locale/pt-br');
require('angular-moment');
require('angular-resource');
require('angular-translate');
require('toaster');
require('sweetalert');
require('./translations.js');

// create and bootstrap application
angular.element(document).ready(function() {

  var requires = [
    'ui.router',
    'templates',
    'app.controllers',
    'app.services',
    'app.factories',
    'app.directives',
    'ui.bootstrap',
    'toaster',
    'ngAnimate',
    'ngMessages',
    'ngResource',
    'pascalprecht.translate',
    'angularMoment',
    'translations',
    'toaster'
  ];

  // mount on window for testing
  window.app = angular.module('app', requires);

  angular.module('app').constant('AppSettings', require('./constants'));

  angular.module('app').config(require('./on_config'));

  angular.module('app').run(require('./on_run'));

  angular.module('app').controller('AppController', require('./app.js'));

  angular.bootstrap(document, ['app']);

});
