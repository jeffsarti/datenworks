import axios from 'axios';

/* Criamos uma instância do axios com a nossa url base, assim todas as requisições partirão dessa instância */
const api = axios.create({baseURL: 'https://api.github.com'});

export default api;
