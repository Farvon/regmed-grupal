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

//Veo el LOG del paciente según el DNI
pacientsRouter.get('/log/:dni', (request, response, next) => {
  const { dni } = request.params;

  Pacient.find({ dni })
    .then((pacient) => {
      if (pacient && pacient.length) {
        const pacientLog = pacient[0].hist_log;
        return response.json(pacientLog);
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
    const {
      diagnosticId,
      fecha_hist,
      medico_hist,
      rama_hist,
      comentario_hist,
    } = request.body;

    Pacient.findOne({ dni })
      .then((paciente) => {
        if (!paciente) {
          // Manejar el caso en el que no se encuentre el paciente
          throw new Error('Paciente no encontrado');
        }

        // Encontrar el diagnóstico específico dentro del array hist_diagnosticos
        const diagnostico = paciente.hist_diagnosticos.find(
          (diag) => diag._id.toString() === diagnosticId
        ); // Reemplaza con el ID del diagnóstico correspondiente

        if (!diagnostico) {
          // Manejar el caso en el que no se encuentre el diagnóstico
          throw new Error('Diagnóstico no encontrado');
        }

        // Crear el nuevo comentario
        const newComment = {
          fecha_hist: fecha_hist,
          medico_hist: medico_hist,
          rama_hist: rama_hist,
          comentario_hist: comentario_hist,
        };

        // Agregar el nuevo comentario al array historial del diagnóstico
        diagnostico.historial.push(newComment);

        // Guardar los cambios realizados en el paciente
        return paciente.save();
      })
      .then((pacienteGuardado) => {
        // Devolvemos el paciente actualizado
        response.json(pacienteGuardado);
      })
      .catch((error) => {
        // Manejar los errores ocurridos durante el proceso
        console.error('Error al agregar el comentario:', error.message);
      });
  }
);

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
