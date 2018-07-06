angular.module('olimpiada_boom')


.controller('ControlCtrl', function($scope, ConexionServ, $filter, MySocket){
   $scope.mostrando = false;
	$scope.boton1 	= true;
     $scope.clientes = [];
    
    MySocket.emit('traer_clientes');
    
    MySocket.on('clientes_traidos', function(res){
       
          $scope.clientes = res ;
           console.log( $scope.clientes);
    })
     
    MySocket.on('tomen_los_datos', function(datos){
       
          $scope.clientes = res ;
           console.log( $scope.clientes);
    })
    



});