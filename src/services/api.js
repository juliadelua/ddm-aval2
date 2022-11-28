import axios from 'axios';
 
const api17 = axios.create({
	baseURL: 'https://viacep.com.br/ws/'
});

const api18 = axios.create({
	baseURL: 'https://api.github.com/users/'
});

const api19 = axios.create({
	baseURL: 'https://economia.awesomeapi.com.br/json/last/'
});

const api20 = axios.create({
	baseURL: 'https://sujeitoprogramador.com/r-api/?api=filmes'
});

const api21 = axios.create({
	baseURL: 'https://tarefa-backend.herokuapp.com/'
});
 
export { api17, api18, api19, api20, api21 };

  //baseURL: 'https://tarefa-backend.herokuapp.com/'
  //baseURL: 'https://viacep.com.br/ws/' // ex. 17
  //baseURL: 'https://api.github.com/users/' // ex. 18
  //baseURL: 'https://economia.awesomeapi.com.br/json/last/' // ex. 19
  // baseURL: 'https://sujeitoprogramador.com/r-api/?api=filmes' // ex. 20
