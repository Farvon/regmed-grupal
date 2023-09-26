import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useAlert from '../hooks/useAlert';
import { login } from '../services/login';
import ButtonLink from './ButtonLink';
import { ILogo } from '../assets/icons/logo';
import Home from './Home';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { alertError } = useAlert();

  //Aquí se verifica si el usuario es "Guest" o no
  const handleLogin = (event, type) => {
    event.preventDefault();
    const credentials =
      type === 'guest'
        ? { username: 'guest', password: 'guest' }
        : { username, password };

    //LLama al Backend enviando las credenciales del usuario a logear
    login(credentials)
      .then((response) => {
        localStorage.setItem('loggedRegMedUser', JSON.stringify(response));
        setUser(response);
        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
        const errorCode = err.response.status;
        switch (errorCode) {
          case 401:
            alertError('Usuario o contraseña invalidos');
            break;
          case 403:
            alertError('Usuario deshabilitado. Contacte con el administrador');
            break;
          default:
            alertError('Ha ocurrido un error. Intente nuevamante');
        }
      });
  };

  return (
    <LoginContainer>
      <BlurBackground>
        <Home />
      </BlurBackground>
      <FormContainer>
        <LogoContainer to="/">
          <ILogo />
        </LogoContainer>

        <LoginForm onSubmit={(e) => handleLogin(e, 'user')}>
          <LoginInput
            type="text"
            value={username}
            name="Username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginInput
            type="password"
            value={password}
            name="Password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton>Login</LoginButton>
        </LoginForm>
        <LoginButton onClick={(e) => handleLogin(e, 'guest')}>
          Ingresar como Paciente
        </LoginButton>
        <div>
          <span>Todavia no estas registrado? </span>
          <ButtonLink fontSize="16px">
            <StyledLink to="sign-up">Sign up</StyledLink>
          </ButtonLink>
        </div>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const BlurBackground = styled.div`
  position: absolute;
  z-index: -1;
  filter: blur(2px);
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  min-height: 300px;
  background-color: #fff;
  border: 1px solid #3498db;
  border-radius: 50px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 16px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  width: 50%;
  height: 15vh;
  min-height: 80px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 200px;
`;

const LoginInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 16px;
  border: 2px solid lightgray;
  border-radius: 10px;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 18px;
  border-radius: 8px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;

  :disabled {
    opacity: 0.2;
    pointer-events: none;
  }

  :hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  }

  :active {
    background: #3498db;
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
  }
`;

const StyledLink = styled(Link)`
  all: unset;
`;
