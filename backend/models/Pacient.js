const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creamos el esquema del log
const logSchema = new Schema({
  fecha_log: String,
  medico_log: String,
  accion_log: String,
  contenido_log: String,
});

// Creamos el esquema de los comentarios
const historialSchema = new Schema({
  fecha_hist: String,
  medico_hist: String,
  comentario_hist: String,
  archivo_hist: String,
});

// Creamos el esquema de los diagnósticos
const diagnosticoSchema = new Schema({
  fecha_diag: String,
  medico_diag: String,
  rama_diag: String,
  comentario_diag: String,
  estado_diag: Boolean,
  motivo_cierre: String,
  historial: [historialSchema],
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
  alergias: { type: Array },
  hist_diagnosticos: [diagnosticoSchema],
  hist_log: [logSchema],
});

// Añadimos el plugin para verificar que sea unico al esquema
pacientSchema.plugin(uniqueValidator);

// Asignamos al modelo Paciente el esquema creado
const Pacient = model('Pacient', pacientSchema);

module.exports = Pacient;
