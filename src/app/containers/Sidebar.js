import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Siderbar extends Component {

  renderMenuNoAuth() {
    return (
      <div class="col-sm-12 col-md-12" style={{ textAlign: 'center' }}>
        <div class="links">
          <Link to='/login'>Acesso</Link>
        </div>
      </div>
    )
  }

  render() {

    return (
      <div className="header_index">
        <header class="header">
          <div class="top-head">
            <div class="container">
              <div class="row">
                {this.renderMenuNoAuth()}
              </div>
            </div>
          </div>
          <div class="faixa-menu"></div>
          <div id="main-nav" class="">
            <div class="text-center col-md-12">
              <nav class="navbar-pma  navbar-expand-lg navbar-light navbar navbar-expand-lg navbar-light bg-light">
                <a href="/Inicio" class="navbar-brand logoPInicial navbar-brand">
                  <img alt="logoNova" class="logoNova" src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/azuis/saude.png" />
                </a>
              </nav>
            </div>
          </div>
          <div class="login-content pt-4 pb-4" style={{ textAlignLast: "center" }}>
            <div class="col-md-12">
              <div class="row align-content-center">
                <div class="col-sm-12">
                  <div class="msg-login">
                    <h6>Se você é funcionario, clique para fazer login.</h6>
                    <Link class="col-md-4 pv-btn pv-btn-block pv-btn-primary button-acessar" style={{ color: "rgb(255, 255, 255)" }} to='/login'>Acesso</Link>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    )
  }
}