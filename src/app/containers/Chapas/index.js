import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom'
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'
import Tabela from '../../components/Tabela/Simples'
import Paginacao from '../../components/Paginacao/Simples'

import { connect } from 'react-redux';
import * as actions from '../../actions/chapas'
import { formatMoney } from '../../actions'

class Chapas extends Component {
  state = {
    pesquisa: '',
    atual: 0,
    limit: 15
  }

  getChapas() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id

    this.props.getChapas(zona, atual, limit);
  }

  componentDidMount() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id
    this.props.getChapas(zona, atual, limit);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getChapas()
  }

  handleSubmitPesquisa() {
    this.setState({ atual: 0 }, () => {
      const { atual, limit, pesquisa } = this.state;
      const { usuario } = this.props;
      if (!usuario) return null;
      const zona = usuario._id
      if (pesquisa) this.props.getChapasPesquisa(pesquisa, zona, atual, limit);
      else this.props.getChapas(zona, atual, limit);
    })
  }

  onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value })
  changeNumeroAtual = (atual) => {
    this.setState({ atual }, () => {
      this.getChapas()
    })
  }
  render() {
    const { pesquisa } = this.state;
    const { chapas } = this.props;
    const dados = [];
    console.log(this.props);

    (chapas ? chapas : []).forEach((item) => {
      dados.push({
        'Nome': item ? item.nome : '',
        'Número': item ? item.numero : '',
        'botaoDetalhes': `/chapas/${item._id}`
      })
    });
    return (
      <div className="Chapas full-width">
        <div className='Card'>
          <Titulo tipo="h1" titulo="Chapas" />
          <br />
          <Pesquisa
            valor={pesquisa}
            placeholder={'Pesquise aqui pelo nome do cliente.'}
            onChange={(ev) => this.onChangePesquisa(ev)}
            onClick={() => this.handleSubmitPesquisa()} />
          <br />
          <Link to='/chapas/store/adm'>Nova Chapa</Link>
          <Tabela
            cabecalho={['Nome', 'Número']}
            dados={dados} />
          <Paginacao
            atual={this.state.atual}
            total={this.props.chapas ? this.props.chapas.total : 0}
            limite={this.state.limit}
            onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  chapas: state.chapas.chapas,
  usuario: state.auth.usuario
})
export default connect(mapStateToProps, actions)(Chapas)
