import { getHeaders } from './localStorage'
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import { GET_FUNCIONARIOS, GET_FUNCIONARIO, LIMPAR_FUNCIONARIO, CANCELAR_FUNCIONARIO } from './types';

export const getFuncionarios = (zona, atual, limit) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/funcionario/adm?zona=${zona}&offset=${atual}&limit=${limit}`, getHeaders())
      .then(response => dispatch({ type: GET_FUNCIONARIOS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getFuncionariosPesquisa = (termo, zona, atual, limit) => {
  return function (dispatch) {
    axios.get(`${api}/api/${versao}/funcionario/adm/search/${termo}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_FUNCIONARIOS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getFuncionario = (id, zona) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/funcionario/adm/${id}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_FUNCIONARIO, payload: response.data }))
      .catch(errorHandling);
  }
}

export const limparFuncionario = () => ({ type: LIMPAR_FUNCIONARIO });