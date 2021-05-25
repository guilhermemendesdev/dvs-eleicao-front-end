import React, { Component } from 'react';

import DetalhesDoAluno from './detalhesDoAluno'
//import DetalhesDosPedidos from './detalhesDosPedidos'

import { connect } from 'react-redux';
import * as actions from '../../actions/alunos';

class Aluno extends Component {

  getAluno() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getAluno(id, usuario._id)
  }

  componentDidMount() {
    const { usuario } = this.props;
    const { id } = this.props.match.params;
    if (!usuario) return null
    this.props.getAluno(id, usuario._id)

  }

  componentDidUpdate(prevProps) {
    if (!prevProps.usuario && this.props.usuario) this.getAluno()
  }

  componentWillUnmount() {
    this.props.limparAluno();
  }

  render() {
    return (
      <div className='Aluno full-width flex vertical'>
        <div className='Card'>
          <DetalhesDoAluno history={this.props} />
        </div>
        {/* <div className='Sub-Card'>
          <DetalhesDosPedidos id={this.props.match.params.id} />
        </div> */}
      </div>

    )
  }
}

const mapStateToProps = state => ({
  aluno: state.alunos.aluno,
  usuario: state.auth.usuario
})

export default connect(mapStateToProps, actions)(Aluno)
