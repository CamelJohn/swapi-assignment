import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8080/swapi-wrapper/api/',
});

export default instance;