'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function MonitorAddCtrl($scope, Monitor, NotificationService, Util, $state, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    	
  	vm.entity = new Monitor();
    vm.universities = University.query();

    $scope.header = {
      title : 'Monitores',
      description: 'Cadastrar monitor',
      icon : 'user-plus'
    };

  }

  function submit () {
      
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$save();

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Monitor cadastrado com sucesso', 'success');
      $state.go('monitor.list');

  	});

  	promise.catch(function (data) {

  		NotificationService.notify(null, 'Houve um erro ao cadastrar o monitor', 'error');

  	});

  	promise.finally(function (data) {
  		// always
  	});


  }

  $scope.cancel = function () {

    $state.go('monitor.list');
  
  }


}

controllersModule.controller('MonitorAddCtrl', MonitorAddCtrl);