import React from 'react';
import styled from 'styled-components';
import HeaderHome from './HeaderHome';
import Signos from './Signos';

const Home = () => {
  return (
    <HomeContainer>
      <HeaderHome />
      <BackgroundImg src="../../doctor.jpeg" alt="RegMed Background" />
      <SiteDescriptionContainer>
        <DescriptionTitle>
          <h1>
            Tu registro de
            <span>Historias Clínicas</span>
          </h1>
        </DescriptionTitle>
        <DescriptionText>
          Nuestra aplicación médica ofrece acceso fácil y seguro a toda la
          información de atención de pacientes en un solo lugar. Permite a los
          médicos gestionar historias clínicas, realizar diagnósticos precisos y
          comunicarse eficientemente con otros profesionales de la salud
        </DescriptionText>
      </SiteDescriptionContainer>
      <Footer>
        <Signos />
      </Footer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(./bg-home.jpg);
  background-size: cover;
  z-index: 100;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BackgroundImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  width: 50%;
  min-width: 600px;

  @media (max-width: 768px) {
    display: none;
  }
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

  @media (max-width: 768px) {
    padding: 0;
    margin: 0 auto;
  }
`;

const DescriptionTitle = styled.h1`
  font-size: 1em;
  margin-top: 20vh;
  font-family: 'cooper-bold';
  line-height: 1.2;
  color: #4b4d5b;
  span:first-child {
    margin-left: 14px;
    color: #2c86c2;
  }
  h1 {
    position: relative;
    text-decoration: none;
  }

  h1::before {
    content: '';
    position: absolute;
    width: 78%;
    height: 4px;
    border-radius: 4px;
    background-color: #3498db;
    opacity: 0.5;
    bottom: 0;
    left: 0;
    transform-origin: right;
    transform: scaleX(0);
    transition: transform 0.5s ease-in-out;
  }

  h1:hover::before {
    transform-origin: left;
    transform: scaleX(1);
  }

  @media (max-width: 768px) {
    font-size: 150%;
    text-align: center;
    padding: 0;
    margin: 0;
  }
`;

const DescriptionText = styled.span`
  font-size: 0.8em;
  font-family: 'cooper-bold';
  line-height: 2.1;
  color: #9d9d9d;
  width: 30vw;
  margin-top: 2em;

  @media (max-width: 768px) {
    font-size: 100%;
    width: 100%;
    margin: 0;
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: start;

  @media (max-width: 768px) {
    margin-top: 2%;
  }
`;
