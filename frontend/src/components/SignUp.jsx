import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useAlert from '../hooks/useAlert';
import { registerNewUser } from '../services/users';
import { ILogo } from '../assets/icons/logo';
import Home from './Home';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');

  const { alertSuccess, alertError } = useAlert();

  //Creo nuevo usuario
  const handleNewUser = (event) => {
    event.preventDefault();
    const newUser = {
      username: username,
      password: password,
      name: name,
      registration_number: registrationNumber,
    };

    //LLamada a la base de datos con los datos del nuevo usuario
    registerNewUser(newUser)
      .then((res) => {
        alertSuccess(
          'Usuario creado correctamente. Contacte con el adminitrador para habilitar su cuenta'
        );
        setTimeout(() => {
          window.location.href = '/';
        }, 5000);
      })
      .catch((err) => {
        console.error(err);
        alertError('Ha ocurrido un error. Intente nuevamente');
      });
  };

  return (
    <NewUserContainer>
      <BlurBackground>
        <Home />
      </BlurBackground>
      <FormContainer>
        <LogoContainer to="/">
          <ILogo />
        </LogoContainer>
        <LoginForm onSubmit={(e) => handleNewUser(e)}>
          <LoginInput
            type="text"
            value={username}
            name="username"
            placeholder="Email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <LoginInput
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginInput
            type="text"
            value={name}
            name="name"
            placeholder="Nombre y apellido"
            onChange={(e) => setName(e.target.value)}
          />
          <LoginInput
            type="text"
            value={registrationNumber}
            name="registrationNumber"
            placeholder="Nro. Matricula"
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
          <LoginButton>Crear usuario</LoginButton>
        </LoginForm>
      </FormContainer>
    </NewUserContainer>
  );
};

export default SignUp;

const NewUserContainer = styled.div`
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
  min-width: 250px;
  flex-direction: column;
  height: 60%;
  min-height: 400px;
  background-color: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid #3498db;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  width: 50%;
  height: 15vh;
  min-height: 100px;
  margin-bottom: 50px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 50%;
  justify-content: center;
  align-items: center;
  padding: 10px;
  padding-top: 0;
`;

const LoginInput = styled.input`
  font-size: 16px;
  padding: 8px;
  margin: 8px;
  border: 2px solid lightgray;
  border-radius: 10px;
  width: 80%;
  min-width: 150px;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 13vw;

  margin: 16px auto;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 0.8em;
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
