'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function StudentEditCtrl($scope, $stateParams, NotificationService, $state, Student, Util, University) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    
  	vm.entity = Student.get({ id: $stateParams.id });
    vm.universities = University.query();

    $scope.header = {
      title : 'Studentes',
      description: 'Editar Student',
      icon : 'graduation-cap'
    };

  }

  function submit () {
    
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$update({id : vm.entity.id});

  	promise.then(function (data) {

  		NotificationService.notify(null, 'Docente editada com sucesso', 'success');
      $state.go('student.list');

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao editar a docente, tente novamente.', 'error');

  	});

  	promise.finally(function (data) {11
  		return true;
  	});


  }

  $scope.cancel = function () {
  
    $state.go('student.list');
  
  }

}

controllersModule.controller('StudentEditCtrl', StudentEditCtrl);