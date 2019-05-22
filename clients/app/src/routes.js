import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Route, Switch } from 'react-router';
import { ROUTES } from './constants';

import MainView from './components/MainView';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginView from './components/auth/Login';
import SignUpView from './components/auth/SignUp';
import OnBoardingView from './components/onboarding/OnBoarding';
import GroupView from './components/dashboards/Group';
import GroupsView from './components/dashboards/Groups';
import Payment from './components/payment/Payment';
import Dashboard from './components/dashboards/Dashboard';
import Calendar from './components/dashboards/calendar/Calendar';
import Profile from './components/profile/Profile';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from './components/dashboards/admin/AdminDashboard';

const drawerWidth = 240;

const styles = theme => ({
  content: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
  },
  marginLeft: {
    marginLeft: 240
  },
  marginNone: {
    margin: 0
  }
});
class Routes extends Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Header />
        <div
          className={classNames(classes.content, {
            [classes.marginLeft]: this.props.drawerOpen,
            [classes.marginNone]: !this.props.drawerOpen
          })}
        >
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
            <PrivateRoute path={ROUTES.profile} component={Profile} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Routes);
