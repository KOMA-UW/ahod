import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "../Context";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import { loadCSS } from "fg-loadcss/src/loadCSS";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9 + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

class Header extends React.Component {
  componentDidMount() {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.1.0/css/all.css",
      document.querySelector("#insertion-point-jss")
    );
  }

  state = {
    open: false
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, token, theme } = this.props;
    const authenticated = token != null;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
              color="inherit"
              aria-label="Open Drawer"
              onClick={this.handleDrawerOpen}
            >
              {authenticated && <MenuIcon />}
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              CLIQUE
            </Typography>
            {authenticated && (
              <React.Fragment>
                <Button color="inherit" onClick={this.props.handleLogout}>
                  Logout
                </Button>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>
        {authenticated && (
          <Drawer
            variant="permanent"
            className={classNames(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })}
            classes={{
              paper: classNames({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open
              })
            }}
            open={this.state.open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose} />
            </div>
            <List>
              {/* {["Dashboard", "My Profile", "My Cliques", "Make A Payment"].map( */}
              <ListItem button key="Dashboard">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>

              <ListItem button key="Profile">
                <ListItemIcon>
                  <Icon
                    className={classNames(classes.icon, "fas fa-user-circle")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </ListItem>

              <ListItem button key="Cliques">
                <ListItemIcon>
                  <Icon
                    className={classNames(classes.icon, "fas fa-users")}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="My Cliques" />
              </ListItem>

              <ListItem button key="Payment">
                <ListItemIcon>
                  <Icon
                    className={classNames(
                      classes.icon,
                      "fas fa-money-bill-alt"
                    )}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary="Make A Payment" />
              </ListItem>
            </List>
          </Drawer>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Header));
