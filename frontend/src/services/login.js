import axios from 'axios';
//const baseUrl = 'http://localhost:3001/api/login';
<<<<<<< HEAD
//const baseUrl = 'http://192.168.1.27:3001/api/login'; //joa
//const baseUrl = 'http://192.168.1.20:3001/api/login'; //facu
const baseUrl = 'http://192.168.0.106:3001/api/login';// facug
=======
const baseUrl = 'http://192.168.1.27:3001/api/login'; //joa
//const baseUrl = 'http://192.168.1.20:3001/api/login'; //facu
>>>>>>> 7ce146c124fd31e5a5ec471494f59c934cfa2608

//envía las credenciales y según lo que reciba (data) seguirá la app
export const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials);
  return data;
};
