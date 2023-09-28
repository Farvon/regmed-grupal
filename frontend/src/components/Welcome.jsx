import React from 'react';
import styled from 'styled-components';
<<<<<<< HEAD
import { ILogo } from '../assets/icons/logo';

=======

import { ILogo } from '../assets/icons/logo';
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608

const Welcome = () => {
  return (
    <Contenedor>
      <InfoContainer>
<<<<<<< HEAD
        <InfoTitle>BIENVENIDOS</InfoTitle>
=======
        <InfoTitle>Bienvenido</InfoTitle>
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
        <InfoBody>
          Utiliza el buscador para encontrar a un paciente por su DNI
        </InfoBody>
        <BackgroundLogo>
          <ILogo />
          <Span>RegMed</Span>
        </BackgroundLogo>
      </InfoContainer>
<<<<<<< HEAD
      </Contenedor>
=======
    </Contenedor>
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
  );
};

export default Welcome;

const Contenedor = styled.div`
  display: flex;
<<<<<<< HEAD
  align-items:center;
=======
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
  width: 100%;
  height: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
<<<<<<< HEAD
  height:100%;
  background-image:url(./fondo-welcome.jpg);
  background-size:cover;
  
=======
  background: #f4f6f5;
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
`;

const InfoTitle = styled.h2`
  width: 100%;
<<<<<<< HEAD
  letter-spacing:3px;
  font-family:cooper-bold;
  font-size:40px;
  text-align: center;
  margin-top: 2em;
=======
  text-align: center;
  margin-top: 16px;
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
  margin-bottom: 16px;
`;

const InfoBody = styled.h3`
  width: 100%;
<<<<<<< HEAD
  font-size:22px;
  text-align: center;
  margin-top: 3em;
=======
  text-align: center;
  margin-top: 32px;
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
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
<<<<<<< HEAD
  font-family: cooper-bold
=======
  font-family: 'Roboto', sans-serif;
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608
  letter-spacing: 5px;
  font-weight: 500;
  font-size: 3em;
  opacity: 0.5;
`;
