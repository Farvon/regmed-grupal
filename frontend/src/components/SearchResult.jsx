import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getPacientByDni } from '../services/pacients';
import ButtonLink from './ButtonLink';
import SideBar from './SideBar';
import { ILogo } from '../assets/icons/logo';

//Recibe el DNI a buscar
const SearchResult = ({ dni, setDni, user }) => {
  const [paciente, setPaciente] = useState();

  //Busca en la Base de Datos si existe un paciente con el DNI
  useEffect(() => {
    dni &&
      getPacientByDni(dni)
        .then((paciente) => setPaciente(paciente))
        .catch((err) => {
          console.error(err);
          setPaciente(null);
        });
  }, [dni]);

  return (
    <PageContainer>
      <SideBar setDni={setDni} user={user} />
      <InfoContainer>
        {/* Si existe muestra el resultado, sino, un mensaje */}
        {paciente ? (
          <>
            <InfoTitle>Resultado de la búsqueda</InfoTitle>

            <ResultadoContainer>
              <TableContainer>
                <TableHead>
                  <tr>
                    <Th>Nombre</Th>
                    <Th>Apellido</Th>
                    <Th>D.N.I.</Th>
                    <Th>Historia Clínica</Th>
                  </tr>
                </TableHead>
                <TableBody>
                  <tr>
                    <Td>{paciente.nombre}</Td>
                    <Td>{paciente.apellido}</Td>
                    <Td>{paciente.dni}</Td>
                    <Td>
                      <Link to="/info">
                        <ButtonLink fontSize="16px">Info</ButtonLink>
                      </Link>
                    </Td>
                  </tr>
                </TableBody>
              </TableContainer>
            </ResultadoContainer>
          </>
        ) : (
          <>
            <InfoTitle>Ups, parece que no hay nadie con ese DNI.</InfoTitle>
            <BackgroundLogo>
              <ILogo />
              <Span>RegMed</Span>
            </BackgroundLogo>
          </>
        )}
      </InfoContainer>
    </PageContainer>
  );
};

export default SearchResult;

const PageContainer = styled.div`
  display: flex;
`;

const InfoContainer = styled.div`
  width: calc(100vw - 300px);
  height: calc(100vh - 64px);
  background-image url(./bg-home.jpg);
  background-size:cover;
`;

const InfoTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin: 36px 0px 0px 0px;
`;

const ResultadoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100px;
  
`;

const TableContainer = styled.table`
  display: flex;
  height: 100px;
  margin: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-collapse: collapse;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 15px 40px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;

  
`;

const TableHead = styled.thead`
  display: flex;
  margin: 0;
  padding: 0;
`;

const TableBody = styled.tbody`
  display: flex;
  margin: 0;
  padding: 0;
`;

const Th = styled.th`
  width: 15vw;
  margin:5px;
  border-bottom: 2px solid black;
  padding: 8px;
  padding-top:26px;
  font-weight: bold;
  
`;

const Td = styled.td`
  width: 15vw;
  padding: 8px;
  text-align: center;
  
`;

const BackgroundLogo = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.2;
  width: 200px;
  margin-top: 10vh;
`;

const Span = styled.span`
  font-family: 'Roboto', sans-serif;
  letter-spacing: 5px;
  font-weight: 500;
  font-size: 3em;
  opacity: 0.5;
`;
