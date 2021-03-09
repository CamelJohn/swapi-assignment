import axios from 'axios';

// resuable axios instance pointed at our api wrapper implementation.
const instance = axios.create({
  baseURL: 'http://localhost:8080/swapi-wrapper/api/',
});

export default instance;