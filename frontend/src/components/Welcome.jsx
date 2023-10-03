import React from 'react';
import styled from 'styled-components';
import CardWelcome from './CardWelcome';

const Welcome = () => {
  return (
    <Contenedor>
      <InfoContainer>
        <ContainerCard>
        <CardWelcome/>
        </ContainerCard>
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
  background-image:url(./bg-home.jpg);
  background-size:cover;
  
`;

const ContainerCard = styled.div`
position:relative;
top:5em;
`;



