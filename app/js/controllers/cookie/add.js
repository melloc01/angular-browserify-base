'use strict';

var controllersModule = require('../_index');

/**
 * @ngInject
 */

function CookieAddCtrl(Cookie) {

  // ViewModel
  var vm = this;
  vm.submit = submit;

    // vm.taste = 'Banana';
    // vm.price = '10.00';

  function  submit () {

    var cookie = new Cookie({taste: 'morango', price: 459.30});
    cookie.$save();


  }

}

controllersModule.controller('CookieAddCtrl', CookieAddCtrl);