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
  width: 21.8em;
  height:70%;
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
margin-bottom: 8em;
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
margin:1em;
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
padding: 15px;
margin: 30px 20px;
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
