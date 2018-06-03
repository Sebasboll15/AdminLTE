angular.module('olimpiada_boom')

.controller('Prueba_respuestasCtrl', function(ConexionServ, $scope, AuthServ, USER ){

	ConexionServ.createTables();
	$scope.usuario= USER ;
    $scope.respuesta_llevada={};

  
	consulta = "Select p.*, p.rowid from pruebas p WHERE p.rowid = ?";
	ConexionServ.query(consulta, [$scope.usuario.prueba_id]).then (function(result){
		$scope.prueba = result[0] ;

		consulta = "Select p.* , p.rowid from preguntas p where p.prueba_id=? ";
		ConexionServ.query(consulta, [$scope.prueba.rowid]).then (function(result){
			$scope.prueba_preguntas = result ;
			
			console.log('Se trajo los datos con exito', $scope.prueba_preguntas);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})

                 
	}, function(error){
		console.log('No se pudo traer los datos', error);

	})
	
	$scope.traer_dato();

    $scope.guardar = function(llevar) {
         
    	 consulta = "Insert into respuestas(pregunta) values(?)";
	         datos= [llevar.pregunta];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.respuestas= result ;
                $scope.traer_dato();
 
                console.log('Se insertaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo insertar los datos', error);

	         })

         $scope.respuesta_llevada= llevar;
        
        if ($scope.respuesta_llevada.opc_a == '') {}


    };    	

});