import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';

//Componente para la barra lateral
const SideBar = ({ setDni, user }) => {
  const [userInput, setUserInput] = useState('');

  const handleClick = () => {
    setDni(userInput);
    setUserInput('');
  };

  return (
    <SideContainer id="side-container">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          backgroundColor: '#010F25',
        }}
      >
        <InputBuscador
          placeholder="Ingrese DNI"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <StyledLink disabled={!userInput} to="/search">
          <StyledButton onClick={() => handleClick()}>Buscar</StyledButton>
        </StyledLink>
        {/* Si el usuario es "guest" no verá el botón de
        Agregar Paciente  */}
        {user && user.username !== 'guest' && (
          <StyledLink to="/add-pacient">
            <StyledButton onClick={() => setUserInput('')}>
              Agregar Paciente
            </StyledButton>
          </StyledLink>
        )}
      </Box>
    </SideContainer>
  );
};

export default SideBar;

const SideContainer = styled.div`
  display: flex;
  width: 300px;
  height: calc(100vh - 64px);
`;

const InputBuscador = styled.input`
  display: flex;
  margin: 10% auto 5% auto;
  padding: 0px 12px;
  width: 80%;
  height: 40px;
  border-radius: 5px 5px;
  font-size: 18px;
`;

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      opacity: 0.2;
    `}
`;

const StyledButton = styled.button`
  cursor: pointer;
  color: #010f25;
  font-weight: bold;
  background-color: white;
  width: 80%;
  height: 40px;
  margin: 0 auto 5% auto;
  padding: 0;
  border-radius: 10px 10px;

  :hover {
    color: black;
    background-color: #3dadc5;
  }
`;
