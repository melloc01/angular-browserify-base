'use strict';

var directivesModule = require('./_index.js');

/**
 * @ngInject
 */
function formMessages($compile) {

	var directive = {
  
    restrict: 'EA',
    replace:true,
    scope: true,
    link: link
	
	}

	return directive;

  function link (scope, element, attrs) {
  	
  	var field = attrs.field;
  	var tpl = '<div style="padding: 0 10px" class="bg-danger text-white" ng-messages="form.'+field+'.$error" ng-if="form.'+field+'.$touched && form.'+field+'.$invalid">'
						+ '<div ng-messages-include="partials/form-messages.html"></div>'
					 	+ '</div>';
	
	  var cp = $compile(tpl)(scope);
	  element.append(cp);
	  
  }

}

directivesModule.directive('formMessages', formMessages);