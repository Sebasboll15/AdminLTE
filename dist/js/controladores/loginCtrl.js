angular.module('olimpiada_boom')

  .controller('loginCtrl', function($scope,  $state, ConexionServ, $filter, $uibModal, AuthServ){
       $scope.user = {username: 'jorge', password: '123'}
    
  

    
    $scope.iniciar = function(user){

        AuthServ.loguear(user).then(function(){
            $state.go('main');
        }, function(){
            alert('Datos incorrectos');
        })
    
        
    }
       
    ConexionServ.createTables();

    	$scope.insertar_datos_iniciales = function() {
		
    	consulta = "SELECT * from usuarios ";
   		ConexionServ.query(consulta, []).then(function(result) {
			if (result.length == 0) {
				
				consulta = "INSERT INTO usuarios(nombres, apellidos, username, password, tipo, sexo) VALUES(?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['JORGE', 'CELEDON', 'jorge',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				ConexionServ.query(consulta, ['JUAN CAMILO', 'MANRRIQUE', 'juan',  '123', 'Usuario', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['DANIEL', 'GRANDAS', 'daniel',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['EDILSON', 'MARQUEZ', 'edilson',  '123', 'Usuario', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
					
				ConexionServ.query(consulta, ['FELIX', 'DÍAZ', 'felix',  '123', 'Admin', 'M']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
				
				
				// Distritos
				
				consulta = "INSERT INTO preguntas(definición, tipo, prueba_id, opc_a, opc_b, opc_c, opc_d, correcta) VALUES(?,?,?,?,?,?,?,?) ";
				ConexionServ.query(consulta, ['´De donde era Simon Bolivar?', 'Múltiple', 1,  'Colombia', 'Venezuela', 'Francia', 'España', 'A']).then(function(result) {
		
				}, function(tx) {
					console.log("Dato original no insertado", tx);
				});
				
			}	
			
        }, function(tx) {
            console.log("error", tx);
		});
		
	};
	
	$scope.insertar_datos_iniciales();
	

  });