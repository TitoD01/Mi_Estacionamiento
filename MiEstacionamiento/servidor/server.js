const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Agrega body-parser
const cors = require('cors'); // Agrega cors

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'tito',
    password: 'diaz',
    database: 'bd_estacionamiento',
});
app.use(cors());

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// Usar body-parser como middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de ejemplo para obtener datos desde la base de datos
app.post('/login', (req, res) => {
    const { nombre_cli, rut_cli } = req.body;
    const query = 'SELECT * FROM cliente WHERE nombre_cli = ? AND rut_cli = ?';

    db.query(query, [nombre_cli, rut_cli], (err, result) => {
        if (err) {
            console.error('Error al autenticar:', err);
            res.status(500).send('Error al autenticar');
        } else {
            if (result.length > 0) {
                // Autenticación exitosa
                res.json({ message: 'Inicio de sesión exitoso' });
            } else {
                // Autenticación fallida
                res.status(401).send('Credenciales incorrectas');
            }
        }
    });
});

// Ruta de ejemplo para guardar datos en la base de datos
app.post('/guardar', (req, res) => {
    const newData = req.body;
    const query = 'INSERT INTO bd_estacionamiento SET ?';
    db.query(query, newData, (err, result) => {
        if (err) {
            console.error('Error al guardar datos:', err);
            res.status(500).send('Error al guardar datos');
        } else {
            res.json({ message: 'Datos guardados correctamente' });
        }
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});
