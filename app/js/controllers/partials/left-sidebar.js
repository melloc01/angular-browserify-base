'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function LeftBarCtrl($modal) {



  // ViewModel
  var vm = this;


  init();

  function init () {

    vm.teste = 'tada';
  }



}

controllersModule.controller('LeftBarCtrl', LeftBarCtrl);