angular.module('olimpiada_boom')

  .controller('loginCtrl', function($scope,  $state, ConexionServ, $http, $filter, $uibModal, AuthServ){
       $scope.user = {username: 'jorge', password: '123'}
    
    if (localStorage.servidor) {
    	$scope.servidor = localStorage.servidor
    } else {
    	$scope.servidor = location.hostname
    }
  	

  	$scope.mostrarCambiarServ = function(){
  		$scope.mostrar_cambiar_serv = !$scope.mostrar_cambiar_serv;
  	}

    
  	$scope.cambiar_servidor = function(servidor){
  		localStorage.servidor = servidor;
  	}

    
    $scope.iniciar = function(user){

        AuthServ.loguear(user).then(function(){
        	console.log('sdfg');
            $state.go('main');
        }, function(){
            alert('Datos incorrectos');
        })
    
        
    }
       
    ConexionServ.createTables();

    	$scope.insertar_datos_iniciales = function() {
		
    	consulta = "SELECT * from usuarios ";
   		ConexionServ.query(consulta, []).then(function(result) {
					if (result.length == 0) {
						
						consulta = "INSERT INTO usuarios(nombres, apellidos, username, password, prueba_id, tipo, sexo) VALUES(?,?,?,?,?,?,?) ";
						ConexionServ.query(consulta, ['JORGE', 'CELEDON', 'jorge',  '123', 1, 'Admin', 'M']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
						
						ConexionServ.query(consulta, ['JUAN CAMILO', 'MANRRIQUE', 'juan', '123',  1, 'Usuario', 'M']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
							
						ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', 'daniel',  '123', 1, 'Usuario', 'M']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
							
						ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', 'edilson',  '123', 1, 'Usuario', 'M']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
							
						ConexionServ.query(consulta, ['FELIX', 'DÍAZ', 'felix',  '123', 1, 'Usuario',  'M']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
						
						};
						
		        })
		 
				
				
				
				



				consulta = "SELECT * from preguntas ";
				ConexionServ.query(consulta, []).then(function(result) {
			        if (result.length == 0) {
					
				           	consulta = "INSERT INTO preguntas(definicion, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) VALUES(?,?,?,?,?,?,?,?) ";
				           	ConexionServ.query(consulta, ['¿De donde era Simon Bolivar?', 'Múltiple', 1,  'Colombia', 'Venezuela', 'Francia', 'España', 'B']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						})

				           		consulta = "INSERT INTO preguntas(definicion, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) VALUES(?,?,?,?,?,?,?,?) ";
				           	ConexionServ.query(consulta, ['Cuánto es 51 + 14?', 'Múltiple', 1,  '66', '65', '64', '53', 'B']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						})
						    
						    
						    	consulta = "INSERT INTO preguntas(definicion, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) VALUES(?,?,?,?,?,?,?,?) ";
				           	ConexionServ.query(consulta, ['Cuál día es el de descanso?', 'Múltiple', 1,  'Quinto', 'Septimo', 'Sexto', 'Octavo', 'B']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
						

					};
				
				})
				

				consulta = "SELECT * from pruebas ";
				ConexionServ.query(consulta, []).then(function(result) {
			        if (result.length == 0) {
					
				           	consulta = "INSERT INTO pruebas(nombre, alias, dirigido, mostrar_respuesta, puntos_promedio, tiempo_preg, actual, tiempo_exam) VALUES(?,?,?,?,?,?,?,?) ";
				           	ConexionServ.query(consulta, ['Matarratas', 'mrratas', 'Dirigido',  'Si', 'Puntos', 'No', '', '4:00']).then(function(result) {
				
						}, function(tx) {
							console.log("Dato original no insertado", tx);
						});
						

					};
				
				})
				
			
      
		};
	
	$scope.insertar_datos_iniciales();
	

  });