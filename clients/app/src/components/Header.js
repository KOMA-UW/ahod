import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { withAuth } from "../Context";
import { ROUTES } from "../constants";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 68
  },
  appBar: {
    position: "fixed",
    top: 0,
    zIndex: 1500
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function Header(props) {
  const { classes, token, showLoginButton } = props;
  const authenticated = token != null;
  const showButton = showLoginButton && true;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            {authenticated && <MenuIcon />}
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            CLIQUE
          </Typography>
          {authenticated && (
            <React.Fragment>
              <Button color="inherit" onClick={props.handleLogout}>
                Logout
              </Button>
            </React.Fragment>
          )}
          {showButton && (
            <Button
              color="inherit"
              component={Link}
              to={ROUTES.login}
              onClick={props.goToLogin}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Header));
