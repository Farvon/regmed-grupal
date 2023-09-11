import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useAlert from '../hooks/useAlert';
import { putPacientDiagnosis } from '../services/pacients';
import { getAllDiagnosis } from '../services/diagnosis';
import { putPacientLog } from '../services/logs';

const AddDiagnosis = ({ dni, name, setShowModal }) => {
  const [medicalName, setMedicalName] = useState(name);
  const [medicalBranch, setMedicalBranch] = useState('Rama Médica');
  const [medicalDiagnosis, setMedicalDiagnosis] = useState('');
  const [medicalComment, setMedicalComment] = useState('');

  const [diagnosticos, setDiagnosticos] = useState([]);

  const { alertSuccess, alertError } = useAlert();

  const handleAddNewDiagnosis = () => {
    const newDiagnosis = {
      fecha_diag: new Date().toDateString(),
      medico_diag: medicalName,
      rama_diag: medicalBranch,
      init_diag: medicalDiagnosis,
      comentario_diag: medicalComment,
    };

    const newLog = {
      fecha: new Date().toDateString(),
      dni: dni,
      medico: medicalName,
      accion: 'Creacion de Diagnóstico',
      contenido: medicalDiagnosis + '-' + medicalComment,
    };

    putPacientDiagnosis(dni, newDiagnosis)
      .then(() => {
        alertSuccess('Diagnóstico guardado correctamente');
        setMedicalName('');
        setMedicalBranch('');
        setMedicalDiagnosis('');
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });

    putPacientLog(dni, newLog)
      .then(() => {
        console.log('Log guardado correctamente');
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });
  };

  useEffect(() => {
    getAllDiagnosis().then((data) => setDiagnosticos(data));
  }, []);

  return (
    <>
      <FormContainer>
        <FormInfo>
          <span>Médico:</span>
          <MedicName>{name}</MedicName>
        </FormInfo>
        <FormInfo>
          <select
            value={medicalBranch}
            onChange={(e) => {
              setMedicalBranch(e.target.value);
            }}
          >
            <option disabled>Rama Médica</option>
            {ramas.map((item, index) => (
              <option value={item.value} key={index}>
                {item.value}
              </option>
            ))}
          </select>
        </FormInfo>
        <FormInfo>
          <span>Diagnóstico:</span>
          <SelectDiagnosis
            value={medicalDiagnosis}
            onChange={(e) => {
              setMedicalDiagnosis(e.target.value);
              console.log(medicalDiagnosis);
            }}
          >
            <option disabled>Diagnóstico</option>
            {diagnosticos.map((item, index) => (
              <option value={item.description} key={item.cod}>
                {item.description}
              </option>
            ))}
          </SelectDiagnosis>
        </FormInfo>
      </FormContainer>
      <FormContainer>
        <ModalComment
          cols="100%"
          rows="10"
          value={medicalComment}
          onChange={(e) => {
            setMedicalComment(e.target.value);
          }}
        ></ModalComment>
      </FormContainer>
      <AddCommentButton
        disabled={!medicalName || !medicalBranch || !medicalComment}
        onClick={() => {
          handleAddNewDiagnosis();
        }}
      >
        Agregar
      </AddCommentButton>
    </>
  );
};

export default AddDiagnosis;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  width: 60vw;
`;

const FormInfo = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;

  span:first-child {
    font-size: 14px;
  }
`;

const MedicName = styled.span`
  margin-left: 4px;
  color: gray;
  font-weight: bold;
  font-style: italic;
`;

const SelectDiagnosis = styled.select`
  width: 200px;
`;

const ModalComment = styled.textarea`
  resize: none;
  width: 100%;
  padding: 4px;
`;

const AddCommentButton = styled.button`
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

const ramas = [
  { value: 'Medicina General' },
  { value: 'Cardiología' },
  { value: 'Neurología' },
  { value: 'Traumatología' },
  { value: 'Endocrinología' },
  { value: 'Alergología' },
  { value: 'Ginecología' },
  { value: 'Urología' },
  { value: 'Neumología' },
  { value: 'Otorrinolaringología' },
];