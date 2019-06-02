//@ts-check
import React, { Component } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { ROUTES, API_URL } from '../../constants';
import {
  FormControl,
  InputLabel,
  Input,
  Typography,
  Fab
} from '@material-ui/core';
import Loader from '../Loader';
import Link from '@material-ui/core/Link';
import { withAuth } from '../../Context';
import { withStyles } from '@material-ui/core/styles';
import Auth from './Auth';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 100
  },
  formControl: {
    marginTop: 5,
    marginBottom: 5
  },
  loader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  error: {
    color: '#f44336',
    fontFamily: 'Roboto, sans-serif'
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end'
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
class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        passwordConf: ''
      },
      error: false,
      errorMessage: '',
      loading: false
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  handleSignUp(e) {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const { data } = this.state;

    fetch(`${API_URL}/users`, {
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
        this.onSetUser(data);
        this.props.setUser({ ...data });
        this.props.begingOnboarding();
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: err.message
        });
        console.log(err.message);
      });
  }

  onSetUser = result => {
    console.clear();
    for (const [key, value] of Object.entries(result)) {
      window.localStorage.setItem(key, value);
    }
  };

  render() {
    const { error, errorMessage, loading } = this.state;
    const { classes } = this.props;
    if (this.props.token) {
      return <Redirect to={ROUTES.onboarding} />;
    }

    const LoginLink = props => <RouterLink to={ROUTES.login} {...props} />;
    const fields = ['username', 'email', 'firstname', 'lastname', 'password'];
    return (
      <Auth
        link={LoginLink}
        {...this.props}
        title="Create New Account"
        titleColor="secondary"
      >
        {loading ? (
          <Loader />
        ) : (
          <div>
            <span style={styles.error}>{error ? errorMessage : ''}</span>

            <form onSubmit={this.handleSignUp}>
              {fields.map((name, index) => {
                return (
                  <FormControl
                    key={index}
                    fullWidth
                    error={error}
                    className={classes.formControl}
                  >
                    <InputLabel htmlFor={`component-${name}`}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </InputLabel>
                    <Input
                      id="component-username"
                      value={this.state.data[name]}
                      onChange={this.handleChange(`${name}`)}
                      type={name.includes('password') ? 'password' : 'text'}
                    />
                  </FormControl>
                );
              })}
              <FormControl fullWidth error={error}>
                <InputLabel htmlFor="component-password-confirm">
                  Confirm Password
                </InputLabel>
                <Input
                  id="component-password-confirm"
                  value={this.state.data.passwordConf}
                  onChange={this.handleChange('passwordConf')}
                  type="password"
                />
              </FormControl>

              <div className={classes.buttonContainer}>
                <Fab
                  size="large"
                  variant="extended"
                  type="submit"
                  color="secondary"
                  style={{ flex: 1 }}
                >
                  Create Account
                </Fab>
              </div>
            </form>

            <div className={classes.flexContainer}>
              <Typography variant="body1">
                Already have an account?
                <Link
                  color="primary"
                  style={{ marginLeft: 10 }}
                  component={LoginLink}
                >
                  Login
                </Link>
              </Typography>
            </div>
          </div>
        )}
      </Auth>
    );
  }
}

export default withAuth(withStyles(styles, { withTheme: true })(SignUpView));
