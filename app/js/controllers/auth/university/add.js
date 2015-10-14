'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function UniversityAddCtrl($scope, University, NotificationService, Util, $state, User) {

  // ViewModel
  var vm = this;

  vm.submit = submit;

  init();

  function init () {
    	
    vm.entity  = new University();
  	vm.user    = new User();

    $scope.header = {
      title : 'Universidades',
      description: 'Cadastrar Universidade',
      icon : 'university'
    };

  }

  function submit () {
      
    if (Util.formInvalid($scope.form))
      return false;

  	var promise = vm.entity.$save();

  	promise.then(function (university) {

      vm.user.university_id = university.id;
      var promise = vm.user.$save();

      // creates user that belongs to this university
      promise.then(function (data) {

        NotificationService.notify(null, 'Universidade cadastrada com sucesso', 'success');
        $state.go('university.list');
  
      });

      // if there was an error, remove created university
      promise.catch(function (data) {
        
        vm.entity.$remove({id : vm.entity.id});
  		  NotificationService.notify(null, 'Houve um erro ao cadastrar a universidade', 'error');

      });

    });

    promise.catch(function (data) {

      NotificationService.notify(null, 'Houve um erro ao cadastrar a universidade', 'error');

  	});

  	promise.finally(function (data) {11
  		// always
  	});


  }

  $scope.cancel = function () {

    $state.go('university.list');
  
  }


}

controllersModule.controller('UniversityAddCtrl', UniversityAddCtrl);