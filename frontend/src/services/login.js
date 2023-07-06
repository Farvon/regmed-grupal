import axios from 'axios';
const baseUrl = 'http://192.168.1.20:3001/api/login';

//envía las credenciales y según lo que reciba (data) seguirá la app
export const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};
