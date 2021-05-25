import React from 'react';
import Titulo from '../../components/Texto/Titulo';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';
import Voltar from '../../components/Links/Voltar';
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../../actions/alunos';
import AlertGeral from '../../components/Alert/Geral'

class DetalhesDaChapa extends React.Component {

  generateStateChapa = (props) => ({
    nome: props.chapa ? props.chapa.nome : '',
    numero: props.chapa ? props.chapa.numero : '',
  })

  constructor(props) {
    super();
    this.state = {
      ...this.generateStateChapa(props),
      aviso: null,
      erros: {}
    }
  }

  cleanAlert = () => this.setState({ aviso: null })

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.chapa && this.props.chapa) ||
      (prevProps.chapa && this.props.chapa && prevProps.chapa.updatedAt !== this.props.chapa.updatedAt)
    )
      this.setState(this.generateStateChapa(this.props))
  }

  handleSubmit = (field, value) => {
    this.setState({ [field]: value }, () => this.validate())
  }

  renderCabecalho() {
    const { nome } = this.state;
    const { chapa } = this.props.history;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome} />
        </div>
      </div>
    )
  }

  renderDetalhesCadastro() {
    const { chapa, history } = this.props.history;
    return (
      <div className='Detalhes-do-Cadastro'>
        <TextoDados
          chave='Nome'
          valor={chapa ? chapa.nome : ''} />
        <TextoDados
          chave='Número'
          valor={chapa ? chapa.numero : ''} />
      </div>
    )
  }

  render() {
    const { history } = this.props.history;
    return (
      <div className='DetalhesDoCliente'>
        <Voltar history={history} />
        {this.renderCabecalho()}
        <AlertGeral aviso={this.state.aviso} />
        <div className='flex horizontal'>
          <div className='flex-1 flex vertical'>
            {this.renderDetalhesCadastro()}
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = state => ({
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(DetalhesDaChapa)
