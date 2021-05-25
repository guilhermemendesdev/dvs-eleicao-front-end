import React, { Component } from 'react';

import DetalhesDoChapa from './detalhesDaChapa'
//import DetalhesDosPedidos from './detalhesDosPedidos'

import { connect } from 'react-redux';
import * as actions from '../../actions/chapas';

class Chapa extends Component {

  getChapa() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getChapa(id, usuario._id)
  }

  componentDidMount() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getChapa(id, usuario._id)

  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getChapa()
  }

  componentWillUnmount() {
    this.props.limparChapa();
  }

  render() {
    return (
      <div className='Funcionário full-width flex vertical'>
        <div className='Card'>
          <DetalhesDoChapa history={this.props} />
        </div>
        {/* <div className='Sub-Card'>
          <DetalhesDosPedidos id={this.props.match.params.id} />
        </div> */}
      </div>

    )
  }
}

const mapStateToProps = state => ({
  chapa: state.chapas.chapa,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Chapa)
