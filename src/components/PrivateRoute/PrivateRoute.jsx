import React, { Component } from "react";

import LoginDialog from "~components/LoginDialog";

import { setAuthStateObservers } from "~services/auth";

import './PrivateRoute.scss';

const Checking = () => {
  return(
    <div className="private-route__loader"><i className="fal fa-spin fa-spinner" /></div>
  );
}

class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authState: 'checking'
    }
    setAuthStateObservers(
      () => { this.setState({ authState: 'loggedIn' }) },
      () => { this.setState({ authState: 'loggedOut' }) }
    );
  }

  render() {
    const { component: PathComponent, location, ...rest } = this.props;

    return(
      <Choose>
        <When condition={this.state.authState === 'checking'}>
          <Checking />
        </When>
        <When condition={this.state.authState === 'loggedIn'}>
          <PathComponent {...rest} />
        </When>
        <When condition={this.state.authState === 'loggedOut'}>
          <LoginDialog redirectPath={location.pathname} />
        </When>
      </Choose>
    );
  }
}

export default PrivateRoute;
