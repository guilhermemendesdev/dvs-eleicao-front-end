import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { HashRouter as Router, Route } from 'react-router-dom'

import base from './containers/HOC/Base';
import noAuth from './containers/HOC/NoAuth';

import { initApp } from './actions'

// CONTAINER COM BASE
import Home from './containers/Home'
import Login from './containers/Login'
import IndexAdm from './containers/Adm'
import Alunos from './containers/Alunos';
import ShowAlunos from './containers/Alunos/show';
import Funcionarios from './containers/Funcionarios';
import ShowFuncionarios from './containers/Funcionarios/show';
import Chapas from './containers/Chapas';
import ShowChapas from './containers/Chapas/show';
import NovaChapas from './containers/Chapas/store';
import Candidatos from './containers/Candidatos';
import ShowCandidatos from './containers/Candidatos/show';
import NovoCandidatos from './containers/Candidatos/store';

export default class App extends Component {

  componentDidMount() {
    initApp();
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route path={'/'} exact component={noAuth(Home)} />
            <Route path={'/login'} exact component={noAuth(Login)} />
            <Route path={'/adm'} exact component={base(IndexAdm)} />
            <Route path={'/alunos'} exact component={base(Alunos)} />
            <Route path={'/alunos/:id'} exact component={base(ShowAlunos)} />
            <Route path={'/funcionarios'} exact component={base(Funcionarios)} />
            <Route path={'/funcionarios/:id'} exact component={base(ShowFuncionarios)} />
            <Route path={'/chapas'} exact component={base(Chapas)} />
            <Route path={'/chapas/:id'} exact component={base(ShowChapas)} />
            <Route path={'/chapas/store/adm'} exact component={base(NovaChapas)} />
            <Route path={'/candidatos'} exact component={base(Candidatos)} />
            <Route path={'/candidatos/:id'} exact component={base(ShowCandidatos)} />
            <Route path={'/candidatos/store/adm'} exact component={base(NovoCandidatos)} />
            {/* <Route path={'/pedido/:id'} exact component={base(Pedido)} />

          <Route path={'/clientes'} exact component={base(Clientes)} />
          <Route path={'/cliente/:id'} exact component={base(Cliente)} />

          <Route path={'/categorias'} exact component={base(Categorias)} />
          <Route path={'/categorias/nova'} exact component={base(NovaCategorias)} />
          <Route path={'/categoria/:id'} exact component={base(Categoria)} />

          <Route path={'/produtos'} exact component={base(Produtos)} />
          <Route path={'/produtos/novo'} exact component={base(NovoProduto)} />
          <Route path={'/produto/:id'} exact component={base(Produto)} />
          <Route path={'/avaliacoes/:id'} exact component={base(Avaliacoes)} />
          <Route path={'/avaliacao/:id'} exact component={base(Avaliacao)} />

          <Route path={'/configuracoes'} exact component={base(Configuracoes)} />
          <Route path={'/perfil'} exact component={base(Perfil)} />
          <Route path={'/login'} exact component={noAuth(Login)} />
          <Route path={'/recuperar-senha'} exact component={noAuth(RecuperarSenha)} />
          <Route path={'/resetar-senha/:token'} exact component={noAuth(ResetarSenha)} /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}
