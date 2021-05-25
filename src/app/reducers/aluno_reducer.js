import { GET_ALUNOS, GET_ALUNO, LIMPAR_ALUNO, CANCELAR_ALUNO } from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ALUNOS:
      return {
        ...state,
        alunos: action.payload.alunos
      }
    case GET_ALUNO:
      return {
        ...state,
        aluno: action.payload.aluno
      }
    case LIMPAR_ALUNO:
      return {
        ...state,
        aluno: null
      }
    case CANCELAR_ALUNO:
      return {
        ...state,
        aluno: {
          ...state.aluno,
          aluno: {
            ...state.aluno.aluno,
            cancelado: action.payload.cancelado
          }
        }
      }
    default:
      return state;
  }
}
