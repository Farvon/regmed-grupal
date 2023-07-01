const pacientsRouter = require('express').Router();
const Pacient = require('../models/Pacient');
const userExtractor = require('../middleware/userExtractor');

//veo todos los pacientes
pacientsRouter.get('/', (request, response) => {
  Pacient.find({}).then((pacients) => {
    response.json(pacients);
  });
});

//Veo el paciente según el DNI
pacientsRouter.get('/:dni', (request, response, next) => {
  const { dni } = request.params;

  Pacient.find({ dni })
    .then((pacient) => {
      if (pacient && pacient.length) {
        return response.json(pacient);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

//Agrego un paciente
pacientsRouter.post('/', userExtractor, (request, response) => {
  const pacient = request.body;

  if (!pacient.dni || !pacient.nombre || !pacient.apellido) {
    return response.status(400).json({
      error: 'Los campos nombre, apellido y dni son requeridos',
    });
  }

  //Creo una nueva instancia del modelo de Paciente con la info
  const newPacient = new Pacient({
    nombre: pacient.nombre,
    apellido: pacient.apellido,
    dni: pacient.dni,
    telefono: pacient.telefono,
    direccion: pacient.direccion,
    mutual: pacient.mutual,
    num_socio: pacient.num_socio,
    grup_sang: pacient.grup_sang,
    fact_sang: pacient.fact_sang,
    historial: pacient.historial,
    alergias: pacient.alergias,
  });

  //Lo guardo en la Base de Datos
  newPacient
    .save()
    .then((savedPacient) => {
      response.json(savedPacient);
    })
    .catch((err) => {
      console.log(err);
      response.status(400).end();
    });
});

//Borra paciente segun el DNI
pacientsRouter.delete('/:dni', userExtractor, (request, response, next) => {
  const { dni } = request.params;

  Pacient.findOneAndDelete({ dni })
    .then(() => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

//Añade diagnostico a paciente segun DNI
pacientsRouter.put(
  '/add-new-diagnosis/:dni',
  userExtractor,
  (request, response) => {
    const { dni } = request.params;
    const diagnosis = request.body;

    const newDiagnosis = {
      fecha_diag: diagnosis.fecha_diag,
      medico_diag: diagnosis.medico_diag,
      rama_diag: diagnosis.rama_diag,
      init_diag: diagnosis.init_diag,
      comentario_diag: diagnosis.comentario_diag,
      estado_diag: true,
      motivo_cierre: '',
      historial: [],
    };

    Pacient.findOneAndUpdate(
      { dni },
      { $push: { hist_diagnosticos: newDiagnosis } },
      { new: true }
    )
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        console.log(err);
        response.status(400).end();
      });
  }
);

//Añade comentario a paciente segun DNI
pacientsRouter.put(
  '/add-new-comment/:dni',
  userExtractor,
  (request, response) => {
    const { dni } = request.params;
    const comment = request.body;

    const newComment = {
      fecha_hist: comment.fecha_hist,
      medico_hist: comment.medico_hist,
      rama_hist: comment.rama_hist,
      comentario_hist: comment.comentario_hist,
    };

    Pacient.findOneAndUpdate(
      { dni },
      { $push: { historial: newComment } },
      { new: true }
    )
      .then((result) => {
        response.json(result);
      })
      .catch((err) => {
        console.log(err);
        response.status(400).end();
      });
  }
);

//Añade Log a paciente segun DNI
pacientsRouter.put('/add-new-log/:dni', userExtractor, (request, response) => {
  const { dni } = request.params;
  const log = request.body;

  const newLog = {
    fecha_log: log.fecha_log,
    medico_log: log.medico_log,
    accion_log: log.accion_log,
    contenido_log: log.contenido_log,
  };

  Pacient.findOneAndUpdate(
    { dni },
    { $push: { hist_log: newLog } },
    { new: true }
  )
    .then((result) => {
      response.json(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(400).end();
    });
});

//Edita info del paciente segun DNI
pacientsRouter.put('/edit-info/:dni', userExtractor, (request, response) => {
  const { dni } = request.params;
  const info = request.body;

  const newInfo = {
    nombre: info.nombre,
    apellido: info.apellido,
    dni: info.dni,
    telefono: info.telefono,
    direccion: info.direccion,
    mutual: info.mutual,
    num_socio: info.num_socio,
    grup_sang: info.grup_sang,
    fact_sang: info.fact_sang,
  };

  Pacient.findOneAndUpdate({ dni }, newInfo, { new: true })
    .then((result) => {
      response.json(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(400).end();
    });
});

module.exports = pacientsRouter;
