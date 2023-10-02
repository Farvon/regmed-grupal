import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthRouter from './AuthRouter';
import UnauthRouter from './UnauthRouter';

//Este componente nos va a re-direccionar dependiendo si el usuario
//se encuentra ya logueado o no.

//Creamos componente MainRouter
const MainRouter = () => {
  const [user, setUser] = useState();

  //Busca el item "loggedRegMedUser" dentro del localStorage.
  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedRegMedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  return (
    <BrowserRouter>
      {/*   //Si existe nos deriva al componente AuthRouter,
       sino, a UnauthRouter
       */}
      {user ? <AuthRouter /> : <UnauthRouter setUser={setUser} />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default MainRouter;
