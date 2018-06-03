angular.module('olimpiada_boom')

.factory('ConexionServ', function($q, $http, $timeout) {

  var db;


  db = window.openDatabase("Olimpiadas_Boom.db", '1', 'Olimpiadas_Boom', 1024 * 1024 * 49);

  sqlUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (id integer," +
                "nombres varchar(100)  NOT NULL collate nocase," +
                "apellidos varchar(100)  DEFAULT NULL collate nocase," +
                "sexo varchar(100)  NOT NULL," +
                "username varchar(100)  NOT NULL collate nocase," +
                "password varchar(100)  NOT NULL collate nocase," +
                "prueba_id integer(100)  DEFAULT NULL," +
                "tipo integer DEFAULT '0')";

sqlPreguntas = "CREATE TABLE IF NOT EXISTS preguntas (id integer," +
                "definicion varchar(300)  NOT NULL collate nocase," +
                "tipo varchar(100)  NOT NULL collate nocase," +
                "prueba_id integer(100)  DEFAULT NULL," +
                "opc_a varchar(100)  DEFAULT NULL collate nocase," +
                "opc_b varchar(100)  DEFAULT NULL collate nocase," +
                "opc_c varchar(100)  DEFAULT NULL collate nocase," +
                "opc_d varchar(100)  DEFAULT NULL collate nocase," +
                "correcta varchar(100)  NOT NULL collate nocase," +
                "defini_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_a_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_b_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_c_img varchar(100)  DEFAULT NULL collate nocase," +
                "opc_d_img varchar(100)  DEFAULT NULL collate nocase," +
                "puntos varchar(100)  DEFAULT NULL collate nocase)";

sqlRespuestas = "CREATE TABLE IF NOT EXISTS respuestas (id integer," +
                "preg_id integer(100)  NOT NULL," +
                "usuario_id integer(100)  DEFAULT NULL," +
                "opcion_elegida varchar(100)  NOT NULL," +
                "correcta varchar(100)  NOT NULL collate nocase," +
                "duracion varchar(100)  NOT NULL collate nocase)";       
  
  sqlPruebas = "CREATE TABLE IF NOT EXISTS pruebas (id integer," +
                "nombre varchar(100)  NOT NULL collate nocase," +
                "alias varchar(100)  DEFAULT NULL collate nocase," +
                "dirigido varchar(100)  NOT NULL," +
                "mostrar_respuesta varchar(100)  NOT NULL collate nocase," +
                "puntos_promedio varchar(100)  NOT NULL collate nocase," +
                "tiempo_preg varchar(100)  NOT NULL collate nocase," +
                "actual integer(1)  DEFAULT NULL," +
                "tiempo_exam varchar(100)  NOT NULL collate nocase)";  
           

    result = {
          
        createTables: function(){
            var defered = $q.defer();
            
            db.transaction(function (tx) {

              console.log(tx);
            
                tx.executeSql(sqlUsuarios, [], function (tx, result) {
                    defered.resolve('Hasta tabla users creada');
                }, function(tx,error){
                    console.log("Tabla users NO se pudo crear", error.message);
                })
                

                 tx.executeSql(sqlPreguntas, [], function (tx, result) {
                    defered.resolve('Hasta tabla preguntas creada');
                }, function(tx,error){
                    console.log("Tabla preguntas NO se pudo crear", error.message);
                })
                 
                 tx.executeSql(sqlRespuestas, [], function (tx, result) {
                    defered.resolve('Hasta tabla respuestas creada');
                }, function(tx,error){
                    console.log("Tabla respuestas NO se pudo crear", error.message);
                })

                   tx.executeSql(sqlPruebas, [], function (tx, result) {
                    defered.resolve('Hasta tabla pruebas creada');
                }, function(tx,error){
                    console.log("Tabla preguntas NO se pudo crear", error.message);
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