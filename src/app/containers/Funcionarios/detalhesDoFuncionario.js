import React from 'react';
import Titulo from '../../components/Texto/Titulo';
import { TextoDados } from '../../components/Texto/Dados';
import InputValor from '../../components/Inputs/InputValor';
import Voltar from '../../components/Links/Voltar';
import moment from 'moment'
import { connect } from 'react-redux';
import * as actions from '../../actions/alunos';
import AlertGeral from '../../components/Alert/Geral'

class DetalhesDoAluno extends React.Component {

  generateStateFuncionario = (props) => ({
    nome: props.funcionario ? props.funcionario.nome : '',
    cargo: props.alunos ? props.alunos.cargo : '',
  })

  constructor(props) {
    super();
    this.state = {
      ...this.generateStateFuncionario(props),
      aviso: null,
      erros: {}
    }
  }

  cleanAlert = () => this.setState({ aviso: null })

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.funcionario && this.props.funcionario) ||
      (prevProps.funcionario && this.props.funcionario && prevProps.funcionario.updatedAt !== this.props.funcionario.updatedAt)
    )
      this.setState(this.generateStateFuncionario(this.props))
  }

  handleSubmit = (field, value) => {
    this.setState({ [field]: value }, () => this.validate())
  }

  renderCabecalho() {
    const { nome } = this.state;
    const { funcionario } = this.props.history;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome} />
        </div>
      </div>
    )
  }

  renderDetalhesCadastro() {
    const { funcionario, history } = this.props.history;
    return (
      <div className='Detalhes-do-Cadastro'>
        <TextoDados
          chave='Nome'
          valor={funcionario ? funcionario.nome : ''} />
        <TextoDados
          chave='Série'
          valor={funcionario ? funcionario.cargo : ''} />
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

export default connect(mapStateToProps, actions)(DetalhesDoAluno)
