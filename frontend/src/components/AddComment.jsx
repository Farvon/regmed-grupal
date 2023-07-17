import React, { useState } from 'react';
import styled from 'styled-components';

import useAlert from '../hooks/useAlert';
import { putPacientComment } from '../services/pacients';

const AddComment = ({ dni, name, setShowModal, diagnosticId }) => {
  const [medicalName, setMedicalName] = useState(name);
  const [medicalBranch, setMedicalBranch] = useState('Rama Médica');
  const [medicalComment, setMedicalComment] = useState('');

  const { alertSuccess, alertError } = useAlert();

  const handleAddNewComment = () => {
    const newCommet = {
      fecha_hist: new Date().toDateString(),
      medico_hist: medicalName,
      rama_hist: medicalBranch,
      comentario_hist: medicalComment,
    };

    putPacientComment(dni, newCommet, diagnosticId)
      .then(() => {
        alertSuccess('Comentario guardado correctamente');
        setMedicalName('');
        setMedicalBranch('');
        setMedicalComment('');
        setShowModal(false);
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
      </FormContainer>
      <ModalComment
        cols="100%"
        rows="10"
        value={medicalComment}
        onChange={(e) => {
          setMedicalComment(e.target.value);
        }}
      ></ModalComment>
      <AddCommentButton
        disabled={!medicalName || !medicalBranch || !medicalComment}
        onClick={() => {
          handleAddNewComment();
        }}
      >
        Agregar
      </AddCommentButton>
    </>
  );
};

export default AddComment;

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
