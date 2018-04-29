angular.module('olimpiada_boom')


.controller('answerCtrl', function($scope, ConexionServ, $filter){
   $scope.mostrando = false;
	$scope.boton1 	= true;
	$scope.usuarios	= {};
	$scope.resp_nueva 	= {};
	$scope.resp_edit 	= {};

	$scope.traer_dato= function(){
		consulta = "Select r.*, r.rowid from respuestas r INNER JOIN preguntas p ON r.preg_id= p.rowid";
		ConexionServ.query(consulta, []).then (function(result){
			$scope.respuestas= result ;
			console.log(result);
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
   
    };
    
    $scope.traer_dato();




	consulta = "Select *, rowid from preguntas";
	ConexionServ.query(consulta, []).then (function(result){
		$scope.preguntas= result ;

		console.log('Se trajo los datos con exito', result);
	}, function(error){
		console.log('No se pudo traer los datos', error);

	})
	consulta = "Select *, rowid from usuarios";
	ConexionServ.query(consulta, []).then (function(result){
		$scope.usuarios= result ;

		console.log('Se trajo los datos con exito', result);
	}, function(error){
		console.log('No se pudo traer los datos', error);

	})


			$scope.mostrar= function(){
				$scope.mostrando= true;
				$scope.bsoton1= false;
			
			};
			$scope.salir= function(){
				$scope.mostrando= false;
			};
	
	
  	$scope.insertarRespuesta = function(crea){
        $scope.mostrando = false;
  		if (crea.duracion == '' || crea.duracion== undefined) {
  			alert('Debe escribir la duracion');
  			return;
  		}



	         consulta = "Insert into respuestas(preg_id, usuario_id, opcion_elegida, correcta, duracion) values(?,?,?,?,?)";
	         datos= [crea.preg_id, crea.usuario_id, crea.opcion_elegida, crea.correcta, crea.duracion ];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.respuestas= result ;
                 $scope.traer_dato();


                console.log('Se insertaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo insertar los datos', error);

	         })
             
	     };
  
    $scope.editarR = function(cambia){
      for (var i = 0; i < $scope.respuestas.length; i++) {
			$scope.respuestas[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    $scope.editarRespuesta = function(cambia){
	         consulta = "update  respuestas set preg_id=?, usuario_id=?, opcion_elegida=?, correcta=?, duracion=? where rowid=?";
	         datos= [cambia.preg_id, cambia.usuario_id, cambia.opcion_elegida, cambia.correcta, cambia.duracion, cambia.rowid ];
	         ConexionServ.query(consulta, datos).then (function(result){
                     $scope.traer_dato();
                console.log('Se actualizaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  


     

   };
    $scope.eliminar_ans = function(respuesta){
    		console.log(respuesta);
	         consulta = "delete from respuestas where rowid = ? ";
	         ConexionServ.query(consulta, [respuesta]).then(function(result){
                console.log('Se borraron los datos con exito', result);
                $scope.traer_dato();
	         }, function(error){
	           console.log('No se pudo borrarlos datos', error);

	         })
             	


         }
});