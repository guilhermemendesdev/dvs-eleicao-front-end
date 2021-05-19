import React, { Component } from 'react';
export default class Footer extends Component {
  render() {
    return (

      <footer class="footer-pma">
        <div class="copy">
          <div class="faixa-footer"></div>
          <div class="text-center">
            <div class="Footer-Container flex horizontal">
              <div class="flex-1">
                <img class="img-responsive" alt="logosocial" src="https://cdn.anapolis.go.gov.br/img/logos/sem_fundo/brancas/saude.png" style={{ margin: "15px", width: "80%" }} />
              </div>
              <div class="flex-1" style={{ alignSelf: 'center' }}>
                <p class="text-center col-md-12" >© Copyright 2021 | #IMUNIZAANÁPOLIS - Todos os Direitos Reservados<br />
                  <span >Secretaria de Comunicação, Eventos e Modernização</span><br />
                  <span >Diretoria de Sistemas</span>
                </p>
              </div>
              <div class="flex-1" style={{ alignSelf: 'center' }}>
                <p>
                  <b>Endereço</b>: R. Prof. Roberto Mange, 152<br />Centro - Anápolis - GO<br />Fone: (62)3902-2560
               </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
