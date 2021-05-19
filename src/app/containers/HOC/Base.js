import React from 'react';
import Base from '../Base';

const base = Component => {
  class ComponentBase extends React.Component {

    componentDidMount() {
      const { getUser, authorized, history, usuario } = this.props;
      getUser();
      if (!authorized || !usuario || !usuario.role.includes('adm')) history.replace('/login');
    }
    componentDidUpdate(prevProps) {
      const { history } = this.props;
      if (!this.props.authorized ||
        !this.props.usuario ||
        !this.props.usuario.role.includes('adm')) {
        history.replace('/login');
      }

    }

    render() {
      return (
        <Base history={this.props.history}>
          <Component {...this.props} />
        </Base>
      )
    }
  }
}


