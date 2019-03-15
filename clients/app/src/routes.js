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
import Payment from "./components/payment/Payment";
import Dashboard from "./components/dashboards/Dashboard";
import Calendar from "./components/dashboards/calendar/Calendar";
import PrivateRoute from "./PrivateRoute";

class Routes extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path={ROUTES.home} component={MainView} />
          <Route path={ROUTES.login} component={LoginView} />
          <Route path={ROUTES.signUp} component={SignUpView} />
          <PrivateRoute path={ROUTES.onboarding} component={OnBoardingView} />
          <PrivateRoute path={ROUTES.dashboard} component={Dashboard} />
          <PrivateRoute path={ROUTES.group} component={GroupView} />
          <PrivateRoute path={ROUTES.groups} component={GroupsView} />
          <PrivateRoute path={ROUTES.calendar} component={Calendar} />
          <PrivateRoute path={ROUTES.payment} component={Payment} />
          <PrivateRoute path={ROUTES.home} component={MainView} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Routes;
