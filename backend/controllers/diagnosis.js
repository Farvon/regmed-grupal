const diagnosisRouter = require('express').Router();
const Diagnosis = require('../models/Diagnosis');

//veo todos los pacientes
diagnosisRouter.get('/', (request, response) => {
  Diagnosis.find({}).then((diagnosis) => {
    response.json(diagnosis);
  });
});

//Borra paciente segun el DNI
/* pacientsRouter.delete('/', (request, response) => {
  Pacient.findAllAndDelete()
    .then(() => {
      response.status(204).end();
    })
    .catch((err) => next(err));
}); */

//Agrego un Diagnostico
diagnosisRouter.post('/', async (request, response) => {
  const diagnosis = request.body;

  //Creo una nueva instancia del modelo de Diagnostico con la info
  const newDiagnosis = new Diagnosis({
    cod: diagnosis.cod,
    description: diagnosis.description,
  });

  //Lo guardo en la Base de Datos
  newDiagnosis
    .save()
    .then((savedDiagnosis) => {
      response.json(savedDiagnosis);
    })
    .catch((err) => {
      console.log(err);
      response.status(400).end();
    });
});

module.exports = diagnosisRouter;
