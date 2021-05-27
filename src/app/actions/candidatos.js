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

export const salvarCandidatos = (candidato, zona, cb) => {
  console.log(candidato)
  return function (dispatch) {
    axios.post(`${api}/api/${versao}/candidato?zona=${zona}`, {
      nome: candidato.nome,
      dt_nascimento: candidato.dt_nascimento,
      cpf: candidato.cpf,
      email: candidato.email,
      rg: candidato.rg,
      telefone: candidato.telefone,
      cargo: candidato.cargo,
      funcao: candidato.funcao,
      graduacao: candidato.graduacao,
      curso_graduacao: candidato.curso_graduacao,
      pos_graduacao: candidato.pos_graduacao,
      curso_pos_graduacao: candidato.curso_pos_graduacao,
      mestrado: candidato.mestrado,
      curso_mestrado: candidato.curso_mestrado,
      doutorado: candidato.doutorado,
      curso_doutorado: candidato.curso_doutorado,
      curso_gestor: candidato.curso_gestor,
      obs_curso_gestor: candidato.obs_curso_gestor,
      outros_cursos: candidato.outros_cursos,
      data_entrada_inst: candidato.data_entrada_inst,
      data_entrada_docencia: candidato.data_entrada_docencia,
      endereco: {
        cep: candidato.cep,
        rua: candidato.rua,
        complemento: candidato.complemento,
        cidade: candidato.cidade,
        uf: candidato.uf,
        bairro: candidato.bairro,
        numero: candidato.numero
      },
      chapa: candidato.chapa
    }, getHeaders())
      .then(response => {
        dispatch({ type: GET_CANDIDATOS, payload: response.data });
        cb(null);
      })
      .catch(e => cb(errorHandling(e)))
  }
}

export const removeCandidatoImagens = (fotos, id, zona, cb) => {
  console.log(fotos)
  return function (dispatch) {
    axios.put(`${api}/api/${versao}/candidato/${id}?zona=${zona}`, { foto: [] }, getHeaders())
      .then(response => {
        dispatch({ type: GET_CANDIDATO, payload: response.data });
        console.log(response.data)
        cb(null);
      })
      .catch(e => cb(errorHandling(e)));
  }
}

export const updateCandidatoImagens = (data, id, zona, cb) => {
  return function (dispatch) {
    axios.put(`${api}/api/${versao}/candidato/images/${id}?zona=${zona}`, data, getHeaders())
      .then(response => {
        dispatch({ type: GET_CANDIDATO, payload: response.data });
        cb(null);
      })
      .catch(e => cb(errorHandling(e)));
  }
}



export const limparCandidato = () => ({ type: LIMPAR_CANDIDATO });