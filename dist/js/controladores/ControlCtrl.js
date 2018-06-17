angular.module('olimpiada_boom')


.controller('ControlCtrl', function($scope, ConexionServ, $filter, MySocket){
   $scope.mostrando = false;
	$scope.boton1 	= true;

    
    MySocket.emit('traer_clientes');
    
    MySocket.on('clientes_traidos', function(res){
        console.log(res);
    })
    

});