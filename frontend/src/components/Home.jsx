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
        <DescriptionSubtitle>- App para médicos -</DescriptionSubtitle>
        <DescriptionTitle>
          Tu registro de
          <span>Historias Clínicas</span>
        </DescriptionTitle>
        <DescriptionText>
          Toda la información de la atención de pacientes en un solo lugar. De
          manera fácil, práctica y segura
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
  width: 40%;
  min-width: 400px;
`;

const SiteDescriptionContainer = styled.div`
  height: calc(100vh - 96px);
  width: 30vw;
  min-width: 300px;
  margin-left: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  padding: 0 64px 164px;
`;

const DescriptionSubtitle = styled.span`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  font-family: sans-serif;
  line-height: 1.2;
  color: #475067;
`;

const DescriptionTitle = styled.span`
  font-size: calc(1.375rem + 1.5vw);
  font-weight: 500;
  margin: 16px 0;
  font-family: sans-serif;
  line-height: 1.2;
  color: #475067;

  span:first-child {
    margin-left: 14px;
    color: #3dadc5;
  }
`;

const DescriptionText = styled.span`
  font-size: 19px;
  font-weight: 300;
  font-family: sans-serif;
  line-height: 1.2;
  color: #475067;
`;
