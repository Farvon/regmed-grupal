import React, { useState } from 'react';
import styled from 'styled-components';
import {
  setLocalStorageData,
  getLocalStorageData,
} from '../services/localStorageUtils';

const AddComment = ({ paciente }) => {
  const database = getLocalStorageData();
  const [err, setErr] = useState(false);
  const [isEnable, setIsEnable] = useState(true);
  const [comment, setComment] = useState({
    comentario_hist: '',
    medico_hist: '',
    rama_hist: '',
  });

  const HandleAdd = (isEnable) => {
    const elemento = document.getElementsByName('add');
    elemento[0].disabled = isEnable;
  };

  const PushComment = (comment) => {
    const info = {
      id: paciente.historial.length,
      fecha_hist: new Date(),
      comentario_hist: comment.comentario_hist,
      medico_hist: comment.medico_hist,
      rama_hist: comment.rama_hist,
    };

    if (
      (info.comentario_hist != '') &
      (info.medico_hist != '') &
      (info.rama_hist != '')
    ) {
      paciente.historial.push(info);

      const newDB = database.filter((item) => item.dni != paciente.dni);
      newDB.push(paciente);
      setLocalStorageData(newDB);
    } else {
      setErr(true);
    }
  };

  return (
    <>
      <FormContainer>
        <FormInfo>
          <ModalInput
            onChange={(e) => {
              setComment((prevState) => ({
                ...prevState,
                medico_hist: e.target.value,
              }));
              setIsEnable(false);
              HandleAdd(false);
              setErr(false);
            }}
            placeholder="Médico"
          />
        </FormInfo>
        <FormInfo>
          <select
            required
            onChange={(e) => {
              setComment((prevState) => ({
                ...prevState,
                rama_hist: e.target.value,
              }));
              setIsEnable(false);
              HandleAdd(false);
              setErr(false);
            }}
          >
            <option value="" defaultValue="">
              Rama Médica
            </option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Medicina General">Medicina General</option>
          </select>
        </FormInfo>
      </FormContainer>
      <ModalComment
        id="comentario"
        name="comentario"
        cols="100%"
        rows="10"
        onChange={(e) => {
          setComment((prevState) => ({
            ...prevState,
            comentario_hist: e.target.value,
          }));
          setIsEnable(false);
          HandleAdd(false);
          setErr(false);
        }}
      ></ModalComment>
      <AddCommentButton
        name="add"
        onClick={() => {
          PushComment(comment), HandleAdd(true);
        }}
      >
        Agregar
      </AddCommentButton>
      {err && <ErrorSpan>Favor de completar todos los campos</ErrorSpan>}
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
`;

const ModalInput = styled.input`
  width: 100%;
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

const ErrorSpan = styled.span`
  display: flex;
  margin: auto;
  font-size: 16px;
  color: gray;
`;
