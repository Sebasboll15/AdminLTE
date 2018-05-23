angular.module('olimpiada_boom')

.controller('ModalUCtrl', function($scope, $uibModalInstance, ConexionServ, usuario){
   
    $scope.usuario = usuario;

	$scope.ok = function(usuario){
		consulta = "update  usuarios set password=? where rowid=?";
		datos= [usuario.password, usuario.rowid ];
		
		ConexionServ.query(consulta, datos).then (function(result){

			alert('Presionaste');
			$uibModalInstance.close($scope.usuario);
			console.log('Se actualizaron los datos con exito', result);

		}, function(error){
			console.log('No se pudo actualizar los datos', error);

		})
			  

			
	};

	$scope.cancel = function () {
	   $uibModalInstance.dismiss('cancel');
	}; 
});