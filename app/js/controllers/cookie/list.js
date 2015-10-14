'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */

function CookieListCtrl($scope, Cookie) {

  // ViewModel
  var vm = this;

  init();

  function init () {

    vm.entities = Cookie.all();

  }

}

controllersModule.controller('CookieListCtrl', CookieListCtrl);