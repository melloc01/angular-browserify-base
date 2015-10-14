'use strict';

var servicesModule = require('./_index.js');

/**
 * @ngInject
 */
function NotificationService($q, $http, toaster) {

  var service = {

    notify 	: notify,
    confirm : confirm,
    toast 	: toast

  };

  function toast (title, body, type) {
  	
  	return  toaster.pop({ title: title, body: body, type:type });

  }

  function notify (title, text, type, confirmButtonText, cancelButtonText, timer, showConfirmButton) {

   	return swal({
		  title: 	title || '',
		  text: 	text,
		  type: 	type,
		  confirmButtonText: confirmButtonText || 'Ok',
		  cancelButtonText: cancelButtonText || 'Cancelar',
		  timer: (typeof(timer) === 'undefined' ? 2000 : timer),
  		showConfirmButton: showConfirmButton || false,
  		allowOutsideClick: true
		});

  }

  function confirm (title, cb, text, type, confirmButtonText, cancelButtonText, confirmButtonColor, closeOnConfirm, closeOnCancel) {

		swal({
			  title: 							title,
			  text: 							text,
			  type: 							type || 'warning',
			  showCancelButton: 	true,
			  confirmButtonColor: confirmButtonColor || "#DD6B55",
			  confirmButtonText: 	confirmButtonText || 'Ok',
			  cancelButtonText: 	cancelButtonText || 'Cancelar',
			  closeOnConfirm: 		closeOnConfirm || true,
			  closeOnCancel: 			closeOnCancel || true,
  			allowOutsideClick: true,
  			showLoaderOnConfirm: true
		}, cb);


  }

  return service;

}

servicesModule.service('NotificationService', NotificationService);