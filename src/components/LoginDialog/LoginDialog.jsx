import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import classnames from 'classnames';

import { handleLogin, isAuthenticated } from "~services/auth";
import Link from "~components/Link";
import Button from "~components/Button";

import './LoginDialog.scss';

class LoginDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      checkingLogin: false,
      position: undefined,
      didError: false
    }

    this.submitLogin = this.submitLogin.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);

    this.inputRef = React.createRef();
  }

  onSuccess(userInfo) {
    this.setState({ checkingLogin: false, password: '' })
    navigate(this.props.redirectPath);
  }

  onFailure(error) {
    console.error(error.message, error.code);
    this.setState({ didError: true, password: '', checkingLogin: false });
  }

  submitLogin() {
    this.setState({ checkingLogin: true }, () => {
      handleLogin(this.state.password, this.onSuccess, this.onFailure);
    });
  }

  componentDidMount() {
    if (this.inputRef && this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  render() {

    return (
      <div
        className={
          classnames(
            'login-dialog',
            {
              'login-dialog--open': this.state.position === 'open',
              'login-dialog--closed': this.state.position === 'closed'
            }
          )
        }
      >
        <div className="login-dialog__screen">
          <div className="login-dialog__content">
            <h4 className="invert monospace">Password Required</h4>
            <p className="invert">I’ve worked hard to keep most of my site's content open to the public, but sometimes it’s just not possible.</p>
            <p className="invert">If you received a password for this site, enter it here and keep on browsing.</p>
            <p className="invert">If you don’t have the passsword but would like it, please email me at <Link invert href="mailto:alex@alexhadik.com">alex@alexhadik.com</Link>.</p>
            <form className="login-dialog__input-box">
              <input
                className="login-dialog__input"
                type="password"
                name="password"
                placeholder="password"
                ref={this.inputRef}
                value={this.state.password}
                onChange={(event) => { this.setState({ password: event.target.value }); }}
              />
              <Choose>
                <When condition={this.state.checkingLogin}>
                  <i className="fal fa-spin fa-spinner invert" />
                </When>
                <Otherwise>
                  <button
                    className="login-dialog__submit"
                    type="submit"
                    onClick={this.submitLogin}
                    onSubmit={this.submitLogin}
                  >
                    <i className="fal fa-arrow-right invert" />
                  </button>
                </Otherwise>
              </Choose>
            </form>
            <p className="caption invert login-dialog__status-message">
              {this.state.didError && 'Incorrect password.'}
            </p>
            <Button variant="white" iconLeft="fal fa-arrow-left" to="/work">Back to Work</Button>
          </div>
        </div>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  redirectPath: PropTypes.string
}

export default LoginDialog;
