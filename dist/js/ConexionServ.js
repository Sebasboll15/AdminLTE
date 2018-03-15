angular.module('olimpiada_boom')

.factory('ConexionServ', function($q, $http, $timeout) {

  var db;


  db = window.openDatabase("MyVc.db", '1', 'Olimpiadas', 1024 * 1024 * 49);

  sqlUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "sexo varchar(1)  NOT NULL," +
                "username varchar(100)  NOT NULL collate nocase," +
                "password varchar(100)  NOT NULL collate nocase," +
                "tipo integer DEFAULT '0')";

                
    result = {
          
        createTables: function(){
            var defered = $q.defer();
            
            db.transaction(function (tx) {

              console.log(tx);
            
                tx.executeSql(sqlUsuarios, [], function (tx, result) {
                    console.log(' Tabla users creada');
                    defered.resolve('Hasta tabla users creada');
                }, function(tx,error){
                    console.log("Tabla users NO se pudo crear", error.message);
                })
          
            });
  
        return defered.promise;
        
        },
        query: function(sql, datos, datos_callback){ // datos_callback para los alumnos en for, porque el i cambia
            var defered = $q.defer();
      
            if(typeof datos === "undefined") {
              datos = [];
            }
      
            db.transaction(function (tx) {
              tx.executeSql(sql, datos, function (tx, result) {
                var items = [];
                for (i = 0, l = result.rows.length; i < l; i++) {
                  items.push(result.rows.item(i));
                }
                if (datos_callback) {
                  defered.resolve({items: items, callback: datos_callback});
                }else{
                  defered.resolve(items);
                }
      
                
      
              }, function(tx,error){
                console.log(error.message, sql, datos);
                defered.reject(error.message, datos_callback)
              }) // db.executeSql
            }); // db.transaction
            return defered.promise;
          },
    }
    
    
    return result;

});