angular.module('olimpiada_boom',  [
	'ngSanitize',
	'ui.router', 
	'ui.bootstrap',
	'ui.select'
])


.config(['$stateProvider','$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider){

	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];


	$httpProvider.interceptors.push(function($q)
	{
		return {
			'request': function(config){
				explotado = config.url.split('::');
				if(explotado.length > 1){
					config.url = window.location.protocol + '//' + window.location.hostname + ':8787/api/' + explotado[1];
				}else{
					explotado = config.url.split('==');
					if (explotado.length > 1)
						config.url = window.location.host + explotado[1];
				}
				//console.log(config.url);
				return config;
			}
		}
	});


	 $stateProvider
		.state('main',{
			name: 'main',
			url: '/main',
			controller:'DashboardCtrl',
			templateUrl: 'dist/templates/dashboard.html',
			resolve: {
				USER: ['AuthServ', function(AuthServ, MySocket){
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
