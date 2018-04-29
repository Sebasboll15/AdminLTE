angular.module('olimpiada_boom')


.controller('usersCtrl', function($scope, ConexionServ, $filter){
	$scope.mostrando= false;
	$scope.boton1= true;
	$scope.usuarios= {};
    
    $scope.traer_datos = function(){



					consulta = "Select *,rowid from usuarios";
					ConexionServ.query(consulta, []).then (function(result){
						$scope.usuarios= result ;
						console.log('Se trajo los datos con exito', result);
					}, function(error){
						console.log('No se pudo traer los datos', error);

					})
			
    };
      $scope.traer_datos();

			$scope.mostrar= function(){
				$scope.mostrando= true;
				$scope.bsoton1= false;
			
			};
			$scope.salir= function(){
				$scope.mostrando= false;
			};
	
	
  	$scope.insertarUsuarios = function(crea){
	         consulta = "Insert into usuarios(nombres, apellidos, sexo, username, password, prueba_id, tipo) values(?,?,?,?,?,?,?)";
	         datos= [crea.nombres, crea.apellidos, crea.sexo, crea.username, crea.password, crea.prueba_id, crea.tipo ];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.usuarios= result ;
               $scope.traer_datos();
                console.log('Se insertaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo insertar los datos', error);

	         })

	     };
  
    $scope.editarU = function(cambia){
      for (var i = 0; i < $scope.usuarios.length; i++) {
			$scope.usuarios[i].editando = false;
		}
		cambia.editando = true; 
	


    
    };
    $scope.editarUsuario = function(cambia){
	         consulta = "update  usuarios set nombres=?, apellidos=?, sexo=?, username=?, prueba_id=?, tipo=? where rowid=?";
	         datos= [cambia.nombres, cambia.apellidos, cambia.sexo, cambia.username, cambia.prueba_id, cambia.tipo, cambia.rowid ];
	         ConexionServ.query(consulta, datos).then (function(result){
                $scope.traer_datos();
                console.log('Se actualizaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  


     

   };
    $scope.eliminar_user = function(usuario){
	         consulta = "delete from usuarios where rowid = ? ";
	         ConexionServ.query(consulta, [usuario]).then (function(result){
                console.log('Se borraron los datos con exito', result);
                  $scope.traer_datos();
	         }, function(error){
	           console.log('No se pudo borrarlos datos', error);

	         })
                  

         }
      
});