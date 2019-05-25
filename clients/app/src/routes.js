import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container } from 'react-grid-system';

import { Route, Switch } from 'react-router';
import { ROUTES } from './constants';

import MainView from './components/MainView';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginView from './components/auth/Login';
import SignUpView from './components/auth/SignUp';
import OnBoardingView from './components/onboarding/OnBoarding';
import GroupView from './components/dashboards/Group';
import Payment from './components/payment/Payment';
import Dashboard from './components/dashboards/Dashboard';
import Calendar from './components/dashboards/calendar/Calendar';
import Profile from './components/profile/Profile';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from './components/dashboards/admin/AdminDashboard';
import JoinGroup from './components/onboarding/JoinGroup';
import AdminMemberView from './components/dashboards/admin/AdminMemberView';

const drawerWidth = 240;

const styles = theme => ({
  content: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
  },
  marginLeft: {
    marginLeft: 240
  },
  marginNone: {
    // margin: 73
  }
});
class Routes extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path={ROUTES.home} component={MainView} />
          <Route path={ROUTES.login} component={LoginView} />
          <Route path={ROUTES.signUp} component={SignUpView} />
          <PrivateRoute path={ROUTES.joinGroup} component={JoinGroup} />
          <PrivateRoute path={ROUTES.onboarding} component={OnBoardingView} />
          <PrivateRoute path={ROUTES.dashboard} component={Dashboard} />
          <PrivateRoute path={ROUTES.group} component={GroupView} />
          <PrivateRoute path={ROUTES.calendar} component={Calendar} />
          <PrivateRoute path={ROUTES.payment} component={Payment} />
          <PrivateRoute path={ROUTES.profile} component={Profile} />
          <PrivateRoute
            path={ROUTES.adminMemberView}
            component={AdminMemberView}
          />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Routes);
