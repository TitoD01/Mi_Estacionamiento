const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'nano',
    password: 'nano1234',
    database: 'bd_estacionamiento',
});
app.use(cors());
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/registrarCliente', (req, res) => {
    const { nombre_cli, apellido_cli, rut_cli } = req.body;
    const query = 'INSERT INTO cliente (nombre_cli, apellido_cli, rut_cli) VALUES (?, ?, ?)';
    db.query(query, [nombre_cli, apellido_cli, rut_cli], (err, result) => {
        if (err) {
            console.error('Error al registrar cliente:', err);
            res.status(500).send('Error al registrar cliente');
        } else {
            res.json({ message: 'Cliente registrado correctamente' });
        }
    });
});

app.post('/registrarVehiculo', (req, res) => {
    const { patente, descripcion_modelo, anno, cliente_rut_cli, marca_id_marca } = req.body;
    const query = 'INSERT INTO vehiculo (patente, descripcion_modelo, anno, cliente_rut_cli, marca_id_marca) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [patente, descripcion_modelo, anno, cliente_rut_cli, marca_id_marca], (err, result) => {
      if (err) {
        console.error('Error al registrar vehículo:', err);
        res.status(500).send('Error al registrar vehículo');
      } else {
        res.json({ message: 'Vehículo registrado correctamente' });
      }
    });
  });

app.get('/marcas', (req, res) => {
    const query = 'SELECT id_marca, descripcion FROM marca';
  
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error al obtener las marcas:', err);
        res.status(500).send('Error al obtener las marcas');
      } else {
        res.json(result); // Devuelve el resultado directamente
      }
    });
  });

app.listen(port, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
