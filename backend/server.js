/////api basica ya creada en este archivo,esta API incluye el endpoint para guardar los clicks y otro para obtenerlos,
//tambien el endpoint de prueba para verificar que el servidor esta funcionando correctamente

const express = require('express');                 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Click = require('./Click');

const app = express(); // Mover esta línea al inicio


app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/clicksDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Endpoint para guardar el contador de clics
app.post('/api/saveClickCount', async (req, res) => {
  const { clickCount, boxType, timeSpent } = req.body; // Obtener los datos del cuerpo de la solicitud
  if (typeof clickCount !== 'number' || typeof timeSpent !== 'number' || !boxType) {
    return res.status(400).send({ error: 'Datos inválidos' });
  }
  try {
    const newClick = new Click({ clickCount, boxType, timeSpent }); // Crear un nuevo documento
    await newClick.save(); // Guardar en la base de datos
    res.status(201).send({ message: 'Datos guardados exitosamente' });
  } catch (error) {
    res.status(500).send({ error: 'Error al guardar los datos' });
  }
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

// Endpoint para obtener todos los contadores de clics
app.get('/api/getClickCounts', async (req, res) => {
  try {
    const clicks = await Click.find(); // Obtener todos los documentos de la colección
    res.status(200).send(clicks); // Enviar los datos como respuesta
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener los datos' });
  }
});