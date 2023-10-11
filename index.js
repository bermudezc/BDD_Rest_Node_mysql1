//import mysql from 'mysql' // o tambien 
const mysql = require('mysql');
const express = require('express')

const app = express();

app.use(express.json())



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



app.get('/', (req, res) => {
    res.send("<h3> Hola servidor funcionando OK...</h3> " +
        " <h3> listar clientes:  get /clientes </h3> ")
})

//Listar Clientes
app.get('/clientes', (req, res) => {
    conectar.query('SELECT clientes.id_cliente,clientes.nit,clientes.nombres,clientes.apellidos,clientes.direccion,clientes.telefono, DATE_FORMAT(clientes.fecha_nacimiento,"%d-%m-%Y") as fecha_nacimiento FROM clientes;', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send( results )
        }
    })
})


//Insertar Cliente
app.post( '/clientes', (req,res)=>{
    

    cliente = req.body
    a=
    {   
        "nit": req.body.nit,
        "nombres": req.body.nombres,
        "apellidos": req.body.apellidos,
        "direccion": req.body.direccion,
        "telefono": req.body.telefono,
        "fecha_nacimiento": "str_to_date('"+req.body.fecha_nacimiento + "','%m-%d-%Y')"
      }


    console.log( a )
    conectar.query('insert into clientes SET ?', a , (error, results)=>{
        if(error){
            console.log(error);
        }else{
            //console.log(results);   
            res.send(results);         
        }
    });
})


app.listen(8000, () => { console.log("Servidor en puerto 8000...") })