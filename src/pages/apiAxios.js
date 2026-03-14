import axios from 'axios';
import { baseUrl } from '../../hostConfig.js';

const api = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true // <--- Esto activa el envío de cookies para todas las peticiones
});

export default api;