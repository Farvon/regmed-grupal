import React from 'react';
import styled from 'styled-components';

import HeaderHome from './HeaderHome';

const Home = () => {
  return (
    <HomeContainer>
      <HeaderHome/>
      <BackgroundImg
        src="../../doctor.jpg"
        alt="RegMed Background"
      />
      <SiteDescriptionContainer>
        <DescriptionTitle>
          Tu registro de
          <span>Historias Clínicas</span>
        </DescriptionTitle>
        <DescriptionText>
          App medica con toda la información de la atención de pacientes en un solo lugar. De
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
  width: 45%;
  min-width: 400px;
`;

const SiteDescriptionContainer = styled.div`
  height: calc(100vh - 250px);
  width: 500vw;
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
  font-weight: 300;
  margin: 16px 0;
  letter-spacing:2px;
  font-family: "cooper-bold";
  line-height: 1.2;
  color: #4C546D;
  span:first-child {
    margin-left: 14px;
    color: #3395D7;
  }
`;

const DescriptionText = styled.span`
  width: 500px;
  font-size: 19px;
  font-weight: 300;
  font-family: "cooper-bold";
  line-height:2;
  color:#A9A9A9;
  letter-spacing: 1px;
`;
