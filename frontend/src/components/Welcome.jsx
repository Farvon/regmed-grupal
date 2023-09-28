import React from 'react';
import styled from 'styled-components';
import { ILogo } from '../assets/icons/logo';


const Welcome = () => {
  return (
    <Contenedor>
      <InfoContainer>
        <InfoTitle>BIENVENIDOS</InfoTitle>
        <InfoBody>
          Utiliza el buscador para encontrar a un paciente por su DNI
        </InfoBody>
        <BackgroundLogo>
          <ILogo />
          <Span>RegMed</Span>
        </BackgroundLogo>
      </InfoContainer>
      </Contenedor>
  );
};

export default Welcome;

const Contenedor = styled.div`
  display: flex;
  align-items:center;
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height:100%;
  background-image:url(./fondo-welcome.jpg);
  background-size:cover;
  
`;

const InfoTitle = styled.h2`
  width: 100%;
  letter-spacing:3px;
  font-family:cooper-bold;
  font-size:40px;
  text-align: center;
  margin-top: 2em;
  margin-bottom: 16px;
`;

const InfoBody = styled.h3`
  width: 100%;
  font-size:22px;
  text-align: center;
  margin-top: 3em;
  margin-bottom: 0px;
`;

const BackgroundLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
  width: 200px;
  margin-top: 10vh;
`;

const Span = styled.span`
  font-family: cooper-bold
  letter-spacing: 5px;
  font-weight: 500;
  font-size: 3em;
  opacity: 0.5;
`;
