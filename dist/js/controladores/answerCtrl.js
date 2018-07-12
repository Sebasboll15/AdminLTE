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
	
		  

    $scope.eliminar_ans = function(respuesta){
    	console.log(respuesta);
	    consulta = "delete from respuestas where rowid = ? ";
	    ConexionServ.query(consulta, [respuesta]).then(function(result){
        console.log('Se borraron los datos con exito', result);
        $scope.traer_dato();
	    }, function(error){
	     console.log('No se pudo borrarlos datos', error);

	    });
             	


    };
    
});