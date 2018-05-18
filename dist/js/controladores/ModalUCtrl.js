angular.module('olimpiada_boom')

.controller('ModalUCtrl', function($scope, $uibModalInstance, ConexionServ, $uibModal){
    $scope.usuario = {};
     consulta = "Select *,rowid from usuarios";
		ConexionServ.query(consulta, []).then (function(result){
			$scope.usuarios= result ;
			console.log('Se trajo los datos con exito', result);
		}, function(error){
			console.log('No se pudo traer los datos', error);

		})
		$scope.ok = function(cambia){
						consulta = "update  usuarios set password=? where rowid=?";
				         datos= [cambia.password, cambia.rowid ];
				         ConexionServ.query(consulta, datos).then (function(result){
			                $scope.traer_datos();
			                console.log('Se actualizaron los datos con exito', result);
			                
				         }, function(error){
				           console.log('No se pudo actualizar los datos', error);

				         })
					  

						alert('Presionaste');
						$uibModalInstance.close($scope.usuario);
				};

			  $scope.cancel = function () {
			   $modalInstance.dismiss('cancel');
			  }; 
});