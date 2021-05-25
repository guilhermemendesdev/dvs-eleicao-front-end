import { getHeaders } from './localStorage'
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import { GET_ALUNOS, GET_ALUNO, LIMPAR_ALUNO, CANCELAR_ALUNO } from './types';

export const getAlunos = (zona, atual, limit) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/aluno/adm?zona=${zona}&offset=${atual}&limit=${limit}`, getHeaders())
      .then(response => dispatch({ type: GET_ALUNOS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getAlunosPesquisa = (termo, zona, atual, limit) => {
  return function (dispatch) {
    axios.get(`${api}/api/${versao}/aluno/adm/search/${termo}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_ALUNOS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getAluno = (id, zona) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/aluno/adm/${id}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_ALUNO, payload: response.data }))
      .catch(errorHandling);
  }
}

export const cancelarAluno = (id, zona, cb) => {
  return function (dispatch) {
    axios.delete(`${api}/api/${versao}/pedidos/adm/${id}?zona=${zona}`, getHeaders())
      .then(response => {
        dispatch({ type: CANCELAR_ALUNO, payload: response.data });
        cb(null);
      })
      .catch(e => cb(errorHandling(e)));
  }
}

export const limparAluno = () => ({ type: LIMPAR_ALUNO });