angular.module('olimpiada_boom')

.controller('Prueba_respuestasCtrl', function(ConexionServ, $scope, AuthServ, USER ){

	ConexionServ.createTables();
	$scope.usuario= USER ;
    $scope.respuesta_llevada={};
    $scope.indice_preg = 0;

  
	consulta = "Select p.*, p.rowid from pruebas p WHERE p.rowid = ?";
	ConexionServ.query(consulta, [$scope.usuario.prueba_id]).then (function(result){
		$scope.prueba = result[0] ;

		consulta = "Select p.* , p.rowid from preguntas p where p.prueba_id=? ";
		ConexionServ.query(consulta, [$scope.prueba.rowid]).then (function(result){
			$scope.preguntas = result ;
			
			console.log('Se trajo los datos con exito', $scope.preguntas);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})

                 
	}, function(error){
		console.log('No se pudo traer los datos', error);

	})
	
	$scope.traer_dato();

    $scope.seleccionarOpcion = function(opcion) {

    	correcta = 0;
    	if ($scope.preguntas[$scope.indice_preg].correcta == opcion ) {
    		correcta = 1;
    	}
         
    	consulta = "Insert into respuestas(preg_id, usuario_id, opcion_elegida, correcta, duracion) values(?,?,?,?,?)";
	    datos = [$scope.preguntas[$scope.indice_preg].rowid, USER.nombres + USER.apellidos, opcion, correcta, 0];
	    
	    ConexionServ.query(consulta, datos).then (function(result){
        	
        	if ($scope.prueba.dirigido == 1) {

        	}else{

        		$scope.indice_preg = $scope.indice_preg + 1;

        	}

        	if ($scope.indice_preg == $scope.preguntas.length) {
        	
        	 alert('Haz terminado la prueba');
        	  AuthServ.cerrar_sesion();
        	}
        	
                
        }, function(error){
           console.log('No se pudo insertar los datos', error);

        })


    };    	

});