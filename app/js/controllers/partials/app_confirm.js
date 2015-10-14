'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */
function AppConfirmCtrl($modalInstance, title, message) {

  // ViewModel
  var vm = this;
  vm.message = message;
  vm.title = title;

  vm.close = function (confirmed) {
  	
  	if (confirmed)
  		$modalInstance.close(true);
  	else
  		$modalInstance.dismiss();
  }


}

controllersModule.controller('AppConfirmCtrl', AppConfirmCtrl);