import React, { Component } from 'react';
import moment from 'moment';
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'
import Tabela from '../../components/Tabela/Simples'
import Paginacao from '../../components/Paginacao/Simples'

import { connect } from 'react-redux';
import * as actions from '../../actions/alunos'
import { formatMoney } from '../../actions'

class Alunos extends Component {
  state = {
    pesquisa: '',
    atual: 0,
    limit: 15
  }

  getAlunos() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id

    this.props.getAlunos(zona, atual, limit);
  }

  componentDidMount() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id
    this.props.getAlunos(zona, atual, limit);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getAlunos()
  }

  handleSubmitPesquisa() {
    this.setState({ atual: 0 }, () => {
      const { atual, limit, pesquisa } = this.state;
      const { usuario } = this.props;
      if (!usuario) return null;
      const zona = usuario._id
      if (pesquisa) this.props.getAlunosPesquisa(pesquisa, zona, atual, limit);
      else this.props.getAlunos(zona, atual, limit);
    })
  }

  onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value })
  changeNumeroAtual = (atual) => {
    this.setState({ atual }, () => {
      this.getAlunos()
    })
  }
  render() {
    const { pesquisa } = this.state;
    const { alunos } = this.props;
    const dados = [];
    (alunos ? alunos.docs : []).forEach((item) => {
      dados.push({
        'Nome': item ? item.nome : '',
        'Série': item ? item.serie : '',
        'Turma': item ? item.turma : '',
        'Data de Nascimento': moment(item.dataNascimento).format('DD/MM/YYYY'),
        'Responsável': item ? item.responsavel : '',
        'botaoDetalhes': `/alunos/${item._id}`
      })
    });
    console.log(this.props.alunos);
    return (
      <div className="Alunos full-width">
        <div className='Card'>
          <Titulo tipo="h1" titulo="Alunos" />
          <br />
          <Pesquisa
            valor={pesquisa}
            placeholder={'Pesquise aqui pelo nome do cliente.'}
            onChange={(ev) => this.onChangePesquisa(ev)}
            onClick={() => this.handleSubmitPesquisa()} />
          <br />
          <Tabela
            cabecalho={['Nome', 'Série', 'Turma', 'Data de Nascimento', 'Responsável']}
            dados={dados} />
          <Paginacao
            atual={this.state.atual}
            total={this.props.alunos ? this.props.alunos.total : 0}
            limite={this.state.limit}
            onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  alunos: state.alunos.alunos,
  usuario: state.auth.usuario
})
export default connect(mapStateToProps, actions)(Alunos)
