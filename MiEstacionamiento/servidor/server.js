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
    const query = 'SELECT estacionamiento.id_estacionamiento,estacionamiento.direccion_est, estacionamiento.tarifa_hora, dueno_estacionamiento.nombre_dueno ' +
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
    const { nombre_usuario, rut } = req.body;
    const queryCliente = 'SELECT * FROM cliente WHERE nombre_cli = ? AND rut_cli = ?';
    const queryDuenoEstacionamiento = 'SELECT * FROM dueno_estacionamiento WHERE nombre_dueno = ? AND rut_dueno = ?';

    db.query(queryCliente, [nombre_usuario, rut], (errCliente, resultCliente) => {
        if (errCliente) {
            console.error('Error al autenticar cliente:', errCliente);
            res.status(500).send('Error al autenticar');
        } else {
            if (resultCliente.length > 0) {
                // Cliente encontrado, devuelve el tipo de usuario
                res.json({ message: 'Inicio de sesión exitoso', user: resultCliente[0], tipoUsuario: 'cliente', rut: resultCliente[0].rut_cli });
            } else {
                // No encontrado en cliente, intenta buscar en dueno_estacionamiento
                db.query(queryDuenoEstacionamiento, [nombre_usuario, rut], (errDueno, resultDueno) => {
                    if (errDueno) {
                        console.error('Error al autenticar dueño de estacionamiento:', errDueno);
                        res.status(500).send('Error al autenticar');
                    } else {
                        if (resultDueno.length > 0) {
                            // Dueño de estacionamiento encontrado, devuelve el tipo de usuario
                            res.json({ message: 'Inicio de sesión exitoso', user: resultDueno[0], tipoUsuario: 'dueno_estacionamiento' });
                        } else {
                            // No encontrado en cliente ni en dueño_estacionamiento
                            res.status(401).send('Credenciales incorrectas');
                        }
                    }
                });
            }
        }
    });
});


app.get('/comunas', (req, res) => {
    const query = req.query.query || '';
    const searchQuery = `%${query}%`;
    const queryStr = 'SELECT id_comuna, descripcion_comuna FROM comuna WHERE descripcion_comuna LIKE ?';
  
    db.query(queryStr, [searchQuery], (err, result) => {
      if (err) {
        console.error('Error al realizar la búsqueda de comunas:', err);
        res.status(500).send('Error al realizar la búsqueda de comunas');
      } else {
        // Modifica el resultado para enviar id_comuna y descripcion_comuna
        const formattedResult = result.map(item => ({ id_comuna: item.id_comuna, descripcion_comuna: item.descripcion_comuna }));
        res.json(formattedResult);
      }
    });
  });
  

  app.post('/registrarDuenoEstacionamiento', (req, res) => {
    const { nombre_dueno, apellido_dueno, rut_dueno } = req.body;
    const query = 'INSERT INTO dueno_estacionamiento (nombre_dueno, apellido_dueno, rut_dueno) VALUES (?, ?, ?)';
    
    db.query(query, [nombre_dueno, apellido_dueno, rut_dueno], (err, result) => {
        if (err) {
            console.error('Error al registrar dueño de estacionamiento:', err);
            res.status(500).send('Error al registrar dueño de estacionamiento');
        } else {
            res.json({ message: 'Dueño de estacionamiento registrado correctamente' });
        }
    });
});

app.post('/registrarEstacionamiento', (req, res) => {
    const { direccion_est, tarifa_hora, dueno_estacionamiento_rut_dueno, comuna_id_comuna } = req.body;
    const query = 'INSERT INTO estacionamiento (direccion_est, tarifa_hora, dueno_estacionamiento_rut_dueno, comuna_id_comuna) VALUES (?, ?, ?, ?)';
    
    db.query(query, [direccion_est, tarifa_hora, dueno_estacionamiento_rut_dueno, comuna_id_comuna], (err, result) => {
        if (err) {
            console.error('Error al registrar estacionamiento:', err);
            res.status(500).send('Error al registrar estacionamiento');
        } else {
            res.json({ message: 'Estacionamiento registrado correctamente' });
        }
    });
});

app.get('/vehiculos/:rutCliente', (req, res) => {
    const rutCliente = req.params.rutCliente;
    const query = 'SELECT patente, descripcion_modelo FROM vehiculo WHERE cliente_rut_cli = ?';

    db.query(query, [rutCliente], (err, result) => {
        if (err) {
            console.error('Error al obtener vehículos:', err);
            res.status(500).send('Error al obtener vehículos');
        } else {
            res.json(result);
        }
    });
});

