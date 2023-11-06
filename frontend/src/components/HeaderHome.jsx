import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ILogo } from '../assets/icons/logo';

const HeaderHome = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo>
          <ILogo />
        </Logo>
        <SpanLogo>REGMED</SpanLogo>
      </LogoContainer>
      <NavBarContainer>
        <Link to={'/about'}>Sobre Nosotros</Link>
        <Link to={'/documentacion'}>Documentacion</Link>
      </NavBarContainer>
      <LoginContainer>
        <Link to="/login">
          <LoginButton>Ingresa</LoginButton>
        </Link>
      </LoginContainer>
    </HeaderContainer>
  );
};

export default HeaderHome;

const HeaderContainer = styled.header`
  width: 100vw;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  box-sizing: border-box;
  z-index: 100;

  @media (max-width: 768px) {
    width: 100%;
    padding: 5%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 70px;

  @media (max-width: 768px) {
    width: 25%;
  }
`;

const SpanLogo = styled.span`
  font-family: 'cooper-bold';
  font-size: 28px;
  font-weight: 800;
  margin-left: 10px;
  color: #4b4d5b;

  @media (max-width: 768px) {
    font-size: 150%;
    margin-left: 1%;
  }
`;

const NavBarContainer = styled.div`
  display: flex;
  flex.wrap: wrap;
  width: 50vw;
  align-items: center;
  justify-content: center;
  color: #4f4f4f;
  margin-right: 9em;

  a {
    width: 100%;
    font-family: 'cooper-medium';
    all: unset;
    cursor: pointer;
    font-weight: 600;
    margin: 0 1em;
    line-height: 42px;
  }

  a:hover {
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginContainer = styled.div`
  a {
    all: unset;
  }
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  margin: 16px auto;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  :hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  }

  :active {
    background: #3498db;
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
  }

  @media (max-width: 768px) {
    margin-right: 10%;
  }
`;
