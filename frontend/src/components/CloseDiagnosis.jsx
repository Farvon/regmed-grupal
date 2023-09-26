import React, { useState } from 'react';
import styled from 'styled-components';

import useAlert from '../hooks/useAlert';
import { closeDiagnosisPacient } from '../services/pacients';
import { putPacientLog } from '../services/logs';

const CloseDiagnosis = ({ dni, name, setShowModal, diagnosticId }) => {
  const [medicalName, setMedicalName] = useState(name);
  const [motivo_cierre, setMotivoCierre] = useState('');

  const { alertSuccess, alertError } = useAlert();

  const handleCloseDiagnosis = () => {

    const newState = {
      estado_diag: false,
      motivo_cierre: motivo_cierre,
      diagnosticId: diagnosticId,
    };

    const newLog = {
      fecha: new Date().toDateString(),
      dni: dni,
      medico: medicalName,
      accion: 'Cierre de Diagnóstico',
      contenido: 'Motivo de cierre: ' + motivo_cierre,
    };

    closeDiagnosisPacient(dni, newState)
      .then(() => {
        alertSuccess('Diagnóstico cerrado guardado correctamente');
        setMedicalName('');
        setMotivoCierre('');
        setShowModal(false);
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });

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
      <FormContainer>
        <FormInfo>
          <CloseComment>Motivo de cierre:</CloseComment>
        </FormInfo>
        <FormInfo>
            <span>Médico:</span>
            <MedicName>{name}</MedicName>
        </FormInfo>
      </FormContainer>
      <ModalComment
        cols="100%"
        rows="10"
        value={motivo_cierre}
        onChange={(e) => {
          setMotivoCierre(e.target.value);
        }}
      ></ModalComment>
      <CloseDiagnosisButton
        disabled={!medicalName  || !motivo_cierre}
        onClick={() => {
          handleCloseDiagnosis();
        }}
      >
        Cerrar Diagnóstico
      </CloseDiagnosisButton>
    </>
  );
};

export default CloseDiagnosis;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const FormInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span:first-child {
    font-size: 14px;
  }
`;

const CloseComment = styled.span`
  margin-left: 4px;
  color: gray;
  font-weight: bold;
  font-style: italic;
`;

const MedicName = styled.span`
  margin-left: 4px;
  color: gray;
  font-weight: bold;
  font-style: italic;
`;

const ModalComment = styled.textarea`
  resize: none;
  width: 70vw;
  padding: 4px;
  margin: 0px 16px;
`;

const CloseDiagnosisButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 240px;
  margin: 16px auto 0;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background: #f5412a;
  background-image: linear-gradient(to bottom, #f5412a, #fa5f4b);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  :disabled {
    font-size: 18px;
    opacity: 0.2;
  }

  :hover {
    background: #eb6434;
    background-image: linear-gradient(to bottom, #fa5f4b, #eb6434);
  }

  :active {
    background: #f5412a;
    background-image: linear-gradient(to bottom, #f5412a, #fa5f4b);
  }
`;