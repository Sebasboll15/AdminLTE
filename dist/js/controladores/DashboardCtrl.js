angular.module('olimpiada_boom')

.controller('DashboardCtrl', function(ConexionServ, $scope){

  ConexionServ.createTables()
$scope.mostrando= false;
$scope.boton1= true;
$scope.usuarios= {};
})

.controller('usersCtrl', function($scope, ConexionServ){
	consulta = "Select rowid, nombres, apellidos, sexo, username, password, tipo from usuarios";
	ConexionServ.query(consulta, []).then (function(result){
		$scope.usuarios= result ;
		console.log('Se trajo los datos con exito', result);
	}, function(error){
		console.log('No se pudo traer los datos', error);

	})
	$scope.mostrar= function(){
	$scope.mostrando= true;
	$scope.bsoton1= false;
	
	}
  $scope.insertarUsuarios = function(crea){
	         consulta = "Insert into usuarios(nombres, apellidos, sexo, username, password, tipo) values(?,?,?,?,?,?)";
	         datos= [crea.nombres, crea.apellidos, crea.sexo, crea.username, crea.password, crea.tipo ];
	         ConexionServ.query(consulta, datos).then (function(result){
               $scope.usuarios= result ;
                console.log('Se insertaron los datos con exito', result);
                
	         }, function(error){
	           console.log('No se pudo insertar los datos', error);

	         })
   };
   
});