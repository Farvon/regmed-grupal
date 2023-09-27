import React from 'react';
import styled from 'styled-components';

const ViewComment = ({ comment }) => {
  return (
    <>
      <FormContainer>
        <FormInfo>
          <CommentSpan>Fecha: </CommentSpan>
          <CommentSpan>{comment.fecha_hist}</CommentSpan>
        </FormInfo>
        <FormInfo>
          <CommentSpan>Médico: </CommentSpan>
          <CommentSpan>{comment.medico_hist}</CommentSpan>
        </FormInfo>
      </FormContainer>
      <ModalComment>{comment.comentario_hist}</ModalComment>
    </>
  );
};

export default ViewComment;

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
