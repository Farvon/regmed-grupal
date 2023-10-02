import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//Obtenemos el elemento por el ID "root" y renderizamos el componente App
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
