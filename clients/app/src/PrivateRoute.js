import React, { Component } from "react";
import { Route, Redirect } from "react-router";
import Landing from "./components/landing/Landing";
import { withAuth } from "./Context";
import { ROUTES } from "./constants";

class PrivateRoute extends Component {
  render() {
    if (this.props.token) {
      return <Route {...this.props} />;
    }
    return <Redirect to={ROUTES.home} />;
  }
}

export default withAuth(PrivateRoute);
