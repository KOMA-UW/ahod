import React from 'react';
import { Link } from 'react-router-dom';
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
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';
import SideNav from './SideNav';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    marginBottom: 100
  },
  appBar: {
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
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }

  state = {};

  render() {
    const { classes, token, theme } = this.props;
    const authenticated = token != null;

    return (
      <div className={classes.root}>
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.props.drawerOpen
          })}
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
            <Typography variant="h6" color="inherit" className={classes.grow}>
              CLIQUE
            </Typography>
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
