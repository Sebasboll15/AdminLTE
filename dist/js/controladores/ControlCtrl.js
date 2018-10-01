angular.module('olimpiada_boom')


.controller('ControlCtrl', function($scope, ConexionServ, $filter, MySocket, $uibModal, USER){
   $scope.mostrando = false;
	$scope.boton1 	= true;
     $scope.clientes = [];
    $scope.user = USER.id;
      console.log($scope.user);
 

    setTimeout(function(){

       MySocket.emit('tomen_mis_datos');

       }, 1000);
       
       MySocket.on('alguien_logueado', function(datos){
        setTimeout(function(){  MySocket.emit('traer_clientes')

          }, 1000);


        });
    
    MySocket.on('clientes_traidos',function(res){
       
          $scope.clientes = res ;
           console.log('hola', $scope.clientes);

           for (var i = 0; i < $scope.clientes.length; i++) {
         $scope.clientes[i].id == $scope.user ;
        
          $scope.clientes[i].resourceId = $scope.idUSUARIO;
            console.log('PERRO', $scope.idUSUARIO);
        };
          
  

    });
 

    $scope.OpenModalUser = function (cliente) {

      var modalInstance = $uibModal.open({
      templateUrl: 'dist/templates/ModalControlUser.html',
      controller: 'ModalControlUserCtrl',
      resolve: {
          cliente: function () {
            return cliente;
          }
      },
        })
    }
    



});