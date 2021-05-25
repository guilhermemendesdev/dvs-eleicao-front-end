import { GET_FUNCIONARIOS, GET_FUNCIONARIO, LIMPAR_FUNCIONARIO, CANCELAR_FUNCIONARIO } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_FUNCIONARIOS:
      return {
        ...state,
        funcionarios: action.payload.funcionarios
      }
    case GET_FUNCIONARIO:
      return {
        ...state,
        funcionario: action.payload.funcionario
      }
    case LIMPAR_FUNCIONARIO:
      return {
        ...state,
        funcionario: null
      }
    case CANCELAR_FUNCIONARIO:
      return {
        ...state,
        funcionario: {
          ...state.funcionario,
          funcionario: {
            ...state.funcionario.funcionario,
            cancelado: action.payload.cancelado
          }
        }
      }
    default:
      return state;
  }
}
