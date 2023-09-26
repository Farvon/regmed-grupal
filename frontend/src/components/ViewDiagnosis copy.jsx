import React from 'react';
import styled from 'styled-components';

const ViewDiagnosis = ({ comment }) => {
  return (
    <>
      <FormContainer>
        <FormInfo>
          <CommentSpan>Fecha: </CommentSpan>
          <CommentSpan>{comment.fecha_diag}</CommentSpan>
        </FormInfo>
        <FormInfo>
          <CommentSpan>Médico: </CommentSpan>
          <CommentSpan>{comment.medico_diag}</CommentSpan>
        </FormInfo>
      </FormContainer>
      <ModalComment>{comment.comentario_diag}</ModalComment>
      

    </>
  );
};

export default ViewDiagnosis;

const FormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;

const FormInfo = styled.div`
  display: flex;
  width: 200px;
`;

const CommentSpan = styled.span`
  margin: 8px;
  padding: 8px;
`;

const ModalComment = styled.label`
  display: flex;
  margin: auto;
  padding: 16px;
  border: 0.5px solid lightgray;
  border-radius: 10px;
`;
