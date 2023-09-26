import React from 'react';
import styled from 'styled-components';
import HeaderComponent from '../components/HeaderComponent';

//Este componente es la vista general donde se mantiene el Header
//Siempre pero el resto de la app cambia dependiendo el path
const LayoutAuth = (props) => {
  return (
    <LayoutAuthContainer id="layout-auth">
      <HeaderComponent />
      <LayoutAuthBody id="body-auth">{props.children}</LayoutAuthBody>
    </LayoutAuthContainer>
  );
};

export default LayoutAuth;

const LayoutAuthContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

const LayoutAuthBody = styled.div`
  display: flex;
`;
