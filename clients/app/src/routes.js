import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { ROUTES } from "./constants";

import MainView from "./components/MainView";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginView from "./components/auth/Login";
import SignUpView from "./components/auth/SignUp";
import OnBoardingView from "./components/onboarding/OnBoarding";
import GroupView from "./components/dashboards/Group";
import GroupsView from "./components/dashboards/Groups";
import CreateGroup from "./components/forms/create_group";
import JoinGroup from "./components/forms/join_group";

import PrivateRoutes from "./PrivateRoutes";

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path={ROUTES.home} component={MainView} />
          <Route path={ROUTES.login} component={LoginView} />
          <Route path={ROUTES.signUp} component={SignUpView} />
          <Route path={ROUTES.onboarding} component={OnBoardingView} />
          <Route path={ROUTES.group} component={GroupView} />
          <Route path={ROUTES.groups} component={GroupsView} />
          <Route path={ROUTES.create_group} component={CreateGroup} />
          <Route path={ROUTES.join_group} component={JoinGroup} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Routes;
