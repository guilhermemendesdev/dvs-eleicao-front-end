import { GET_CANDIDATOS, GET_CANDIDATO, LIMPAR_CANDIDATO, CANCELAR_CANDIDATO } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CANDIDATOS:
      return {
        ...state,
        candidatos: action.payload.candidato
      }
    case GET_CANDIDATO:
      return {
        ...state,
        candidato: action.payload.candidato
      }
    case LIMPAR_CANDIDATO:
      return {
        ...state,
        candidato: null
      }
    case CANCELAR_CANDIDATO:
      return {
        ...state,
        candidato: {
          ...state.candidato,
          candidato: {
            ...state.candidato.candidato,
            cancelado: action.payload.cancelado
          }
        }
      }
    default:
      return state;
  }
}
