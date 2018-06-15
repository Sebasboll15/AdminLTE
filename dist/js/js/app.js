angular.module('olimpiada_boom',  [
	'ngSanitize',
	'ui.router', 
	'ui.bootstrap',
	'ui.select'
])


.config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider){


	 $stateProvider
		.state('main',{
			name: 'main',
			url: '/main',
			controller:'DashboardCtrl',
			templateUrl: 'dist/templates/dashboard.html',
			resolve: {
				USER: ['AuthServ', function(AuthServ){
					return AuthServ.verificar_user_logueado();
				}]
			}
		})
		
		.state('login', {
			name: 'login',
			url: '/login',
			controller: 'loginCtrl',
			templateUrl: 'dist/templates/login.html'
	        
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
		
		.state('main.control',{
			name: 'control',
			url: '/control',
			controller:'ControlCtrl',
			templateUrl: 'dist/templates/control.html'
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
		})

		.state('main.prueba_respuesta',{
			name: 'Prueba',
			url: '/Prueba',
			controller:'Prueba_respuestasCtrl',
			templateUrl: 'dist/templates/prueba_respuestas.html'
		});


	 $urlRouterProvider.otherwise('/login');
}]);
