import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withAuth } from '../Context';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import SideNav from './SideNav';
import Logo from './Logo';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    background: theme.palette.primary.dark
  },
  appBarUnshift: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
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
    display: 'none'
  }
});

class Header extends React.Component {
  render() {
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

            {authenticated && (
              <React.Fragment>
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <Button color="inherit" onClick={this.props.handleLogout}>
                  Logout
                </Button>
              </React.Fragment>
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
