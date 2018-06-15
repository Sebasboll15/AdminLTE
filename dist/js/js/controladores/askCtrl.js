angular.module('olimpiada_boom')


.controller('askCtrl', function($scope, ConexionServ, $filter){
   $scope.mostrando = false;
	$scope.boton1 	= true;
	$scope.usuarios	= {};
	$scope.preg_nueva 	= {};
	$scope.preg_edit 	= {};

	
        $scope.traer_datos= function(){


					consulta = "Select p.* , p.rowid, n.alias from preguntas p INNER JOIN pruebas n ON p.prueba_id= n.rowid";
					ConexionServ.query(consulta, []).then (function(result){
						$scope.preguntas= result ;
						console.log('Se trajo los datos con exito', result);
					}, function(error){
						console.log('No se pudo traer los datos', error);

					})

        };
         $scope.traer_datos();

			$scope.mostrar= function(){
				$scope.mostrando= true;
				$scope.boton1= false;
			
			};
			 $scope.salir = function(){
              $scope.mostrando= false
             };
	
	
  	$scope.insertarAsk = function(crea){
        $scope.mostrando = false;
  		if (crea.definicion == '' || crea.definicion == undefined) {
  			alert('Debe escribir la definición');
  			return;
  		}



	         consulta = "Insert into preguntas(definicion, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) values(?,?,?,?,?,?,?,?)";
	         datos= [crea.definicion, crea.tipo, crea.prueba_id,  crea.opc_a, crea.opc_b, crea.opc_c, crea.opc_d, crea.correcta ];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.preguntas= result ;
                    $scope.traer_datos();
                console.log('Se insertaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo insertar los datos', error);

	         })
             
	     };
  
    $scope.editarP = function(cambia){
      for (var i = 0; i < $scope.preguntas.length; i++) {
			$scope.preguntas[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    $scope.editarAsk = function(cambia){
	         consulta = "update  preguntas set definicion=?, tipo=?, prueba_id=?, opc_a=?, opc_b=?, opc_c=?, opc_d=?, correcta=? where rowid=?";
	         datos= [cambia.definicion, cambia.tipo, cambia.prueba_id, cambia.opc_a, cambia.opc_b, cambia.opc_c, cambia.opc_d, cambia.correcta, cambia.rowid ];
	         ConexionServ.query(consulta, datos).then (function(result){
            	     $scope.traer_datos();
                console.log('Se actualizaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  


     

   };
    $scope.eliminar_ask = function(pregunta){
	         consulta = "delete from preguntas where rowid = ? ";
	         ConexionServ.query(consulta, [pregunta]).then (function(result){
                    $scope.traer_datos();
                console.log('Se borraron los datos con exito', result);

	         }, function(error){
	           console.log('No se pudo borrarlos datos', error);

	         })
             


         }

  

});

