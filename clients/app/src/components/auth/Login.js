//@ts-check
import React, { Component } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { ROUTES, API_URL } from '../../constants';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Fab,
  Link
} from '@material-ui/core';

import { withAuth } from '../../Context';
import Auth from './Auth';
import Loader from '../Loader';

const styles = theme => ({
  formControl: {
    marginTop: 10,
    marginBottom: 10
  },
  error: {
    color: '#f44336'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 20
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center'
  }
});
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: false,
      errorMessage: '',
      loading: false,
      showLoginButton: false
    };
  }

  handleChange = name => event => {
    this.setState({
      data: {
        ...this.state.data,
        [name]: event.target.value
      },
      error: false
    });
  };

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { data } = this.state;

    fetch(`${API_URL}/sessions`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status < 300) {
          const sessionToken = res.headers.get('Authorization');
          if (sessionToken != null) {
            window.localStorage.setItem('auth', sessionToken);
            this.props.setToken(sessionToken);
          }
          return res.json();
        }

        //if response not ok
        return res.text();
      })
      .then(data => {
        this.setState({ loading: false });
        if (typeof data === 'string') {
          throw Error(data);
        }
        console.clear();
        window.localStorage.setItem('userFirstname', data.firstName);
        this.props.setUser({ ...data });
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: err.message
        });
      });
  }

  componentDidMount() {
    this.setState({
      showLoginButton: false
    });

    this.props.goToLogin();
  }

  render() {
    const { classes } = this.props;
    const { error, errorMessage, loading } = this.state;
    if (this.props.token) {
      return <Redirect to={ROUTES.onboarding} />;
    }
    const SignupLink = props => <RouterLink to={ROUTES.signUp} {...props} />;
    return (
      <Auth
        {...this.props}
        link={SignupLink}
        title="Login"
        titleColor="primary"
      >
        {loading ? (
          <Loader />
        ) : (
          <div>
            <span style={styles.error}>{error ? errorMessage : ''}</span>
            <form onSubmit={this.handleLogin}>
              <FormControl
                fullWidth
                error={error}
                className={classes.formControl}
              >
                <InputLabel htmlFor="component-email">Email</InputLabel>
                <Input
                  id="component-email"
                  value={this.state.data.email}
                  onChange={this.handleChange('email')}
                />
              </FormControl>

              <FormControl fullWidth error={error}>
                <InputLabel htmlFor="component-password">Password</InputLabel>
                <Input
                  id="component-password"
                  value={this.state.data.password}
                  onChange={this.handleChange('password')}
                  type="password"
                />
              </FormControl>
              <div className={classes.buttonContainer}>
                <Fab
                  size="large"
                  variant="extended"
                  type="submit"
                  color="primary"
                  style={{ flex: 1 }}
                >
                  Login
                </Fab>
              </div>
            </form>
            <div className={classes.flexContainer}>
              <Typography variant="body1">
                Don't have an account?
                <Link
                  color="secondary"
                  style={{ marginLeft: 10 }}
                  component={SignupLink}
                >
                  Register
                </Link>
              </Typography>
            </div>
          </div>
        )}
      </Auth>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles, { withTheme: true })(LoginView));
