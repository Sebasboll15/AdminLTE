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
		.state('users',{
			name: 'users',
			url: '/users',
			controller:'usersCtrl',
			templateUrl: 'dist/templates/usuarios.html'
		});
	 $urlRouterProvider.otherwise('/main');
}]);
