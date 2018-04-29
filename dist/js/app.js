angular.module('olimpiada_boom',  [
	'ui.router'
])


.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider){


	 $stateProvider
		.state('main',{
			name: 'main',
			url: '/main',
			controller:'DashboardCtrl',
			templateUrl: 'dist/templates/dashboard.html'
		})
		.state('main.users',{
			name: 'users',
			url: '/users',
			controller:'usersCtrl',
			templateUrl: 'dist/templates/usuarios.html'
		})
		.state('main.answer',{
			name: 'answers',
			url: '/answers',
			controller:'answerCtrl',
			templateUrl: 'dist/templates/respuestas.html'
		})
		.state('main.test',{
			name: 'test',
			url: '/tests',
			controller:'testCtrl',
			templateUrl: 'dist/templates/pruebas.html'
		})
		.state('main.ask',{
			name: 'asks',
			url: '/asks',
			controller:'askCtrl',
			templateUrl: 'dist/templates/preguntas.html'
		});
	 $urlRouterProvider.otherwise('/main');
}]);
