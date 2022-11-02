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
        <SpanLogo>RegMed</SpanLogo>
      </LogoContainer>
      <NavBarContainer>
        <a href="http://todosn.com/documentacion.php" target="_blank">
          Documentación
        </a>
        <a href="http://todosn.com/about.php" target="_blank">
          Sobre nosotros
        </a>
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
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  width: 32px;
`;

const SpanLogo = styled.span`
  font-size: 24px;
  font-weight: 600;
  margin-left: 4px;
`;

const NavBarContainer = styled.div`
  display: flex;
  justify-content: center;

  a {
    all: unset;
    cursor: pointer;
    font-weight: 500;
    margin: 0 8px;
  }

  a:hover {
    opacity: 0.7;
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
`;
