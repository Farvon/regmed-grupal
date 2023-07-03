const bcrypt = require('bcrypt');
const medicos_matriculadosRouter = require('express').Router();
const Medicos_Matriculados = require('../models/Medicos_Matriculados');

//Vemos los medicos matriculados y aun no aceptados
medicos_matriculadosRouter.get('/', async (request, response) => {
  const madicos_matriculados = await Medicos_Matriculados.find({});
  response.json(madicos_matriculados);
});

//Agregamos usuario nuevo
//Veo el paciente según el DNI
medicos_matriculadosRouter.get('/:DNI', async (request, response) => {
  const { DNI } = request.params;

  Medicos_Matriculados.find({ DNI })
    .then((medico_matriculado) => {
      if (medico_matriculado && medico_matriculado.length) {
        return response.json(medico_matriculado);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = medicos_matriculadosRouter;