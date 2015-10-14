'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function NavCtrl($modal) {

  // ViewModel
  var vm = this;
  vm.teste = 'funf';


}

controllersModule.controller('NavCtrl', NavCtrl);
