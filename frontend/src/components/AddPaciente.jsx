import React, { useState } from 'react';
import { TagsInput } from "react-tag-input-component";
import styled from 'styled-components';
import useAlert from '../hooks/useAlert';

import { postNewPacient } from '../services/pacients';


const AddPaciente = () => {
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
            <PersonalInfoType>Alergias</PersonalInfoType>
            <TagsInput
            value={alergias}
            onChange = {(e) => setAlergias(e)}
            placeHolder="..."
          />
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
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: calc(100vh - 64px);
`;

const AddPacienteTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
`;

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
  display: flex;
  flex-direction: column;
  background-color: white;
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

const AddButton = styled.button`
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
