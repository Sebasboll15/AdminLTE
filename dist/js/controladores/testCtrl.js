angular.module('olimpiada_boom')
.controller('testCtrl', function($scope, ConexionServ, $filter){
    $scope.mostrando= false;
	$scope.dejarver= false;
	$scope.boton3= true;
	$scope.boton1= true;
	
	$scope.pruebas= {};
	$scope.preguntas= {};
    

   $scope.seleccionarPrueba = function(prueba){


		consulta = "UPDATE pruebas SET actual=0";
		ConexionServ.query(consulta, []).then (function(result){
			
			consulta = "UPDATE pruebas SET actual=1 WHERE rowid=?";
			ConexionServ.query(consulta, [prueba.rowid]).then (function(result){
				for (var i = 0; i < $scope.pruebas.length; i++) {
					$scope.pruebas[i].actual = 0;
				}
				prueba.actual = 1;
			}, function(error){
				console.log('No se pudo establecer como actual', error);
			})

		}, function(error){
			console.log('No se pudo quitar actuales', error);

		})
			
			



	};


    $scope.traer_dato = function(){

		consulta = "Select p.rowid, p.* from pruebas p";
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
	 		
	 		$scope.verDetallesPrueba= function(id){
				$scope.dejarver= true;
				$scope.boton3= false;
			    
				consulta = "Select u.nombres, u.apellidos, u.rowid from usuarios u INNER JOIN pruebas p ON p.rowid= u.prueba_id";
				ConexionServ.query(consulta, []).then (function(result){
			        console.log( result);
                
			    })
			    consulta = "Select  p.tipo, p.rowid from preguntas p INNER JOIN pruebas prueba ON prueba.rowid= p.prueba_id";
				ConexionServ.query(consulta, []).then (function(result){
                     $scope.preguntas = result ;
			   			 console.log(  $scope.preguntas);
			   })			     
			};
			$scope.ocultar= function(){
				$scope.dejarver= false;
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
                   

         };

    
     $scope.seleccionarUsuarios = function(usu){


		consulta = "Select from usuarios where actual=0";
		ConexionServ.query(consulta, []).then (function(result){
	   })		     
     }; 
	
   
	
	});