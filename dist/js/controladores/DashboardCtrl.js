angular.module('olimpiada_boom')

.controller('DashboardCtrl', function(ConexionServ, $scope, AuthServ){

  ConexionServ.createTables();
	
	AuthServ.verificar_user_logueado().then(function(r){
		$scope.USER = r;
		console.log($scope.USER)
	})
		

  $scope.pregunta = {};
  $scope.meses = [
  	{mes: 'Enero'},
  	{mes: 'Febrero'},
  	{mes: 'Marzo'},
  	{mes: 'Abril'}
  ]

consulta = "Select *, rowid from pruebas";
	ConexionServ.query(consulta, []).then (function(result){
		$scope.pruebas= result ;

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
});