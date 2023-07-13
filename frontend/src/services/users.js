import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/users';

//Registra nuevo usuario
export const registerNewUser = async (newUser) => {
  const request = axios.post(baseUrl, newUser);

  return request.then((response) => response.data);
};

//Obtiene usuarios para ver los deshabilitados
export const getUsers = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

//Edita el estado de Habilitado del usuario
export const enableUser = (username) => {
  const request = axios.put(`${baseUrl}/${username}`);

  return request.then((response) => response.data);
};
