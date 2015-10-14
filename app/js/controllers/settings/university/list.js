'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function UniversityListCtrl($scope, University, NotificationService, $state, Util) {

  // ViewModel
  var vm = this;

  vm.add = add;
  vm.edit = edit;
  vm.view = view;
  vm.destroy = destroy;

  init();


  function view (entity) {

    var modal = Util.viewModal(entity, 'settings/university/view.html', 'Dados do responsável');

  }

  function add () {

    return $state.go('university.add');

  }

  function edit (entity) {
  
    return $state.go('university.edit', { id : entity.id });    
  
  }

  function destroy (entity) {

    NotificationService.confirm(
      'Tem certeza que deseja excluir?', function(sure) {
        
        if (sure) {
          
          var p = entity.$remove({id : entity.id});

          p.then(function (data) {
            NotificationService.notify(null, 'Universidade excluída com sucesso', 'success');
            initQueries();
          });

          p.catch(function (e) {
            NotificationService.notify(null, 'Houve um erro ao excluir a universidade', 'error');
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
  		title : 'Universidades',
  		description: 'Lista das universidades cadastradas',
  		icon : 'university'
  	};

    initQueries();

  }

  function initQueries () {
    
    vm.entities = University.query();
    
  }

}

controllersModule.controller('UniversityListCtrl', UniversityListCtrl);