import React, { Component } from "react";
import { navigate } from "gatsby";

import { isAuthenticated } from "~services/auth"

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isAuthenticated() && location.pathname !== `/login`) {
    navigate("/login")
    return null
  }
  return <Component {...rest} />
}

export default PrivateRoute;
