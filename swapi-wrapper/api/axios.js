import axios from 'axios';

/**
 * @description convenience instance for axios.
 */

const instance = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

export default instance;
