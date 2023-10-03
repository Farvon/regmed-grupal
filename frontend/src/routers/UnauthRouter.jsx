import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Home from '../components/Home';

//Este componente posee la página de inicio para usuarios no logeados
//El login y el registro para nuevos usuarios.

const UnauthRouter = ({ setUser }) => {
  return (
    <Routes>
      <Route path="/" name="home" element={<Home />} exact />
      <Route
        path="/login"
        name="Login"
        element={<Login setUser={setUser} />}
        exact
      />
      <Route path="/login/sign-up" name="signup" element={<SignUp />} exact />
      <Route
        path="*"
        name="default"
        element={<Login setUser={setUser} />}
        exact
      />
<<<<<<< HEAD
      <Route path='/aboutus' name="nosotros" element ={<AboutUs/>}  exact/>
      
      <Route path='/documentacion' name="documentacion" element ={<Documentacion/>}  exact/>

      <Route path='/documentacion' name="Trabajos" element ={<Trabajos/>}  exact/>

      
    </Routes>

=======
    </Routes>
>>>>>>> f765f7175951ab60a11dd1ffd39fe8601eb3f98a
  );
};

export default UnauthRouter;
