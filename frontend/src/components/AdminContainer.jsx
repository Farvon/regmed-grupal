import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import useAlert from '../hooks/useAlert';
import { getUsers, enableUser } from '../services/users';
import { getLogByDni } from '../services/logs';
import Log from './Log';
import MyPdfViewer from './MyPdfViewer';

//Página del usuario Admin donde se habilitan los nuevos usuarios.
const AdminContainer = () => {
  const [users, setUsers] = useState();
  const { alertSuccess, alertError } = useAlert();
  const [showHabilitar, setShowHabilitar] = useState(true); /*  */
  const [showLogs, setShowLogs] = useState(false); /*  */
  const [filterDni, setFilterDni] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  const [logs, setLogs] = useState();

  useEffect(() => {
    getUsers().then((res) => setUsers(res.filter((user) => !user.enabled)));
  }, [users]);

  const handleEnableUser = (username) => {
    enableUser(username)
      .then((res) => alertSuccess('Usuario habilitado correctamente'))
      .catch((err) => console.error(err));
  };

  const handleFilterSearch = (dni) => {
    getLogByDni(dni).then((res) => {
      setLogs(res);
    });
  };

  const pdfRef = useRef();

  const Download = () => {
    const quotes = pdfRef.current;
    html2canvas(quotes).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.max(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save('Logs.pdf');
    });
  };

  return (
    <PageContainer>
      <AdminHeader>
        <HeaderButton
          onClick={() => (setShowHabilitar(true), setShowLogs(false))}
        >
          Habilitar Usuarios
        </HeaderButton>
        <HeaderButton
          onClick={() => (setShowHabilitar(false), setShowLogs(true))}
        >
          {/* Logs: http://localhost:3001/api/logs */}
          Ver Logs
        </HeaderButton>
      </AdminHeader>
      <AdminBody>
        {showHabilitar && (
          <>
            {/* If. Si showHabilitar está en true: */}
            <HabilitaContainer>
              <h1>Habilitar Nuevos Usuarios</h1>
            </HabilitaContainer>
            <Table>
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Nombre</th>
                  <th>Habilitar</th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user, idx) => (
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.name}</td>
                      <td>
                        <EnableButton
                          onClick={() => handleEnableUser(user.username)}
                        >
                          Habilitar
                        </EnableButton>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )}
        {showLogs && (
          <>
            <FiltroLogContainer>
              <Filtros>
                <label>Buscar por DNI</label>
                <input
                  value={filterDni}
                  onChange={(e) => {
                    setFilterDni(e.target.value);
                  }}
                  placeholder="DNI"
                ></input>
              </Filtros>

              {/* <Filtros>
                <label>Buscar por fecha</label>
                <div>
                  Desde
                  <input
                    type="date"
                    value={minDate}
                    onChange={(e) => {
                      setMinDate(e.target.value);
                    }}
                  ></input>
                  Hasta
                  <input
                    type="date"
                    value={maxDate}
                    onChange={(e) => {
                      setMaxDate(e.target.value);
                    }}
                  ></input>
                </div>
              </Filtros> */}
              <FilterButton onClick={() => handleFilterSearch(filterDni)}>
                Buscar
              </FilterButton>
              <FilterButton onClick={() => Download()}>Descargar</FilterButton>
            </FiltroLogContainer>
            <div ref={pdfRef}>
              {logs &&
                logs.map((item, index) => {
                  return <Log item={item} key={index} />;
                })}
            </div>
          </>
        )}
      </AdminBody>
    </PageContainer>
  );
};

export default AdminContainer;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const AdminHeader = styled.div`
  display: flex;
  flex-direction: row;

  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
`;

const HeaderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 140px;
  margin: 10px 4px;
  margin-left: 18px;
  color: white;
  padding: 8px 14px 8px 14px;
  font-size: 14px;
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

const FiltroLogContainer = styled.div`
  display: flex;
  flex-direction: row;

  padding: 10px 0px;
  background-color: rgba(237, 237, 237, 0.4);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  align-items: center;
`;

const Filtros = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-left: 18px;
`;

const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  margin: 10px;
  color: white;
  padding: 10px;
  font-size: 12px;
  border-radius: 8px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border: none;
  transition: all 0.3s ease;

  :hover {
    background: #3cb0fd;
    background-image: linear-gradient(to bottom, #3cb0fd, #3498db);
  }

  :active {
    background: #3498db;
    background-image: linear-gradient(to bottom, #3498db, #2980b9);
  }
`;

const AdminBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: calc(100vh - 64px);
`;

const HabilitaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  background-color: rgba(237, 237, 237, 0.4);
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  h1 {
    padding-bot: 16px;
    padding-left: 16px;
  }
`;

const Table = styled.table`
  justify-content: center;
  align-items: center;
  padding: 2px;
  tbody {
    text-align: center;
  }

  th {
    background-color: lightgray;
  }

  td {
    width: 33%;
    padding: 10px;
    border-left: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    :last-child {
      border-right: 1px solid lightgray;
    }
  }
`;

const EnableButton = styled.button`
  width: 40%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin: auto;
  color: white;
  padding: 12px 24px 12px 24px;
  font-size: 0.8em;
  border-radius: 8px;
  background: #3498db;
  background-image: linear-gradient(to bottom, #3498db, #2980b9);
  border: none;
  transition: all 0.3s ease;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
`;