app.get('/tarjetas/:rutCliente', (req, res) => {
    const rutCliente = req.params.rutCliente;
    const query = 'SELECT ta.n_tarjeta, ba.nombre_banco FROM tarjeta ta INNER JOIN banco ba ON ta.banco_id_banco = ba.id_banco WHERE ta.cliente_rut_cli = ?';
  
    db.query(query, [rutCliente], (err, result) => {
      if (err) {
        console.error('Error al obtener tarjetas:', err);
        res.status(500).send('Error al obtener tarjetas');
      } else {
        res.json(result);
      }
    });
  });

  app.post('/insertarArriendo', (req, res) => {
    const { horarioInicio, horarioTermino, vehiculoPatente, estacionamientoId } = req.body;
    const query = 'INSERT INTO arriendo (fecha_inicio, fecha_termino, vehiculo_patente, estacionamiento_id_estacionamiento) VALUES (?, ?, ?, ?)';
  
    db.query(query, [horarioInicio, horarioTermino, vehiculoPatente, estacionamientoId], (err, result) => {
      if (err) {
        console.error('Error al insertar arriendo:', err);
        res.status(500).send('Error al insertar arriendo');
      } else {
        res.json({ message: 'Arriendo registrado correctamente' });
      }
    });
  });

// Añade este nuevo endpoint en server.js
app.get('/obtenerUltimoArriendoId', (req, res) => {
    const query = 'SELECT LAST_INSERT_ID() as id_arriendo';
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener el último id_arriendo:', err);
            res.status(500).send('Error al obtener el último id_arriendo');
        } else {
            res.json(result[0]);
        }
    });
});

// Modifica el endpoint de realizarPago en server.js
app.post('/realizarPago', (req, res) => {
    const { detalle_pago } = req.body;
    
    // Obtén el último id_arriendo
    db.query('SELECT LAST_INSERT_ID() as id_arriendo', (err, result) => {
        if (err) {
            console.error('Error al obtener el último id_arriendo:', err);
            res.status(500).send('Error al obtener el último id_arriendo');
        } else {
            const arriendo_id_arriendo = result[0].id_arriendo;

            // Continúa con la inserción en la tabla pago
            const query = 'INSERT INTO pago (fecha_pago, detalle_pago, arriendo_id_arriendo) VALUES (NOW(), ?, ?)';
            db.query(query, [detalle_pago, arriendo_id_arriendo], (err, result) => {
                if (err) {
                    console.error('Error al realizar el pago:', err);
                    res.status(500).send('Error al realizar el pago');
                } else {
                    res.json({ message: 'Pago realizado correctamente' });
                }
            });
        }
    });
});

app.get('/bancos', (req, res) => {
    const query = 'SELECT id_banco, nombre_banco FROM banco';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al obtener la lista de bancos:', err);
            res.status(500).send('Error al obtener la lista de bancos');
        } else {
            res.json(result);
        }
    });
});

app.post('/insertarTarjeta', (req, res) => {
    const { numeroTarjeta, cvv, fechaExpiracion, clienteRut, bancoId } = req.body;
    const query = 'INSERT INTO tarjeta (n_tarjeta, cvv, fecha_vencimiento, cliente_rut_cli, banco_id_banco) VALUES (?, ?, ?, ?, ?)';
    
    db.query(query, [numeroTarjeta, cvv, fechaExpiracion, clienteRut, bancoId], (err, result) => {
      if (err) {
        console.error('Error al insertar tarjeta:', err);
        res.status(500).send('Error al insertar tarjeta');
      } else {
        res.json({ message: 'Tarjeta insertada correctamente' });
      }
    });
  });

  app.get('/estacionamientos/:rutDuenoEstacionamiento', (req, res) => {
    const rutDuenoEstacionamiento = req.params.rutDuenoEstacionamiento;
    const query = 'SELECT id_estacionamiento, direccion_est, tarifa_hora, due.nombre_dueno, due.apellido_dueno, co.descripcion_comuna ' +
        'FROM estacionamiento es ' +
        'INNER JOIN dueno_estacionamiento due ON es.dueno_estacionamiento_rut_dueno=due.rut_dueno ' +
        'INNER JOIN comuna co ON es.comuna_id_comuna=co.id_comuna ' +
        'WHERE due.rut_dueno = ?';

    db.query(query, [rutDuenoEstacionamiento], (err, result) => {
        if (err) {
            console.error('Error al obtener estacionamientos:', err);
            res.status(500).send('Error al obtener estacionamientos');
        } else {
            res.json(result);
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${port}`);
});


