import React, { Component } from 'react';

import DetalhesDoFuncionario from './detalhesDoFuncionario'
//import DetalhesDosPedidos from './detalhesDosPedidos'

import { connect } from 'react-redux';
import * as actions from '../../actions/funcionarios';

class Funcionario extends Component {

  getFuncionario() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getFuncionario(id, usuario._id)
  }

  componentDidMount() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getFuncionario(id, usuario._id)

  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getFuncionario()
  }

  componentWillUnmount() {
    this.props.limparFuncionario();
  }

  render() {
    return (
      <div className='Funcionário full-width flex vertical'>
        <div className='Card'>
          <DetalhesDoFuncionario history={this.props} />
        </div>
        {/* <div className='Sub-Card'>
          <DetalhesDosPedidos id={this.props.match.params.id} />
        </div> */}
      </div>

    )
  }
}

const mapStateToProps = state => ({
  funcionario: state.funcionarios.funcionario,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Funcionario)
