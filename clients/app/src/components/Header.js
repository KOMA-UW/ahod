import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withAuth } from "../Context";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import SideNav from "./sidenav/SideNav";
import Logo from "./Logo";
import Popover from "@material-ui/core/Popover";
import SimpleCard from "./SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import { Avatar } from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex",
    marginBottom: 60
  },
  appBar: {
    background: theme.palette.primary.dark
  },

  appBarUnshift: {
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
  }
});

class Header extends React.Component {
  state = {
    anchorEl: null
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const LoginLink = props => <Link to="/login" {...props} />;
    const { classes, token, drawerOpen } = this.props;
    const authenticated = token != null;
    const appBarClass = !drawerOpen
      ? classes.appBarUnshift
      : classes.appBarShift;

    return (
      <div className={classes.root}>
        <AppBar
          elevation={1}
          position="fixed"
          className={classNames(classes.appBar, appBarClass)}
        >
          <Toolbar disableGutters={this.props.iconSpace}>
            {authenticated && (
              <IconButton
                className={classNames(classes.menuButton, {
                  [classes.hide]: this.props.drawerOpen
                })}
                color="inherit"
                aria-label="Open Drawer"
                onClick={this.props.handleDrawerOpen}
              >
                {authenticated && <MenuIcon />}
              </IconButton>
            )}
            {!this.props.drawerOpen ? (
              <Logo />
            ) : (
              // empty to keep logout to the right
              <Typography
                variant="h6"
                color="inherit"
                className={classNames(classes.grow, classes.menuButton)}
              />
            )}

            {authenticated ? (
              <React.Fragment>
                <IconButton
                  color="inherit"
                  aria-owns={open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                >
                  <Badge badgeContent={2} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                  <Popover
                    id="mouse-over-popover"
                    className={classes.popover}
                    classes={{
                      paper: classes.paper
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left"
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left"
                    }}
                    onClose={this.handlePopoverClose}
                    disableRestoreFocus
                  >
                    <Col>
                      <Avatar
                        className={classes.avatar}
                        src={
                          "https://v3-0-0.material-ui.com/static/images/remy.jpg"
                        }
                      />
                      <Typography variant="h6">{"John Smith"}</Typography>
                      <Typography variant="body1" display="inline">
                        {"25 min ago"}
                      </Typography>
                    </Col>
                    <Col>
                      <Avatar
                        className={classes.avatar}
                        src={
                          "https://v3-0-0.material-ui.com/static/images/remy.jpg"
                        }
                      />
                      <Typography variant="h6">{"John Smith"}</Typography>
                      <Typography variant="body1" display="inline">
                        {"25 min ago"}
                      </Typography>
                    </Col>
                  </Popover>
                </IconButton>

                <Button color="inherit" onClick={this.props.handleLogout}>
                  Logout
                </Button>
              </React.Fragment>
            ) : (
              <Button color="inherit" component={LoginLink}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {authenticated && <SideNav />}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Header));
