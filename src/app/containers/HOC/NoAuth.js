import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions'
import Sidebar from '../Sidebar'
import Footer from '../Footer'

const noAuth = Component => {
  class ComponentNoAuth extends React.Component {

    componentDidMount() {
      const { getUser, authorized, history, usuario } = this.props;
      getUser();
      if (authorized && usuario.role.includes('adm')) history.replace('/adm');
    }
    componentDidUpdate(prevProps) {
      const { authorized, history } = prevProps;
      if (!authorized && this.props.authorized && this.props.usuario.role.includes('adm')) history.replace('/adm');
    }

    render() {
      return (
        <div>
          <Sidebar />
          <Component {...this.props} />
          <Footer />
        </div>
      )
    }
  }

  const mapStateToProps = state => ({
    authorized: state.auth.authorized,
    usuario: state.auth.usuario
  });

  return connect(mapStateToProps, actions)(ComponentNoAuth)
}

export default noAuth;
