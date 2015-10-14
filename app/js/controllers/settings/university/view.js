'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function DefaultViewCtrl(data, $modalInstance) {

  // ViewModel
  var vm = this;

  vm.data = data;
  vm.cancel = $modalInstance.dismiss;
  
}

controllersModule.controller('DefaultViewCtrl', DefaultViewCtrl);