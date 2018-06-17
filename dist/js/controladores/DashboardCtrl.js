angular.module('olimpiada_boom')

.controller('DashboardCtrl', function(ConexionServ, $scope, AuthServ, $state, MySocket){

	ConexionServ.createTables();
	
	AuthServ.verificar_user_logueado().then(function(r){
		$scope.USER = r;

		if ($scope.USER.tipo == 'Usuario') {
			$state.go('main.prueba_respuesta');
		}else {
			$state.go('main');
		}
		
	})
	
    


  
         

         $scope.traer_dato = function(){
			consulta = "Select *, rowid from pruebas";
				ConexionServ.query(consulta, []).then (function(result){
					$scope.pruebas= result ;
				}, function(error){
					console.log('No se pudo traer los datos', error);

				})
          };
           $scope.traer_dato();

				consulta = "Select *, rowid from usuarios";
				ConexionServ.query(consulta, []).then (function(result){
					$scope.usuarios= result ;
				}, function(error){
					console.log('No se pudo traer los datos', error);

				})

			  


			$scope.anadir= function(id){
               console.log('hol', id); 
                 consulta = "update  usuarios set  prueba_id= ?  where rowid= ?";
	         datos= [id, 2];
	         ConexionServ.query(consulta, datos).then (function(result){
                   
                console.log('Se actualizaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo actualizar los datos', error);

	         })
		  






			};
             
			$scope.acceder= function(){
              

             AuthServ.cerrar_sesion();



              };
});
