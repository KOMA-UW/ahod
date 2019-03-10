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
      // light: will be calculated from palette.primary.main,
      main: "#1D65A6",
      dark: "#192E5B",
      light: "#72A2C0"
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#000"
    },
    text: {
      primary: "#FFF"
    }
    // error: will use the default color
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

  render() {
    const { currentUser, token } = this.state;
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
              handleLogout: this.handleLogout
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
