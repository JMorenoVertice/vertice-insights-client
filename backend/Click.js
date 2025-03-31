const mongoose = require('mongoose');

// Definir el esquema para los clics
const clickSchema = new mongoose.Schema({
  clickCount: { type: Number, required: true }, // Número de clics
  boxType: { type: String, required: true }, // Tipo de caja (verde, amarilla, etc.)
  timeSpent: { type: Number, required: true }, // Tiempo en segundos
  timestamp: { type: Date, default: Date.now } // Fecha y hora del registro
});

// Crear el modelo basado en el esquema
const Click = mongoose.model('Click', clickSchema);

module.exports = Click;