import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/logs';

const user = JSON.parse(localStorage.getItem('loggedRegMedUser'));
const token = user && user.token && `Bearer ${user.token}`;

//obtener todos los pacientes
const getAllLogs = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};
//obtener paciente por DNI
const getLogByDni = (dni) => {
  const request = axios.get(`${baseUrl}/${dni}`);
  return request.then((response) => response.data);
};

//Agrega Log a paciente
const putPacientLog = (dni, log) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };

  const request = axios.put(`${baseUrlLogs}/`, log, config);

  return request.then((response) => response.data);
};

export { getAllLogs, getLogByDni, putPacientLog };
