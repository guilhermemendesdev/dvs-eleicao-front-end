import React, { Component } from 'react';

import DetalhesDoCandidato from './detalhesDoCandidato'
//import DetalhesDosPedidos from './detalhesDosPedidos'

import { connect } from 'react-redux';
import * as actions from '../../actions/candidatos';

class Candidato extends Component {

  getCandidato() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getCandidato(id, usuario._id)
  }

  componentDidMount() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getCandidato(id, usuario._id)

  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getCandidato()
  }

  componentWillUnmount() {
    this.props.limparCandidato();
  }

  render() {
    return (
      <div className='Candidato full-width flex vertical'>
        <div className='Card'>
          <DetalhesDoCandidato history={this.props} />
        </div>
        {/* <div className='Sub-Card'>
          <DetalhesDosPedidos id={this.props.match.params.id} />
        </div> */}
      </div>

    )
  }
}

const mapStateToProps = state => ({
  candidato: state.candidatos.candidato,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Candidato)
