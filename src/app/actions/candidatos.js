import { getHeaders } from './localStorage'
import axios from 'axios';
import { api, versao } from '../config';
import errorHandling from './errorHandling';
import { GET_CANDIDATOS, GET_CANDIDATO, LIMPAR_CANDIDATO, CANCELAR_CANDIDATO } from './types';

export const getCandidatos = (zona, atual, limit) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/candidato?zona=${zona}&offset=${atual}&limit=${limit}`, getHeaders())
      .then(response => dispatch({ type: GET_CANDIDATOS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getCandidatosPesquisa = (termo, zona, atual, limit) => {
  return function (dispatch) {
    axios.get(`${api}/api/${versao}/candidato/adm/search/${termo}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_CANDIDATOS, payload: response.data }))
      .catch(errorHandling)
  }
}

export const getCandidato = (id, zona) => {
  return async function (dispatch) {
    await axios.get(`${api}/api/${versao}/candidato/${id}?zona=${zona}`, getHeaders())
      .then(response => dispatch({ type: GET_CANDIDATO, payload: response.data }))
      .catch(errorHandling);
  }
}

export const salvarCandidatos = (chapa, zona, cb) => {
  return function (dispatch) {
    axios.post(`${api}/api/${versao}/candidato?zona=${zona}`, {
      nome: chapa.nome,
      dt_nascimento: chapa.dt_nascimento,
      cpf: chapa.cpf,
      email: chapa.email,
      rg: chapa.rg,
      telefone: chapa.telefone,
      cargo: chapa.cargo,
      funcao: chapa.funcao,
      graduacao: chapa.graduacao,
      curso_graduacao: chapa.curso_graduacao,
      pos_graduacao: chapa.pos_graduacao,
      curso_pos_graduacao: chapa.curso_pos_graduacao,
      mestrado: chapa.mestrado,
      curso_mestrado: chapa.curso_mestrado,
      doutorado: chapa.doutorado,
      curso_doutorado: chapa.curso_doutorado,
      curso_gestor: chapa.curso_gestor,
      obs_curso_gestor: chapa.obs_curso_gestor,
      outros_cursos: chapa.outros_cursos,
      data_entrada_inst: chapa.data_entrada_inst,
      data_entrada_docencia: chapa.data_entrada_docencia,
      endereco: {
        cep: chapa.cep,
        rua: chapa.rua,
        complemento: chapa.complemento,
        cidade: chapa.cidade,
        uf: chapa.uf,
        bairro: chapa.bairro,
        numero: chapa.numero
      },
      chapa: chapa.chapa
    }, getHeaders())
      .then(response => {
        dispatch({ type: GET_CANDIDATOS, payload: response.data });
        cb(null);
      })
      .catch(e => cb(errorHandling(e)))
  }
}

export const limparCandidato = () => ({ type: LIMPAR_CANDIDATO });