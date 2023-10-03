import React, { useState } from 'react';
import { TagsInput } from 'react-tag-input-component';
import styled from 'styled-components';
import useAlert from '../hooks/useAlert';

import { postNewPacient } from '../services/pacients';
import { putPacientLog } from '../services/logs';

const AddPaciente = ({ user }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [mutual, setMutual] = useState('');
  const [numSocio, setNumSocio] = useState('');
  const [grupSang, setGrupSang] = useState('');
  const [factSang, setFactSang] = useState('');
  const [alergias, setAlergias] = useState([]);

  const { alertSuccess, alertError } = useAlert();

  const handleClear = () => {
    setNombre('');
    setApellido('');
    setDni('');
    setTelefono('');
    setDireccion('');
    setMutual('');
    setNumSocio('');
    setGrupSang('');
    setFactSang('');
    setAlergias([]);
  };

  const handleNewPacient = (event) => {
    event.preventDefault();

    const newPacient = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      telefono: telefono,
      direccion: direccion,
      mutual: mutual,
      num_socio: numSocio,
      grup_sang: grupSang,
      fact_sang: factSang,
      //agregar las alergias
      alergias: alergias,
    };

    postNewPacient(newPacient)
      .then(() => {
        alertSuccess('Paciente creado correctamente');
        handleClear();
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });

    const newLog = {
      fecha: new Date().toDateString(),
      dni: dni,
      medico: user.name,
      accion: 'Se ingresa Paciente',
      contenido: 'Se carga paciente en sistema',
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
    <AddPacientContainer>
      <AddPacienteTitle>Ingresa los datos del nuevo paciente</AddPacienteTitle>
      <FormContainer onSubmit={(e) => handleNewPacient(e)}>
        <PersonalInfoBody>
          <PersonalInfoGroup>
            <PersonalInfoType>Nombre</PersonalInfoType>
            <ModalInput
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Apellido</PersonalInfoType>
            <ModalInput
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Dni</PersonalInfoType>
            <ModalInput value={dni} onChange={(e) => setDni(e.target.value)} />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Teléfono</PersonalInfoType>
            <ModalInput
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Dirección</PersonalInfoType>
            <ModalInput
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Mutual</PersonalInfoType>
            <ModalInput
              value={mutual}
              onChange={(e) => setMutual(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>N°</PersonalInfoType>
            <ModalInput
              value={numSocio}
              onChange={(e) => setNumSocio(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Grupo Sanguíneo</PersonalInfoType>
            <ModalInput
              value={grupSang}
              onChange={(e) => setGrupSang(e.target.value)}
            />
          </PersonalInfoGroup>
          <PersonalInfoGroup>
            <PersonalInfoType>Factor Sanguíneo</PersonalInfoType>
            <ModalInput
              value={factSang}
              onChange={(e) => setFactSang(e.target.value)}
            />
          </PersonalInfoGroup>

          <PersonalInfoGroup>
            <PersonalInfoTypeA>Alergias</PersonalInfoTypeA>
            <AlergiasContainer>
              <TagsInput
                value={alergias}
                onChange={setAlergias}
                name="alergias"
                placeHolder="..."
              />
            </AlergiasContainer>
          </PersonalInfoGroup>

          <AddButton disabled={!nombre || !apellido || !dni}>
            Agregar Paciente
          </AddButton>
        </PersonalInfoBody>
      </FormContainer>
    </AddPacientContainer>
  );
};

export default AddPaciente;

const AddPacientContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-startcenter;
align-items: center;
width: 100vw;
height: calc(100vh - 64px);
background-image url(./bg-home.jpg);
background-size:cover;
`;

const AddPacienteTitle = styled.h2`
  text-align: center;
  font-weight: 900;
  font-size: 30px;
  color: rgb(16, 137, 211);
`;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  width: 350px;
  background: #f8f9fd;
  background: linear-gradient(
    0deg,
    rgb(255, 255, 255) 0%,
    rgb(244, 247, 251) 100%
  );
  border-radius: 40px;
  padding: 15px 40px;
  border: 5px solid rgb(255, 255, 255);
  box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
`;

const ModalInput = styled.input`
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

const AlergiasContainer = styled.article`
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

const PersonalInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
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

const PersonalInfoTypeA = styled.label`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 40%;
  font-size: 16px;
  margin-left: -18px;
  margin-right: 17px;
  color: gray;
`;

const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin-top: 2em;
  margin-left: 4.2em;
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
    pointer-events: none;
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
