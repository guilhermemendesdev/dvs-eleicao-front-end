import React, { Component } from 'react'
import InputMaterial from '../../components/Inputs/Material'
import ButtonSimples from '../../components/Button/Simples'
import Checkbox from '../../components/Inputs/Checkbox';
import ModalSimples from '../../components/Modal/Simples';

import { connect } from 'react-redux';
import * as actions from '../../actions/'
import { api, versao } from '../../config'

class Login extends Component {
  state = {
    inep: '',
    password: '',
    opcaoLembrar: true,
    erros: {},
    registrarSenha: false
  }

  componentDidMount() {
    this.props.getUser()
  }

  handleLogin() {
    const { inep, password, opcaoLembrar } = this.state;
    this.props.handleLogin({ inep, password, opcaoLembrar }, (error) => {
      this.setState({ erros: { ...this.state.erros, form: error }, registrarSenha: true })
    })
  }
  // validate() {
  //   const { inep, password } = this.state;
  //   const erros = {};
  //   if (!inep) erros.inep = 'Preencha aqui com seu inep'
  //   if (!password) erros.password = 'Preencha aqui com sua senha'
  //   this.setState({ erros });
  //   return !(Object.keys(erros).length > 0);
  // }
  onChangeInput = (field, ev) => {
    this.setState({ [field]: ev })
  }
  onChangeCheckBox = (field) => this.setState({ [field]: !this.state[field] })

  render() {
    const { inep, password, opcaoLembrar, erros, registrarSenha } = this.state;
    console.log(erros)
    return (
      <div>
        <legend className='card-header text-left legend-pma faq-btn-link'>Informe suas credenciais</legend>
        <div className='Login flex vertical'>
          <InputMaterial
            label='Inep *'
            value={inep}
            onChange={(ev) => this.onChangeInput('inep', ev.target.value)} />
          <InputMaterial
            label='Senha *'
            value={password}
            error={erros.password}
            onChange={(ev) => this.onChangeInput('password', ev.target.value)} />
          <br />
          <div className='flex horizontal'>
            <div className='flex-1'>
              <Checkbox
                value={opcaoLembrar}
                onChange={(e) => this.onChangeCheckBox('opcaoLembrar')}
                label='Lembar?' />
            </div>
            <div className='flex-1 flex flex-end'>
              {/* <Link to='/recuperar-senha'><smal>Esqueceu sua senha?</smal></Link> */}
              <a href={`${api}/${versao}/api/usuarios/recuperar-senha`}>
                <small>Esqueceu sua senha?</small>
              </a>
            </div>
          </div>
          <br />

          <ButtonSimples
            label='Acessar'
            type='acessar'
            onClick={() => this.handleLogin()} />
        </div>
        {registrarSenha === true && <ModalSimples
          titulo='Cria sua senha'
          inep={inep}
          descricao='Digite abaixo a sua nova senha de acesso ao sistema' />}
      </div>
    )
  }

}

export default connect(null, actions)(Login);