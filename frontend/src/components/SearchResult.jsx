import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getPacientByDni } from '../services/pacients';
import ButtonLink from './ButtonLink';
import SideBar from './SideBar';
import { ILogo } from '../assets/icons/logo';

const SearchResult = ({ dni, setDni, user }) => {
  const [paciente, setPaciente] = useState();

  useEffect(() => {
    console.log('search result', dni);
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
  background: #f4f6f5;
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
  height: 80px;
  margin: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-collapse: collapse;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
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
  width: 200px;
  padding: 8px;
  background-color: white;
  font-weight: bold;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;

  :last-child {
    border-right: none;
  }
`;

const Td = styled.td`
  width: 200px;
  padding: 8px;
  background-color: white;
  text-align: center;
  border-right: 1px solid lightgray;

  :last-child {
    border-right: none;
  }
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
