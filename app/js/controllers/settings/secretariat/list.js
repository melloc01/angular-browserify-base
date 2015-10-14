'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function SecretariatListCtrl($scope, Secretariat, $modal, NotificationService, $state) {

  // ViewModel
  var vm = this;

  vm.add = add;
  vm.edit = edit;
  vm.destroy = destroy;

  init();


  function add () {

    return $state.go('secretariat.add');

  }

  function edit (entity) {
  
    return $state.go('secretariat.edit', { id : entity.id });    
  
  }

  function destroy (entity) {

    NotificationService.confirm(
      'Tem certeza que deseja excluir?', function(sure) {
        
        if (sure) {
          
          var p = entity.$remove({id : entity.id});

          p.then(function (data) {
            NotificationService.notify(null, 'Secretaria excluída com sucesso', 'success');
            initQueries();
          });

          p.catch(function (e) {
            NotificationService.notify(null, 'Houve um erro ao excluir a secretaria', 'error');
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
  		title : 'Secretarias',
  		description: 'Lista das secretarias cadastradas',
  		icon : 'building-o'
  	};

    initQueries();

  }

  function initQueries () {
    
    vm.entities = Secretariat.query();

  }

}

controllersModule.controller('SecretariatListCtrl', SecretariatListCtrl);