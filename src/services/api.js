import axios from 'axios';
// const rawSource = 'http://192.168.86.1/compomusServer';
// const rawSource = 'http://compomus.funtechshow.com/api';
// global.rawSource = rawSource;

const api = axios.create({
  // baseURL: 'https://rocketseat-node.herokuapp.com/api',
  baseURL: `${global.rawSource}/index.php`,
});

export default api;
