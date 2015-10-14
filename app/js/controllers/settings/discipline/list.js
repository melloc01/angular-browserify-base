'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function DisciplineListCtrl($scope, Discipline, $modal, NotificationService, $state) {

  // ViewModel
  var vm = this;

  vm.add = add;
  vm.edit = edit;
  vm.destroy = destroy;

  init();


  function add () {

    return $state.go('discipline.add');

  }

  function edit (entity) {
  
    return $state.go('discipline.edit', { id : entity.id });    
  
  }

  function destroy (entity) {

    NotificationService.confirm(
      'Tem certeza que deseja excluir?', function(sure) {
        
        if (sure) {
          
          var p = entity.$remove({id : entity.id});

          p.then(function (data) {
            NotificationService.notify(null, 'Disciplina excluída com sucesso', 'success');
            initQueries();
          });

          p.catch(function (e) {
            NotificationService.notify(null, 'Houve um erro ao excluir a disciplina', 'error');
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
  		title : 'Disciplinas',
  		description: 'Lista das disciplinas cadastrados',
  		icon : 'book'
  	};

    initQueries();

  }

  function initQueries () {
    
    vm.entities = Discipline.query();

  }

}

controllersModule.controller('DisciplineListCtrl', DisciplineListCtrl);