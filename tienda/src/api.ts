import axios from 'axios';

// aqui se crea axios una sola vez, con la direccion de la api y un tiempo limite
// ningun componente importa axios, todos usan esta instancia a traves de los servicios
export const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000, // si la api no contesta en 5 segundos, se marca como error
});
