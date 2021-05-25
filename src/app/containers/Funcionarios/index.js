import React, { Component } from 'react';
import moment from 'moment';
import Titulo from '../../components/Texto/Titulo'
import Pesquisa from '../../components/Inputs/Pesquisa'
import Tabela from '../../components/Tabela/Simples'
import Paginacao from '../../components/Paginacao/Simples'

import { connect } from 'react-redux';
import * as actions from '../../actions/funcionarios'
import { formatMoney } from '../../actions'

class Funcionarios extends Component {
  state = {
    pesquisa: '',
    atual: 0,
    limit: 15
  }

  getFuncionarios() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id

    this.props.getFuncionarios(zona, atual, limit);
  }

  componentDidMount() {
    const { atual, limit } = this.state;
    const { usuario } = this.props;

    if (!usuario) return null;
    const zona = usuario._id
    this.props.getFuncionarios(zona, atual, limit);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getFuncionarios()
  }

  handleSubmitPesquisa() {
    this.setState({ atual: 0 }, () => {
      const { atual, limit, pesquisa } = this.state;
      const { usuario } = this.props;
      if (!usuario) return null;
      const zona = usuario._id
      if (pesquisa) this.props.getFuncionariosPesquisa(pesquisa, zona, atual, limit);
      else this.props.getFuncionarios(zona, atual, limit);
    })
  }

  onChangePesquisa = (ev) => this.setState({ pesquisa: ev.target.value })
  changeNumeroAtual = (atual) => {
    this.setState({ atual }, () => {
      this.getFuncionarios()
    })
  }
  render() {
    const { pesquisa } = this.state;
    const { funcionarios } = this.props;
    const dados = [];
    (funcionarios ? funcionarios.docs : []).forEach((item) => {
      dados.push({
        'Nome': item ? item.nome : '',
        'Cargo': item ? item.cargo : '',
        'botaoDetalhes': `/funcionarios/${item._id}`
      })
    });
    return (
      <div className="Funcionarios full-width">
        <div className='Card'>
          <Titulo tipo="h1" titulo="Funcionários" />
          <br />
          <Pesquisa
            valor={pesquisa}
            placeholder={'Pesquise aqui pelo nome do cliente.'}
            onChange={(ev) => this.onChangePesquisa(ev)}
            onClick={() => this.handleSubmitPesquisa()} />
          <br />
          <Tabela
            cabecalho={['Nome', 'Cargo']}
            dados={dados} />
          <Paginacao
            atual={this.state.atual}
            total={this.props.funcionarios ? this.props.funcionarios.total : 0}
            limite={this.state.limit}
            onClick={(numeroAtual) => this.changeNumeroAtual(numeroAtual)} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  funcionarios: state.funcionarios.funcionarios,
  usuario: state.auth.usuario
})
export default connect(mapStateToProps, actions)(Funcionarios)
