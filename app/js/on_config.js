'use strict';

/**
 * @ngInject
 */
function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, $httpProvider) {


  $locationProvider.html5Mode(true);
	$httpProvider.interceptors.push('HttpInterceptor');

  $translateProvider
	  .preferredLanguage('en-US');

  $stateProvider
	  .state('home', {
	    url: '/',
	    controller: 'HomeCtrl as home',
	    templateUrl: 'home.html',
	    title: 'Início'
	  })

	  .state('signup', {
	    url: '/signup',
	    controller: 'SignupCtrl as signup',
	    templateUrl: 'auth/signup.html',
	    title: 'Cadastro'
	  })

	  .state('signin', {
	    url: '/signin',
	    controller: 'SigninCtrl as signin',
	    templateUrl: 'auth/signin.html',
	    title: 'Entrar'
	  })

	  // Resources

	  // settings
	  resource($stateProvider, 'university', 'University', 'university', 'Universidade', 'settings/');
	  resource($stateProvider, 'secretariat', 'Secretariat', 'secretariat', 'Secretaria', 'settings/');
	  resource($stateProvider, 'professor', 'Professor', 'professor', 'Professor', 'settings/');
	  resource($stateProvider, 'monitor', 'Monitor', 'monitor', 'Monitor', 'settings/');
	  resource($stateProvider, 'student', 'Student', 'student', 'Aluno', 'settings/');
	  resource($stateProvider, 'discipline', 'Discipline', 'discipline', 'Disciplina', 'settings/');


	  ;

  $urlRouterProvider.otherwise('/');

}

module.exports = OnConfig;

function resource ($stateProvider, name, controllerName, url, appTitle, viewDir) {

	$stateProvider
		.state(name, {
			url: '/'+ url,
      redirect: name+'.list',
      template: '<ui-view/>'
    })

	  .state(name + '.list', {
	    url: '/list',
	    controller: controllerName + 'ListCtrl as list',
	    templateUrl: viewDir + name + '/list.html',
	    title: appTitle
	  })

	  .state(name + '.add', {
	    url: '/add',
	    controller: controllerName +'AddCtrl as add',
	    templateUrl: viewDir + name +'/add.html',
	    title: 'Cadastrar '  + appTitle
	  })

	  .state(name + '.edit', {
	    url: '/edit/:id',
	    controller: controllerName + 'EditCtrl as edit',
	    templateUrl: viewDir + name + '/edit.html',
	    title: 'Editar ' + appTitle
	  })
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
