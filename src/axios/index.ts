import * as axios from 'axios';

export default axios.default.create({
  baseURL: 'https://rickandmortyapi.com/api/',
  headers: {
    'Access-Control-Expose-Headers': '*, Authorization',
    'Access-Control-Allow-Headers': '*, authorization',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  },
});
