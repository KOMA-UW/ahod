import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthContext } from "./Context";
import { API_URL, ROUTES } from "./constants";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline"; //normalize.css
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D65A6",
      light: "#5b92d8",
      dark: "#003b77",
      contrastText: "#ffffff",
      text: "#fff"
    },
    secondary: {
      main: "#a7503a",
      dark: "#732413",
      contrastText: "#ffffff",
      text: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const styles = theme => ({
  layout: {
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
  },
  content: {
    flex: 1
  }
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: window.localStorage.getItem("auth"),
      currentUser: {}
    };
  }

  setToken = token =>
    this.setState({
      token
    });
  setUser = currentUser =>
    this.setUser({
      currentUser
    });

  handleLogout = () => {
    window.localStorage.removeItem("auth");
    this.setState({ token: null });
  };

  beginOnboarding = () => {
    this.setState({
      onboarding: true
    });
  };
  render() {
    const { classes } = this.props;
    const { currentUser, token, onboarding } = this.state;
    return (
      <div className={classes.layout}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <div className={classes.content}>
            <AuthContext.Provider
              value={{
                setUser: this.setUser,
                currentUser: currentUser,
                token: token,
                setToken: this.setToken,
                handleLogout: this.handleLogout,
                onboarding: onboarding,
                beginOnboarding: this.beginOnboarding
              }}
            >
              <Header />

              <Router>
                <Routes />
              </Router>
            </AuthContext.Provider>
          </div>
          <Footer />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default withStyles(styles)(App);
