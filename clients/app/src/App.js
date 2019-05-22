import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import { AuthContext } from './Context';
import Footer from './components/Footer';
import Header from './components/Header';
import CssBaseline from '@material-ui/core/CssBaseline'; //normalize.css
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3f51b5', //'#ffa820', //
      light: '#5b92d8',
      dark: '#214788',
      contrastText: '#ffffff',
      text: '#fff'
    },
    secondary: {
      main: '#fe782d', //'#a7503a', //'#ffa820'
      dark: '#f19104', //#c67900',//
      light: '#ff9800',
      contrastText: '#ffffff',
      text: '#fff'
    },
    text: {
      secondary: '#000'
    },
    grey: {
      text: '#acbec5'
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: '25px'
      },
      contained: {
        boxShadow: 'none'
      }
    },
    MuiTypography: {
      h6: {}
    }
  }
});

const styles = theme => ({
  layout: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
  },
  content: {
    flex: 1
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem('auth'),
      currentUser: window.localStorage.getItem('userFirstname'),
      isAdmin: true,
      isEdit: false,
      showLoginButton: true,
      groupJoined: false,
      iconSpace: false,
      drawerOpen: true
    };
  }

  setToken = token =>
    this.setState({
      token,
      iconSpace: true
    });
  setUser = currentUser =>
    this.setState({
      currentUser
    });

  handleLogin = () => {
    this.props.history.push('/login');
  };

  goToLogin = () => {
    this.setState({ showLoginButton: false });
  };
  handleLogout = () => {
    window.localStorage.removeItem('auth');
    this.setState({ token: null, drawerOpen: false });
  };

  beginOnboarding = () => {
    this.setState({
      onboarding: true
    });
  };
  joinGroup = e => {
    e.preventDefault();
    console.log('Group joined');
    this.setState({ groupJoined: true });
  };

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true, iconSpace: false });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false, iconSpace: true });
  };

  handleEdit = val => {
    this.setState({
      isEdit: val
    });
  };
  render() {
    const { classes } = this.props;
    const {
      currentUser,
      isAdmin,
      isEdit,
      token,
      onboarding,
      showLoginButton,
      groupJoined,
      drawerOpen
    } = this.state;

    const iconSpace = token != null || this.state.iconSpace;

    return (
      <div className={classes.layout}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />

          <AuthContext.Provider
            value={{
              setUser: this.setUser,
              currentUser: currentUser,
              isAdmin: isAdmin,
              isEdit: isEdit,
              handleEdit: this.handleEdit,
              token: token,
              setToken: this.setToken,
              showLoginButton: showLoginButton,
              goToLogin: this.goToLogin,
              handleLogout: this.handleLogout,
              onboarding: onboarding,
              beginOnboarding: this.beginOnboarding,
              groupJoined: groupJoined,
              joinGroup: this.joinGroup,
              drawerOpen: drawerOpen,
              iconSpace: iconSpace,
              handleDrawerOpen: this.handleDrawerOpen,
              handleDrawerClose: this.handleDrawerClose
            }}
          >
            <div className={classes.content}>
              <Router>
                <Routes drawerOpen={drawerOpen} />
              </Router>
            </div>
            <Footer />
          </AuthContext.Provider>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
