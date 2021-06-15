import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'
import Tabela from '../../components/Tabela/Simples'
import Paginacao from '../../components/Paginacao/Simples'

import { connect } from 'react-redux';
import * as actions from '../../actions/candidatos'
import { formatMoney } from '../../actions'

class Candidatos extends Component {
  state = {
    pesquisa: '',
    atual: 0,
    limit: 15
  }

  async getCandidatos() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id
    await this.props.getCandidatos(zona, atual, limit);
  }

  componentDidMount() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id
    this.getCandidatos(zona, atual, limit);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getCandidatos()
  }

  handleSubmitPesquisa() {
    this.setState({ atual: 0 }, () => {
      const { atual, limit, pesquisa } = this.state;
      const { usuario } = this.props;
      if (!usuario) return null;
      const zona = usuario._id
      if (pesquisa) this.props.getCandidatosPesquisa(pesquisa, zona, atual, limit);
      else this.props.getCandidatos(zona, atual, limit);
    })
  }

  onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value })
  changeNumeroAtual = (atual) => {
    this.setState({ atual }, () => {
      this.getCandidatos()
    })
  }
  render() {
    const { pesquisa } = this.state;
    const { candidatos } = this.props;
    const dados = [];

    (candidatos ? candidatos.docs : []).forEach((item) => {
      dados.push({
        'Nome': item ? item.nome : '',
        'CPF': item ? item.cpf : '',
        'Telefone': item ? item.telefone : '',
        'Cargo': item ? item.cargo : '',
        'botaoDetalhes': `/candidatos/${item._id}`
      })

    });

    return (
      <div className="Candidatos full-width">
        <div className='Card'>
          <Titulo tipo="h1" titulo="Candidatos" />
          <br />
          <Pesquisa
            valor={pesquisa}
            placeholder={'Pesquise aqui pelo nome do cliente.'}
            onChange={(ev) => this.onChangePesquisa(ev)}
            onClick={() => this.handleSubmitPesquisa()} />
          <br />
          <Link to='/candidatos/store/adm'>Novo Candidato</Link>
          <Tabela
            cabecalho={['Nome', 'CPF', 'Telefone', 'Cargo']}
            dados={dados} />
          <Paginacao
            atual={this.state.atual}
            total={this.props.candidatos ? this.props.candidatos.total : 0}
            limite={this.state.limit}
            onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  candidatos: state.candidatos.candidatos,
  usuario: state.auth.usuario
})
export default connect(mapStateToProps, actions)(Candidatos)
