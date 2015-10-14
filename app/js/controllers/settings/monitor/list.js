'use strict';

var controllersModule = require('../../_index');

/**
 * @ngInject
 */

function MonitorListCtrl($scope, Monitor, $modal, NotificationService, $state) {

  // ViewModel
  var vm = this;

  vm.add = add;
  vm.edit = edit;
  vm.destroy = destroy;

  init();


  function add () {

    return $state.go('monitor.add');

  }

  function edit (entity) {
  
    return $state.go('monitor.edit', { id : entity.id });    
  
  }

  function destroy (entity) {

    NotificationService.confirm(
      'Tem certeza que deseja excluir?', function(sure) {
        
        if (sure) {
          
          var p = entity.$remove({id : entity.id});

          p.then(function (data) {
            NotificationService.notify(null, 'Docente excluída com sucesso', 'success');
            initQueries();
          });

          p.catch(function (e) {
            NotificationService.notify(null, 'Houve um erro ao excluir a docente', 'error');
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
  		title : 'Monitores',
  		description: 'Lista dos monitores cadastrados',
  		icon : 'user-plus'
  	};

    initQueries();

  }

  function initQueries () {
    
    vm.entities = Monitor.query();

  }

}

controllersModule.controller('MonitorListCtrl', MonitorListCtrl);