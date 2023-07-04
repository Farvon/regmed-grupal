import React from 'react';
import styled from 'styled-components';

import HeaderHome from './HeaderHome';

const Home = () => {
  return (
    <HomeContainer>
      <HeaderHome/>
      <BackgroundImg
        src="../../doctor.jpeg"
        alt="RegMed Background"
      />
      <SiteDescriptionContainer>
        <DescriptionTitle>
          Tu registro de
          <span>Historias Clínicas</span>
        </DescriptionTitle>
        <DescriptionText>
          Nuestra aplicación médica ofrece acceso fácil y seguro a toda la información de atención de pacientes en un solo lugar. 
          Permite a los médicos gestionar historias clínicas, realizar diagnósticos precisos y comunicarse eficientemente con otros profesionales de la salud
        </DescriptionText>
      </SiteDescriptionContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  font-size:20px;
  font-weight:bold;
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  width: 50%;
  min-width: 400px;
`;

const SiteDescriptionContainer = styled.div`
  height: calc(100vh - 250px);
  width: 45vw;
  min-width: 300px;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 64px 164px;
`;

const DescriptionTitle = styled.span`
  font-size: calc(1.375rem + 1.5vw);
  margin: 35px 0;
  font-family: "cooper-bold";
  line-height: 1.2;
  color:#4b4d5b;

  span:first-child {
  margin-left: 14px;
    color: #2c86c2;
  }
`;

const DescriptionText = styled.span`
  font-size: 19px;
  font-weight: 500;
  font-family: "cooper-medium";
  line-height: 2.1;
  color: #475067;
  width:30vw;
`;
