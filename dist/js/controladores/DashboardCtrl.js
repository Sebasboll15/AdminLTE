angular.module('olimpiada_boom')

.controller('DashboardCtrl', function($scope, AuthServ, $state, MySocket, $http){
	
	
	$scope.traer_datos = function(){
		$http.get('::Dashboard').then (function(result){
			$scope.pruebas= result.data ;
			
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
	};
	$scope.traer_datos();		

	AuthServ.verificar_user_logueado().then(function(r){
		$scope.USER = r;

		if ($scope.USER.tipo == 'Usuario') {
			$state.go('main.prueba_respuesta');
		}else {
			$state.go('main');
		}


	    MySocket.emit('toma_mis_datos', {usuario: $scope.USER}, function(datos){
	    	console.log('Ya mandé los datos');
	    })
		
		
	})
	
     

    $scope.traer_puestos = function(){

    	MySocket.emit('necesito_puestos');	

    }

    MySocket.on('toma_los_puestos', function(datos){
    	console.log(datos);
    })
	



	
	
          
       
			
			  


			//$scope.anadir= function(id){
             //  console.log('hol', id); 
              //   consulta = "update  usuarios set  prueba_id= ?  where rowid= ?";
	        // datos= [id, 2];
	       //  ConexionServ.query(consulta, datos).then (function(result){
                   
             //   console.log('Se actualizaron los datos con exito', result);
                
	        // }, function(error){
	         //  console.log('No se pudo actualizar los datos', error);

	       //  })
		  






			//};
             
			$scope.acceder= function(){
              

             AuthServ.cerrar_sesion();
              


              };
});
