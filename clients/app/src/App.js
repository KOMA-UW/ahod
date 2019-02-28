import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'; //normalize.css
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Header from './components/Header'
import Footer from './components/Footer'

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2196f3',
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
          <Footer />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
