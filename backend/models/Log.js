const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creamos el esquema del log
const logSchema = new Schema({
  fecha: String,
  dni: String,
  medico: String,
  accion: String,
  contenido: String,
});

logSchema.plugin(uniqueValidator);

const Log = model('Log', logSchema);

module.exports = Log;
