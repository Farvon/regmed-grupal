const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creamos el esquema de los comentarios
const historialSchema = new Schema({
  fecha_hist: String,
  medico_hist: String,
  rama_hist: String,
  comentario_hist: String,
});

// Creamos el esquema del paciente
const pacientSchema = new Schema({
  nombre: String,
  apellido: String,
  dni: { type: String, unique: true },
  telefono: String,
  direccion: String,
  mutual: String,
  num_socio: String,
  grup_sang: String,
  fact_sang: String,
  historial: [historialSchema],
});

// Añadimos el plugin para verificar que sea unico al esquema
pacientSchema.plugin(uniqueValidator);

// Asignamos al modelo Paciente el esquema creado
const Pacient = model('Pacient', pacientSchema);

module.exports = Pacient;
