//@ts-check
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ROUTES, API_URL } from "../../constants";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import SimpleCard from "../SimpleCard";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Loader from "../Loader";
import { withAuth } from "../../Context";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },

  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30
  },
  formControl: {
    marginTop: 10,
    marginBottom: 10
  },
  error: {
    color: "#f44336"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 20
  }
});
class LoginView extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      data: {
        email: "",
        password: ""
      },
      error: false,
      errorMessage: "",
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
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status < 300) {
          const sessionToken = res.headers.get("Authorization");
          if (sessionToken != null) {
            window.localStorage.setItem("auth", sessionToken);
            this.props.setToken(sessionToken);
          }
          return res.json();
        }

        //if response not ok
        return res.text();
      })
      .then(data => {
        this.setState({ loading: false });
        if (typeof data === "string") {
          throw Error(data);
        }
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
      return <Redirect to={ROUTES.home} />;
    }
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <Col sm={6}>
              <SimpleCard title="Login">
                {loading ? (
                  <Loader />
                ) : (
                  <div>
                    <span className={classes.error}>
                      {error ? errorMessage : ""}
                    </span>
                    <form onSubmit={this.handleLogin}>
                      <FormControl
                        fullWidth
                        error={error}
                        className={classes.formControl}
                      >
                        <InputLabel htmlFor="component-email">Eamil</InputLabel>
                        <Input
                          id="component-email"
                          value={this.state.data.email}
                          onChange={this.handleChange("email")}
                        />
                      </FormControl>

                      <FormControl fullWidth error={error}>
                        <InputLabel htmlFor="component-password">
                          Password
                        </InputLabel>
                        <Input
                          id="component-password"
                          value={this.state.data.password}
                          onChange={this.handleChange("password")}
                          type="password"
                        />
                      </FormControl>
                      <div className={classes.buttonContainer}>
                        <Button
                          onClick={this.handleLogin}
                          size="large"
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Login
                        </Button>

                        <Button
                          component={Link}
                          to={ROUTES.signUp}
                          variant="outlined"
                          color="secondary"
                        >
                          Create an account
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

LoginView.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles, { withTheme: true })(LoginView));
