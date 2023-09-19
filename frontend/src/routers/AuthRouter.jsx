import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import WelcomePage from '../components/WelcomePage';
import AdminContainer from '../components/AdminContainer';
import SearchResult from '../components/SearchResult';
import LayoutAuth from '../layout/LayoutAuth';
import InfoPaciente from '../components/InfoPaciente';
import DiagnosticoPaciente from '../components/DiagnosticoPaciente';
import AddPaciente from '../components/AddPaciente';
import InfoPacienteMobil from '../components/InfoPacienteMobil';
import DiagnosticoPacienteMobil from '../components/DiagnosticoPacienteMobil';

//Componente para usuarios ya logueados

const AuthRouter = () => {
  const [user, setUser] = useState();
  const [dni, setDni] = useState();
  const [diagnosticId, setDiagnosticId] = useState();

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedRegMedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <LayoutAuth>
      <Routes>
        <Route
          path="/"
          name="menu"
          element={
            <>
              {/* Si el usuario es Admin nos deriva a su respectiva página
            sino nos deriva al WelcomePage */}
              {user && user.username === 'admin' ? (
                <AdminContainer />
              ) : (
                <WelcomePage setDni={setDni} user={user} />
              )}
            </>
          }
          exact
        />

        {/* Estos son los ruteos, dependiendo el path nos derivará
        a su respectivo componente */}

        <Route
          path="/search"
          name="search"
          element={
            <>
              <SearchResult dni={dni} setDni={setDni} user={user} />
            </>
          }
          exact
        />
        <Route
          path="/info"
          name="info"
          element={
            <>
              <InfoPaciente
                dni={dni}
                setDni={setDni}
                user={user}
                setDiagnosticId={setDiagnosticId}
              />
            </>
          }
          exact
        />
        <Route
          path="/mobil"
          name="mobil"
          element={
            <>
              <InfoPacienteMobil
                dni={dni}
                setDni={setDni}
                user={user}
                setDiagnosticId={setDiagnosticId}
              />
            </>
          }
          exact
        />
        <Route
          path="/diagnostic"
          name="disgnostic"
          element={
            <>
              <DiagnosticoPaciente
                dni={dni}
                setDni={setDni}
                user={user}
                diagnosticId={diagnosticId}
              />
            </>
          }
          exact
        />
        <Route
          path="/diagnosticMobil"
          name="disgnosticMobil"
          element={
            <>
              <DiagnosticoPacienteMobil
                dni={dni}
                setDni={setDni}
                user={user}
                diagnosticId={diagnosticId}
              />
            </>
          }
          exact
        />
        <Route
          path="/add-pacient"
          name="add-pacient"
          element={
            <>
              <AddPaciente user={user} />
            </>
          }
          exact
        />
        <Route
          path="*"
          name="default"
          element={<WelcomePage setDni={setDni} user={user} />}
          exact
        />
      </Routes>
    </LayoutAuth>
  );
};

export default AuthRouter;
