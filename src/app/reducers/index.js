import { combineReducers } from 'redux';

import authReducer from './auth_reducer';
import alunoReducer from './aluno_reducer';
import funcionarioReducer from './funcionario_reducer';
import chapaReducer from './chapa_reducer';
import candidatoReducer from './candidato_reducer';

const reducers = combineReducers({
  auth: authReducer,
  alunos: alunoReducer,
  funcionarios: funcionarioReducer,
  chapas: chapaReducer,
  candidatos: candidatoReducer,
});

export default reducers;
