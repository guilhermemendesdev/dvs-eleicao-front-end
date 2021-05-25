import React from 'react';
import Titulo from '../../components/Texto/Titulo';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';
import Voltar from '../../components/Links/Voltar';
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../../actions/candidatos';
import AlertGeral from '../../components/Alert/Geral'

class DetalhesDoCandidato extends React.Component {

  generateStateCandidato = (props) => ({
    nome: props.candidato ? props.candidato.nome : '',
  })

  constructor(props) {
    super();
    this.state = {
      ...this.generateStateCandidato(props),
      aviso: null,
      erros: {}
    }
  }

  cleanAlert = () => this.setState({ aviso: null })

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.candidato && this.props.candidato) ||
      (prevProps.candidato && this.props.candidato && prevProps.candidato.updatedAt !== this.props.candidato.updatedAt)
    )
      this.setState(this.generateStateCandidato(this.props))
  }

  handleSubmit = (field, value) => {
    this.setState({ [field]: value }, () => this.validate())
  }

  renderCabecalho() {
    const { nome } = this.state;
    const { candidato } = this.props.history;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome} />
        </div>
      </div>
    )
  }

  renderDetalhesCadastro() {
    const { candidato, history } = this.props.history;
    console.log(candidato)
    return (

      <div className='flex horizontal'>
        <div style={{ marginRight: '50px' }}>
          <img src='http://localhost:3000/fotosCandidato/file-1621964774822.jpg' />
        </div>

        <div className='Detalhes-do-Cadastro'>
          <TextoDados
            chave='Nome'
            valor={candidato ? candidato.nome : ''} />
          <TextoDados
            chave='CPF'
            valor={candidato ? candidato.cpf : ''} />
          <TextoDados
            chave='E-mail'
            valor={candidato ? candidato.email : ''} />
          <TextoDados
            chave='Telefone'
            valor={candidato ? candidato.telefone : ''} />
          <TextoDados
            chave='Data de Nascimento'
            valor={candidato ? moment(candidato.dt_nascimento).format('DD/MM/YYYY') : ''} />
          <TextoDados
            chave='RG'
            valor={candidato ? candidato.rg : ''} />
          <TextoDados
            chave='Cargo'
            valor={candidato ? candidato.cargo : ''} />
          <TextoDados
            chave='Função'
            valor={candidato ? candidato.função : ''} />
          <TextoDados
            chave='Telefone'
            valor={candidato ? candidato.telefone : ''} />
          <TextoDados
            chave='Nome da chapa'
            valor={candidato ? candidato.chapa.nome : ''} />
          <TextoDados
            chave='Número da chapa'
            valor={candidato ? candidato.chapa.numero : ''} />
        </div>
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

export default connect(mapStateToProps, actions)(DetalhesDoCandidato)
