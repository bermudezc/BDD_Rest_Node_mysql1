// crea el modelo en mysql


const mysql = require('mysql');




var conectar = mysql.createConnection({
    host: '10.173.97.101',
    user: 'root',
    password: 'secret',
    database: 'empresa_db'
});

try {
    conectar.connect();
    console.log("Conectado a empresa_db...")
} catch (error) {
    console.error('Error en la conexion: ' + error.stack);
}
 
conectar.query('CREATE TABLE `clientes` (    `id_cliente` int NOT NULL AUTO_INCREMENT,    `nit` varchar(9) DEFAULT NULL,     `nombres` varchar(60) DEFAULT NULL,     `apellidos` varchar(60) DEFAULT NULL,     `direccion` varchar(100) DEFAULT NULL,     `telefono` varchar(8) DEFAULT NULL,     `fecha_nacimiento` date DEFAULT NULL,     PRIMARY KEY (`id_cliente`)   )', (error, results) => {
        if (error) {
            throw error;
        } else {
            console.log("creado...") 
        }
    })
 
conectar.query("INSERT INTO clientes VALUES (1,'c/f','Jose Luis','Lopez Perez','Ciudad','5555','1990-01-10');", (error, results) => {
            if (error) {
                throw error;
            } else {
            console.log("insert...")            }
        })
