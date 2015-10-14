'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function StudentListCtrl($scope, Student, $modal, NotificationService, $state) {

  // ViewModel
  var vm = this;

  vm.add = add;
  vm.edit = edit;
  vm.destroy = destroy;

  init();


  function add () {

    return $state.go('student.add');

  }

  function edit (entity) {
  
    return $state.go('student.edit', { id : entity.id });    
  
  }

  function destroy (entity) {

    NotificationService.confirm(
      'Tem certeza que deseja excluir?', function(sure) {
        
        if (sure) {
          
          var p = entity.$remove({id : entity.id});

          p.then(function (data) {
            NotificationService.notify(null, 'Aluno excluído com sucesso', 'success');
            initQueries();
          });

          p.catch(function (e) {
            NotificationService.notify(null, 'Houve um erro ao excluir o aluno', 'error');
          });

          p.finally(function (data) {
            //always
          });

        }        

      }
    );

  }

  function init () {

  	$scope.header = {
      title : 'Alunos',
      description: 'Lista de alunos cadastrados',
      icon : 'user'
  	};

    initQueries();

  }

  function initQueries () {
    
    vm.entities = Student.query();

  }

}

controllersModule.controller('StudentListCtrl', StudentListCtrl);