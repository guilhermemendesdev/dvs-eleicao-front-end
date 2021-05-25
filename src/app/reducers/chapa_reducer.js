import { GET_CHAPAS, GET_CHAPA, LIMPAR_CHAPA, CANCELAR_CHAPA } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_CHAPAS:
      return {
        ...state,
        chapas: action.payload.chapa
      }
    case GET_CHAPA:
      return {
        ...state,
        chapa: action.payload.chapa
      }
    case LIMPAR_CHAPA:
      return {
        ...state,
        chapa: null
      }
    case CANCELAR_CHAPA:
      return {
        ...state,
        chapa: {
          ...state.chapa,
          chapa: {
            ...state.chapa.chapa,
            cancelado: action.payload.cancelado
          }
        }
      }
    default:
      return state;
  }
}
