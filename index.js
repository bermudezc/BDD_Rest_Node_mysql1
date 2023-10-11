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
    res.send("<h2> API_REST Clientes funcionando OK...</h2> " +
        " <h3> listar clientes:  get /clientes </h3> " +
        " <h3> Insertar clientes:  post /clientes </h3> " +
        " <h3> Borrar cliente:  delete /clientes/id </h3> " +
        " <h3> Modificar cliente:  put /clientes/id </h3> " +
        " <h3> listar cliente:  get /clientes/id </h3> ") 
})

//Listar Clientes
app.get('/clientes', (req, res) => {
    conectar.query('SELECT clientes.id_cliente,clientes.dni,clientes.nombres,clientes.apellidos,clientes.direccion,clientes.telefono, DATE_FORMAT(clientes.fecha_nacimiento,"%d-%m-%Y") as fecha_nacimiento FROM clientes;', (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results)
        }
    })
})


//listar un cliente
app.get('/clientes/:id', (req, res) => {
    const id = req.params.id
    conectar.query('select * from clientes where id_cliente=?', id, (error, results) => {
        if (error || results.length === 0) {
            res.send("El cliente no existe...")
        } else {
             res.send(results)
        }
    })
})


//Insertar Cliente
// La FECHA es "YYYY-MM-DD"
app.post('/clientes', (req, res) => {
    a = {
        "dni": req.body.dni,
        "nombres": req.body.nombres,
        "apellidos": req.body.apellidos,
        "direccion": req.body.direccion,
        "telefono": req.body.telefono,
        "fecha_nacimiento": req.body.fecha_nacimiento
    }

    conectar.query('insert into clientes SET ?', a, (error, results) => {
        if (error) {
            console.log(error);
        } else {
            //console.log(results);   
            res.send(results);
        }
    });
})

//Borrar un cliente
app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id
    conectar.query('select * from clientes where id_cliente=?', id, (error, results) => {
        if (error || results.length === 0) {
            res.send("El cliente no existe...")
        } else {
            conectar.query('delete from clientes  where id_cliente = ?', [id], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send("Cliente " + id + " borrado")

                }
            })
        }
    })
})

//Update cliente
app.put("/clientes/:id", (req, res) => {
    const id = req.params.id
    conectar.query('select * from clientes where id_cliente=?', id, (error, results) => {
        if (error || results.length === 0) {
            res.send("El cliente no existe...")
        } else {
            conectar.query('update clientes set ? where id_cliente = ?', [req.body, id], (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send(results)

                }
            })
        }
    })
})

app.listen(8000, () => { console.log("Servidor en puerto 8000...") })