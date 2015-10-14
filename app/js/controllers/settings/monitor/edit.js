'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function MonitorEditCtrl($scope, $stateParams, NotificationService, $state, Monitor, Util, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    
  	vm.entity = Monitor.get({ id: $stateParams.id });
    vm.universities = University.query();

    $scope.header = {
      title : 'Monitores',
      description: 'Editar monitor',
      icon : 'user-plus'
    };

  }

  function submit () {
    
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$update({id : vm.entity.id});

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Docente editada com sucesso', 'success');
      $state.go('monitor.list');

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao editar a docente, tente novamente.', 'error');

  	});

  	promise.finally(function (data) {11
  		return true;
  	});


  }

  $scope.cancel = function () {
  
    $state.go('monitor.list');
  
  }

}

controllersModule.controller('MonitorEditCtrl', MonitorEditCtrl);