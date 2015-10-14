'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */

function HomeCtrl($scope, $http, StorageService) {

  // ViewModel
  var vm = this;

  init();

  function init () {

  	$scope.header = {
  		title : 'Início',
  		description: 'Bem vindo ao Webfolio!',
  		icon : 'home'
  	};

  }

}

controllersModule.controller('HomeCtrl', HomeCtrl);