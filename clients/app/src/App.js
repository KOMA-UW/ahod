import React, { Component } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { AuthContext } from "./Context";
import { API_URL, ROUTES } from "./constants";

import CssBaseline from "@material-ui/core/CssBaseline"; //normalize.css
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1D65A6",
      light: "#5b92d8",
      dark: "#003b77",
      contrastText: "#ffffff",
      text: "purple"
    },
    secondary: {
      main: "#a7503a",
      dark: "#732413",
      contrastText: "#ffffff",
      text: "red"
    }

    // text: {
    //   primary: "#000",
    //   secondary: "#FFF"
    // }
    // error: will use the default color
  },
  typography: {
    text: {
      primary: "#000",
      secondary: "#ffffff"
    }
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
    const { currentUser, token, onboarding } = this.state;
    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
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
            <Router>
              <Routes />
            </Router>{" "}
          </AuthContext.Provider>{" "}
        </MuiThemeProvider>{" "}
      </React.Fragment>
    );
  }
}

export default App;
