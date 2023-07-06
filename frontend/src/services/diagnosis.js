import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/diagnosis';

const user = JSON.parse(localStorage.getItem('loggedRegMedUser'));
const token = user && user.token && `Bearer ${user.token}`;

//obtener todos los pacientes
const getAllDiagnosis = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export { getAllDiagnosis };