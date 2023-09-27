const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const diagnosisSchema = new Schema({
  cod: String,
  description: String,
});

diagnosisSchema.plugin(uniqueValidator);

const Diagnosis = model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
