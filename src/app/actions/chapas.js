import { getHeaders } from './localStorage'
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import { GET_CHAPAS, GET_CHAPA, LIMPAR_CHAPA, CANCELAR_CHAPA } from './types';

export const getChapas = (zona, atual, limit) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/chapa?zona=${zona}&offset=${atual}&limit=${limit}`, getHeaders())
      .then(response => dispatch({ type: GET_CHAPAS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const salvarChapa = (chapa, zona, cb) => {
  return function (dispatch) {
    axios.post(`${api}/api/${versao}/chapa/adm?zona=${zona}`, {
      nome: chapa.nome,
      numero: chapa.numero
    }, getHeaders())
      .then(response => {
        dispatch({ type: GET_CHAPAS, payload: response.data });
        cb(null);
      })
      .catch(e => cb(errorHandling(e)))
  }
}


export const getChapasPesquisa = (termo, zona, atual, limit) => {
  return function (dispatch) {
    axios.get(`${api}/api/${versao}/chapa/search/${termo}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_CHAPAS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getChapa = (id, zona) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/chapa/${id}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_CHAPA, payload: response.data }))
      .catch(errorHandling);
  }
}

export const limparChapa = () => ({ type: LIMPAR_CHAPA });