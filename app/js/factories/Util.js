'use strict';

var factoriesModule = require('./_index.js');

/**
 * @ngInject
 */
function Util($modal) {

  var factory = {

    formInvalid : formInvalid,
    viewModal : viewModal

  };

  function formInvalid (angularForm) {

    if (angularForm.$invalid == true) { 
      
      angular.forEach(angularForm.$error, function (field) {
        angular.forEach(field, function(errorField){
            errorField.$setTouched();
        })
      });
      
      return true;
    }

    return false;

  }


  // viewModal
  // invokes a common modal - injects 'entity' variable

  function viewModal (data, templateUrl, title, controllerName, controllerAs) {
    
    controllerName = controllerName ? controllerName : 'DefaultViewCtrl';
    controllerAs = controllerAs ? controllerAs : 'view';

    data.modalTitle = title;

    return $modal.open({

    templateUrl: templateUrl,
    controller: controllerName,
    controllerAs: controllerAs,
    resolve: {

        data: function () {

            return data;

        }

    }

});


  }

  return factory;

}

factoriesModule.factory('Util', Util);