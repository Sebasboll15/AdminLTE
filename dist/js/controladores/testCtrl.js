angular.module('olimpiada_boom')
.controller('testCtrl', function($scope, ConexionServ, $filter){
      $scope.mostrando= false;
	$scope.boton1= true;
	$scope.pruebas= {};
    



       $scope.traer_dato = function(){

						consulta = "Select rowid, nombre, alias, dirigido, mostrar_respuesta, puntos_promedio, tiempo_preg, tiempo_exam from pruebas";
						ConexionServ.query(consulta, []).then (function(result){
							$scope.pruebas= result ;
							console.log('Se trajo los datos con exito', result);
						}, function(error){
							console.log('No se pudo traer los datos', error);

						})
			



		};
		

             $scope.traer_dato();





			$scope.mostrar= function(){
				$scope.mostrando= true;
				$scope.bsoton1= false;
			
			};
			$scope.salir= function(){
				$scope.mostrando= false;
			};
	
	
  	$scope.insertarPrueba = function(crea){
	         consulta = "Insert into pruebas(nombre, alias, dirigido, mostrar_respuesta, puntos_promedio, tiempo_preg, tiempo_exam) values(?,?,?,?,?,?,?)";
	         datos= [crea.nombre, crea.alias, crea.dirigido, crea.mostrar_respuesta, crea.puntos_promedio, crea.tiempo_preg, crea.tiempo_exam ];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.pruebas= result ;
                $scope.traer_dato();
 
                console.log('Se insertaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo insertar los datos', error);

	         })

	     };
  
    $scope.editarP = function(cambia){
      for (var i = 0; i < $scope.pruebas.length; i++) {
			$scope.pruebas[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    $scope.editarPrueba = function(cambia){
	         consulta = "update  pruebas set nombre=?, alias=?, dirigido=?, mostrar_respuesta=?,puntos_promedio=?, tiempo_preg=?, tiempo_exam=? where rowid=?";
	         datos= [cambia.nombre, cambia.alias, cambia.dirigido, cambia.mostrar_respuesta, cambia.puntos_promedio,cambia.tiempo_preg,cambia.tiempo_exam, cambia.rowid ];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.traer_dato();

                console.log('Se actualizaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  


     

   };
    $scope.eliminar_test = function(prueba){
	         consulta = "delete from pruebas where rowid = ? ";
	         ConexionServ.query(consulta, [prueba]).then (function(result){
                console.log('Se borraron los datos con exito', result);
                 $scope.traer_dato();

	         }, function(error){
	           console.log('No se pudo borrarlos datos', error);

	         })
                   

         }
      
	});