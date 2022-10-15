import React, { useState } from 'react';
import styled from 'styled-components';

const AddComment = ({ paciente }) => {
  const [newComment, setNewComment] = useState({});
  const [comment, setComment] = useState({
    id: '',
    comentario_hist: paciente.apellido,
    fecha_hist: '',
    medico_hist: paciente.telefono,
    rama_hist: paciente.dirección,
  });

  const PushComment = (comment) => {
    const lastId = paciente.historial.length;
    setComment((prevState) => ({
      ...prevState,
      id: paciente.historial.length,
      fecha_hist: new Date(),
    }));
    setNewComment(comment);
    paciente.historial.push(newComment);
    console.log(paciente.historial);
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
        }}
      ></ModalComment>
      <AddCommentButton onClick={() => PushComment({ comment })}>
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

  :hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  }

  :active {
    background: #3498db;
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
  }
`;
