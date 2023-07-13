import React from 'react';
import styled from 'styled-components';

const Log = ({ item }) => {
  return (
    <>
      <LogContainer>
        <H4>
          {item.accion} - {item.dni}
        </H4>
        <Ul>
          <Li>Fecha: {item.fecha}</Li>
          <Li>Médico: {item.medico}</Li>
          <Li>Detalle: {item.contenido}</Li>
        </Ul>
      </LogContainer>
    </>
  );
};

export default Log;

const LogContainer = styled.div`
  padding: 8px;
`;

const H4 = styled.h4`
  margin: 0px;
  margin-bottom: 6px;
  padding: 6px;
  background: linear-gradient(
    90deg,
    rgba(141, 192, 203, 1) 0%,
    rgba(175, 175, 176, 0.014749262536873142) 40%
  );
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const Ul = styled.ul`
  list-style-type: circle;
`;

const Li = styled.li`
  padding: 6px;
  border-bottom: dotted black 1px;
`;
