import React from "react";
import { navigate } from "gatsby";
import { handleLogin, isAuthenticated } from "~services/auth";

import LoginDialog from '~components/LoginDialog';

class Login extends React.Component {
  state = {
    password: ``
  }
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleSubmit = event => {
    event.preventDefault()
    handleLogin(this.state)
  }
  render() {
    if (isAuthenticated()) {
      navigate(`/work`)
    }
    return <LoginDialog
      isOpen={true}
      redirectPath={'/work'}
    />
  }
}
export default Login;
