const logsRouter = require('express').Router();
const Log = require('../models/Log');

//veo todos los Logs
logsRouter.get('/', (request, response) => {
  Log.find({}).then((logs) => {
    response.json(logs);
  });
});

//Veo el Log según el DNI
logsRouter.get('/:dni', (request, response, next) => {
  const { dni } = request.params;

  Log.find({ dni })
    .then((log) => {
      if (log && log.length) {
        return response.json(log);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Agrego un Log
logsRouter.put('/', async (request, response) => {
  const log = request.body;

  //Creo una nueva instancia del modelo de Diagnostico con la info
  const newLog = new Log({
    fecha: log.fecha,
    dni: log.dni,
    medico: log.medico,
    accion: log.accion,
    contenido: log.contenido,
  });

  //Lo guardo en la Base de Datos
  newLog
    .save()
    .then((savedLog) => {
      response.json(savedLog);
    })
    .catch((err) => {
      console.log(err);
      response.status(400).end();
    });
});

module.exports = logsRouter;
