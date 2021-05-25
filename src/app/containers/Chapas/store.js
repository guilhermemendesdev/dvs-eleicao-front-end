import React, { Component } from 'react';
import Titulo from '../../components/Texto/Titulo'
import ButtonSimples from '../../components/Button/Simples';
import InputSimples from '../../components/Inputs/Simples';
import Voltar from '../../components/Links/Voltar';
import AlertGeral from '../../components/Alert/Geral';
import { connect } from 'react-redux';
import * as actions from '../../actions/chapas'
import { formatMoney } from '../../actions'

class Store extends Component {
  state = {
    nome: '',
    erros: {},
    aviso: null,
    numero: 0,
  }

  validate = () => {
    const { nome, numero } = this.state;
    const erros = {};

    if (!nome) erros.nome = 'Preencha aqui com o nome da chapa.';
    if (!numero) erros.numero = 'Preencha aqui com o numero da chapa';

    this.setState({ erros });
    return !(Object.keys(erros).length > 0);
  }

  salvarChapa() {
    const { usuario } = this.props;
    if (!usuario) return null;
    if (!this.validate()) return null;
    this.props.salvarChapa(this.state, usuario._id, (error) => {
      this.setState({
        aviso: {
          status: !error,
          msg: error ? error.message : 'Chapa adicionada com sucesso!'
        }
      });
    });
  }

  renderCabecalho() {
    const { nome } = this.state;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome || 'Nova Chapa'} />
        </div>
        <div className='flex-1 flex flex-end'>
          <ButtonSimples onClick={() => this.salvarChapa()} type='success' label='Salvar' />
        </div>
      </div>
    )
  }

  onChangeInput = (field, value) => this.setState({ [field]: value }, () => this.validate())

  renderDados() {
    const { nome, numero, erros } = this.state;
    return (
      <div className='flex-2'>
        <InputSimples
          name='nome'
          label='Nome:'
          value={nome}
          error={erros.nome}
          onChange={(ev) => this.onChangeInput('nome', ev.target.value)} />
        <InputSimples
          name='numero'
          label='Número:'
          value={numero}
          error={erros.numero}
          onChange={(ev) => this.onChangeInput('numero', ev.target.value)} />
      </div>
    )
  }

  render() {
    return (
      <div className='Nova-Categoria full-width'>
        <div className='Card'>
          <Voltar history={this.props.history} />
          <AlertGeral aviso={this.state.aviso} />
          {this.renderCabecalho()}
          <div className='flex horizontal'>
            {this.renderDados()}
            <div className='flex-1'> </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Store)
