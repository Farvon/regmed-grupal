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
width: 21.8em;
background: #F8F9FD;
background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
border-radius: 40px;
padding: 25px 35px;
border: 5px solid rgb(255, 255, 255);
box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
margin: 20px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  justify-content:center;
  align-items: center;
  width: auto;
  height: 15vh;
  min-height: 80px;
  margin: 1em 0;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin:auto;
  width:auto;
  height: 200px;
`;

const LoginInput = styled.input`
width: 80%;
background: white;
border: none;
padding: 15px 20px;
border-radius: 20px;
margin-top: 15px;
box-shadow: #cff0ff 0px 10px 10px -5px;
border-inline: 2px solid transparent;

::-moz-placeholder {
  color: rgb(170, 170, 170);
}

::placeholder {
  color: rgb(170, 170, 170);
}

:focus {
  outline: none;
  border-inline: 2px solid #12B1D1;
}

`;

const LoginButton = styled.button`
display: block;
width: 95%;
font-weight: bold;
background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
color: white;
padding-block: 15px;
margin: 20px auto;
border-radius: 20px;
box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
border: none;
transition: all 0.2s ease-in-out;
}

:hover {
transform: scale(1.03);
box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
}

:active {
transform: scale(0.95);
box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
}
`;

const StyledLink = styled(Link)`
  all: unset;
`;
