const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Creamos el esquema de los medicos matriculados
const Medicos_MatriculadosSchema = new Schema({
    nombre: String,
    apellido: String,
    DNI: Number,
    matricula: Number,
    habilitacion: Boolean,
});


// Añadimos el plugin para verificar que sea unico al esquema
Medicos_MatriculadosSchema.plugin(uniqueValidator);

// Asignamos al modelo Paciente el esquema creado
const Medicos_Matriculados = model('Medicos_Matriculados', Medicos_MatriculadosSchema);

module.exports = Medicos_Matriculados;