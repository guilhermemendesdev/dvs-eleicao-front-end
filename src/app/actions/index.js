import axios from 'axios';
import {
  LOGIN_USER,
  LOGOUT_USER
} from './types';
import { api, versao } from '../config';
import { saveToken, getHeaders, cleanToken } from './localStorage';
import errorHandling from "./errorHandling";
import moment from 'moment';

export const initApp = () => {
  const opcaoLembrar = localStorage.getItem("opcaoLembrar");
  if (opcaoLembrar === "false") cleanToken();
}

// USUARIOS
export const handleLogin = ({ inep, password, opcaoLembrar }, callback) => {
  return function (dispatch) {
    axios.post(`${api}/api/${versao}/usuarios/login`, { inep, password })
      .then((response) => {
        saveToken(response.data.usuario, opcaoLembrar);
        dispatch({ type: LOGIN_USER, payload: response.data });
      })
      .catch((e) => callback(errorHandling(e)));
  }
}

export const getUser = () => {
  return function (dispatch) {
    axios.get(`${api}/api/${versao}/usuarios/`, getHeaders())
      .then((response) => {
        saveToken(response.data.usuario, true);
        dispatch({ type: LOGIN_USER, payload: response.data });
      })
      .catch((error) => console.log(error, error.response, error.response && error.response.data));
  }
}

export const updateUser = (dados, cb) => {
  return function (dispatch) {
    axios.put(`${api}/api/${versao}/usuarios/`, dados, getHeaders())
      .then((response) => {
        saveToken(response.data.usuario, true);
        dispatch({ type: LOGIN_USER, payload: response.data });
        cb(null);
      })
      .catch((error) => cb(errorHandling(error)));
  }
}

export const handleLogout = () => {
  cleanToken();
  return { type: LOGOUT_USER };
}

export const formatMoney = (valor) => {
  return `R$ ${valor.toFixed(2).split(".").join(",")}`
}

export const transformDate = (data, divisor, formato) => {
  const _data = data.split(divisor);
  const dia = Number(_data[0]) + 1;
  const mes = Number(_data[1]) - 1;
  const ano = Number(_data[2]);
  return moment(new Date(ano, mes, dia)).format(formato);
}
