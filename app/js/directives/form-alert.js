'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function formAlert($compile) {

	var directive = {
  
    restrict: 'EA',
    scope: true,
    link: link
	
	}

	return directive;

  function link (scope, element, attrs) {
  	
  	var msg = attrs.message;
  	var tpl = '<div class="alert alert-error alert-table">'
  					+	'<div class="icon-cell">'
						+	'<i class="fa fa-exclamation-triangle"></i>'
						+ '</div>'
						+ '<div >'
						+ '<p>'+msg+'</p>'
					 	+ '</div>'
					 	+ '</div>';
	
	  var cp = $compile(tpl)(scope);
	  element.append(cp);
	  
  }

}

directivesModule.directive('formAlert', formAlert);