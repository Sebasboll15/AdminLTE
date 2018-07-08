angular.module('olimpiada_boom')


.controller('usersCtrl', function($scope, ConexionServ, $http, $filter, $uibModal){
	$scope.mostrando= false;
	$scope.boton1= true;
	$scope.usuarios= {};
    
    $scope.traer_datos = function(){

		$http.get('::usuarios').then (function(result){
			$scope.usuarios = result.data ;
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
	         
        if (crea.password != crea.passwordn) {
  			alert('Las dos contraseñas no son iguales')
  			return;
  		}
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



	$scope.abrirModal = function (usuario) {

    	var modalInstance = $uibModal.open({
			templateUrl: 'dist/templates/modalUsuario.html',
			controller: 'ModalUCtrl',
			resolve: {
			    usuario: function () {
			    	return usuario;
			    }
			},
      	})
            
  		modalInstance.result.then(function (usuariores) {
	     console.log(usuariores);
	    }, function () {
	      console.log();
	    });
        
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
    $scope.eliminar_user = function(rowid){

		$http.delete('::usuarios/eliminar', {params: { id: rowid } }).then (function(result){
			console.log('Se borraron los datos con exito', result);
            $scope.traer_datos();
		}, function(error){
			console.log('No se pudo borrarlos datos', error);

		})

    };
  







			

       

  
});
 

