import React, { Component } from "react";
import { Route } from "react-router";
import LoginView from "./components/auth/Login";
import { withAuth } from "./Context";

class PrivateRoutes extends Component {
  render() {
    if (this.props.token) {
      return <Route {...this.props} />;
    }
    return <LoginView />;
  }
}

export default withAuth(PrivateRoutes);
