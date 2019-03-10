import React, { Component } from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import { ROUTES } from './routes'
import CssBaseline from '@material-ui/core/CssBaseline'; //normalize.css
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MainView from './Main'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginView from './components/auth/Login'
import SignUpView from './components/auth/SignUp'
import OnBoardingView from './components/auth/OnBoarding'
import GroupView from './components/dashboards/Group'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1D65A6',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Router>
            <React.Fragment>
              <Route exact path={ROUTES.home} component={MainView} />
              <Route path={ROUTES.login} component={LoginView} />
              <Route path={ROUTES.signUp} component={SignUpView} />
              <Route path={ROUTES.onboarding} component={OnBoardingView} />
              <Route path={ROUTES.group} component={GroupView} />
            </React.Fragment>
          </Router>
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
