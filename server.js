const express = require('express');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyectos_db2'
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos establecida');
    }
});

// Middleware para servir archivos estáticos desde la raíz del proyecto
app.use(express.static(__dirname));

// Ruta por defecto (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para agregar jugadores
app.post('/add-player', express.json(), (req, res) => {
    const { name, email, date, level, comment } = req.body;

    const query = 'INSERT INTO jugadores (nombre, correo, fecha_registro, nivel, comentario) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, date, level, comment], (err, result) => {
        if (err) {
            console.error('Error al insertar jugador:', err);
            res.status(500).json({ success: false, message: 'Error al agregar jugador' });
        } else {
            console.log('Jugador agregado:', result);
            res.json({ success: true });
        }
    });
    
});



// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
