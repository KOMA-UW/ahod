//@ts-check
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { ROUTES, API_URL } from "../../constants";
import { Container, Row, Col } from "react-grid-system";
import SimpleCard from "../SimpleCard";
import Button from "@material-ui/core/Button";
import { FormControl, InputLabel, Input } from "@material-ui/core";
import Loader from "../Loader";
import { withAuth } from "../../Context";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: 30
  },
  formControl: {
    marginTop: 10,
    marginBottom: 10
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  error: {
    color: "#f44336",
    fontFamily: "Roboto, sans-serif"
  },
  button: {
    display: "flex",
    justifyContent: "flex-end"
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 50,
    marginBottom: 20
  }
});
class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        password: "",
        passwordConf: ""
      },
      error: false,
      errorMessage: "",
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

  render() {
    const { error, errorMessage, loading } = this.state;
    const { classes } = this.props;
    if (this.props.token) {
      return <Redirect to={ROUTES.onboarding} />;
    }
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <Col sm={6}>
              <SimpleCard title="Sign Up">
                {loading ? (
                  <Loader />
                ) : (
                  <div>
                    <span style={styles.error}>
                      {error ? errorMessage : ""}
                    </span>
                    <form onSubmit={this.handleSignUp}>
                      <FormControl
                        fullWidth
                        error={error}
                        style={styles.formControl}
                      >
                        <InputLabel htmlFor="component-username">
                          Username
                        </InputLabel>
                        <Input
                          id="component-username"
                          value={this.state.data.username}
                          onChange={this.handleChange("username")}
                        />
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={error}
                        style={styles.formControl}
                      >
                        <InputLabel htmlFor="component-email">Email</InputLabel>
                        <Input
                          id="component-email"
                          value={this.state.data.email}
                          onChange={this.handleChange("email")}
                        />
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={error}
                        style={styles.formControl}
                      >
                        <InputLabel htmlFor="component-firstname">
                          First Name
                        </InputLabel>
                        <Input
                          id="component-firstname"
                          value={this.state.data.firstname}
                          onChange={this.handleChange("firstname")}
                        />
                      </FormControl>

                      <FormControl
                        fullWidth
                        error={error}
                        style={styles.formControl}
                      >
                        <InputLabel htmlFor="component-lastname">
                          Last Name
                        </InputLabel>
                        <Input
                          id="component-lastname"
                          value={this.state.data.lastname}
                          onChange={this.handleChange("lastname")}
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

                      <FormControl fullWidth error={error}>
                        <InputLabel htmlFor="component-password-confirm">
                          Confirm Password
                        </InputLabel>
                        <Input
                          id="component-password-confirm"
                          value={this.state.data.passwordConf}
                          onChange={this.handleChange("passwordConf")}
                          type="password"
                        />
                      </FormControl>

                      <div className={classes.buttonContainer}>
                        <Button
                          component={Link}
                          to={ROUTES.login}
                          variant="outlined"
                        >
                          Login
                        </Button>
                        <Button
                          size="large"
                          variant="contained"
                          type="submit"
                          color="secondary"
                        >
                          Register
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

export default withAuth(withStyles(styles, { withTheme: true })(SignUpView));
