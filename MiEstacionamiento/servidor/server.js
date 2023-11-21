const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'tito',
    password: 'diaz',
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

app.get('/search', (req, res) => {
    const comuna = req.query.comuna;
    const query = 'SELECT estacionamiento.direccion_est, estacionamiento.tarifa_hora, dueno_estacionamiento.nombre_dueno ' +
        'FROM estacionamiento ' +
        'JOIN dueno_estacionamiento ON estacionamiento.dueno_estacionamiento_rut_dueno = dueno_estacionamiento.rut_dueno ' +
        'JOIN comuna ON estacionamiento.comuna_id_comuna = comuna.id_comuna ' +
        'WHERE comuna.descripcion_comuna = ?';

    db.query(query, [comuna], (err, result) => {
        if (err) {
            console.error('Error al realizar la búsqueda:', err);
            res.status(500).send('Error al realizar la búsqueda');
        } else {
            res.json(result);
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
            res.json(result);
        }
    });
});

app.post('/login', (req, res) => {
    const { nombre_cli, rut_cli } = req.body;
    const query = 'SELECT * FROM cliente WHERE nombre_cli = ? AND rut_cli = ?';

    db.query(query, [nombre_cli, rut_cli], (err, result) => {
        if (err) {
            console.error('Error al autenticar:', err);
            res.status(500).send('Error al autenticar');
        } else {
            if (result.length > 0) {
                res.json({ message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).send('Credenciales incorrectas');
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
