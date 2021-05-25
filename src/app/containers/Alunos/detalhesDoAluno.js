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

  generateStateAluno = (props) => ({
    nome: props.aluno ? props.aluno.nome : '',
    serie: props.alunos ? props.alunos.serie : '',
    turma: props.alunos ? props.alunos.turma : '',
    dataNascimento: props.alunos ? moment(props.alunos.dataDeNascimento).format('DD/MM/YYYY') : '',
    mae: props.alunos ? props.alunos.mae : '',
    pai: props.alunos ? props.alunos.pai : '',
    responsavel: props.alunos ? props.alunos.responsavel : '',
    cpf_filiacao1: props.alunos ? props.alunos.cpf_filiacao1 : '',
    cpf_filiacao2: props.alunos ? props.alunos.cpf_filiacao2 : '',
    status_matricula: props.alunos ? props.alunos.status_matricula : '',
  })

  constructor(props) {
    super();
    this.state = {
      ...this.generateStateAluno(props),
      aviso: null,
      erros: {}
    }
  }

  cleanAlert = () => this.setState({ aviso: null })

  componentDidUpdate(prevProps) {
    if (
      (!prevProps.aluno && this.props.aluno) ||
      (prevProps.aluno && this.props.aluno && prevProps.aluno.updatedAt !== this.props.aluno.updatedAt)
    )
      this.setState(this.generateStateAluno(this.props))
  }

  handleSubmit = (field, value) => {
    this.setState({ [field]: value }, () => this.validate())
  }

  renderCabecalho() {
    const { nome } = this.state;
    const { aluno } = this.props.history;
    return (
      <div className='flex'>
        <div className='flex-1 flex'>
          <Titulo tipo='h1' titulo={nome} />
        </div>
      </div>
    )
  }

  renderDetalhesCadastro() {
    const { aluno, history } = this.props.history;
    return (
      <div className='Detalhes-do-Cadastro'>
        <TextoDados
          chave='Nome'
          valor={aluno ? aluno.nome : ''} />
        <TextoDados
          chave='Data de Nascimento'
          valor={aluno ? moment(aluno.nome).format('DD/MM/YYYY') : ''} />
        <TextoDados
          chave='Série'
          valor={aluno ? aluno.serie : ''} />
        <TextoDados
          chave='Turma'
          valor={aluno ? aluno.turma : ''} />
        <TextoDados
          chave='Responsável'
          valor={aluno ? aluno.responsavel : ''} />
        <TextoDados
          chave='Mãe'
          valor={aluno ? aluno.mae : ''} />
        <TextoDados
          chave='Pai'
          valor={aluno ? aluno.pai : ''} />
        <TextoDados
          chave='CPF Filiação 1'
          valor={aluno ? aluno.cpf_filiacao1 : ''} />
        <TextoDados
          chave='CPF Filiação 2'
          valor={aluno ? aluno.cpf_filiacao2 : ''} />
        <TextoDados
          chave='Status da Matrícula'
          valor={aluno ? aluno.status_matricula : ''} />
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
