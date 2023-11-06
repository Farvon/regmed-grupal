import React, { useState } from 'react';
import styled from 'styled-components';
import useAlert from '../hooks/useAlert';
import { TagsInput } from 'react-tag-input-component';

import { editPacientInfo } from '../services/pacients';
import { putPacientLog } from '../services/logs';

const EditInfo = ({ paciente, user }) => {
  const [pacienteEdited, setPacienteEdited] = useState({
    nombre: paciente.nombre,
    apellido: paciente.apellido,
    dni: paciente.dni,
    telefono: paciente.telefono,
    direccion: paciente.direccion,
    mutual: paciente.mutual,
    num_socio: paciente.num_socio,
    grup_sang: paciente.grup_sang,
    fact_sang: paciente.fact_sang,
    alergias: paciente.alergias,
  });

  const { alertSuccess, alertError } = useAlert();

  const handleEditInfo = (event) => {
    console.log(pacienteEdited)
    event.preventDefault();
    editPacientInfo(pacienteEdited.dni, pacienteEdited)
      .then(() => {
        alertSuccess('Informacion actualizada correctamente');
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });

    const newLog = {
      fecha: new Date().toDateString(),
      dni: pacienteEdited.dni,
      medico: user.name,
      accion: 'Se edita Paciente',
      contenido:
        'Nueva información: ' +
        pacienteEdited.nombre +
        ', ' +
        pacienteEdited.apellido +
        ', ' +
        pacienteEdited.dni +
        ', ' +
        pacienteEdited.telefono +
        ', ' +
        pacienteEdited.direccion +
        ', ' +
        pacienteEdited.mutual +
        ', ' +
        pacienteEdited.num_socio +
        ', ' +
        pacienteEdited.grup_sang +
        ', ' +
        pacienteEdited.fact_sang +
        ', ' +
        pacienteEdited.alergias,
    };

    putPacientLog(newLog)
      .then(() => {
        console.log('Log guardado correctamente');
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });
  };


  return (
    <>
      <FormContainer onSubmit={(e) => handleEditInfo(e)}>
        <PersonalInfoBody>
          <PersonalInfoGroup>
            <PersonalInfoType>Nombre</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.nombre}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  nombre: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Apellido</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.apellido}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  apellido: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Dni</PersonalInfoType>
            <ModalInput value={pacienteEdited.dni} disabled />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Teléfono</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.telefono}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  telefono: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Dirección</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.direccion}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  direccion: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Mutual</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.mutual}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  mutual: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>N°</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.num_socio}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  num_socio: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Grupo Sanguíneo</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.grup_sang}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  grup_sang: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Factor Sanguíneo</PersonalInfoType>
            <ModalInput
              value={pacienteEdited.fact_sang}
              onChange={(e) => {
                setPacienteEdited((prevState) => ({
                  ...prevState,
                  fact_sang: e.target.value,
                }));
              }}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Alergias</PersonalInfoType>
            <TagsInput
                value={pacienteEdited.alergias}
                onChange={(e) => {
                  setPacienteEdited((prevState) => ({
                    ...prevState,
                    alergias: e,
                  }));
                }}
              />
          </PersonalInfoGroup>
          <EditButton>Editar</EditButton>
        </PersonalInfoBody>
      </FormContainer>
    </>
  );
};

export default EditInfo;

const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const ModalInput = styled.input`
  font-size: 16px;
  padding: 8px;
  margin: 8px;
  border: 2px solid lightgray;
  border-radius: 10px;

`;

const PersonalInfoBody = styled.div`
width: 90%;
background: white;
border: none;
padding: 10px 20px;
border-radius: 20px;
margin-top: 15px;
margin-left: 10px;
box-shadow: #cff0ff 0px 10px 10px -5px;
border-inline: 2px solid transparent;

::-moz-placeholder {
  color: rgb(170, 170, 170);
}

::placeholder {
  color: rgb(170, 170, 170);
}

:focus {
  outline: none;
  border-inline: 2px solid #12b1d1;
}
`;

const PersonalInfoGroup = styled.div`
  display: flex;
`;

const PersonalInfoType = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  font-size: 16px;
  color: gray;
`;

const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  margin: 16px auto 0;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  :disabled {
    opacity: 0.2;
  }

  :hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  }

  :active {
    background: #3498db;
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
  }
`;
