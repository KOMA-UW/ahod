import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { withAuth } from '../../Context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../Logo';
import CurrentUser from './CurrentUser';
import { Container, Row, Col } from 'react-grid-system';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1
    }
  },

  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  logo: {
    marginTop: 40
  }
});

const icons = [
  {
    name: 'fas fa-home',
    primary: 'Admin Dashboard',
    link: '/',
    protected: true
  },
  {
    name: 'fas fa-users',
    primary: 'My Cliques',
    link: '/',
    protected: false
  },

  {
    name: 'fas fa-money-bill-alt',
    primary: 'Make A Payment',
    link: '/payment',
    protected: false
  },
  {
    name: 'fas fa-calendar-alt',
    primary: 'Calendar',
    link: '/calendar',
    protected: false
  },
  {
    name: 'fas fa-user-circle',
    primary: 'My Profile',
    link: '/profile',
    protected: false
  }
];

class SideNav extends Component {
  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }
  render() {
    const { classes, isAdmin } = this.props;

    return (
      <Drawer
        elevation={20}
        variant="permanent"
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: this.props.drawerOpen,
          [classes.drawerClose]: !this.props.drawerOpen
        })}
        classes={{
          paper: classNames({
            [classes.drawerOpen]: this.props.drawerOpen,
            [classes.drawerClose]: !this.props.drawerOpen
          })
        }}
        open={this.props.drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <Container className={classes.logo}>
            <Row align="center">
              <Col align="center">
                <Logo />
              </Col>
            </Row>
            <Row>
              <Col>
                <CurrentUser />
              </Col>
            </Row>
            <Row>
              <IconButton onClick={this.props.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </Row>
          </Container>
        </div>

        <List>
          {isAdmin
            ? icons.map((icon, index) => {
                return (
                  <ListItem
                    button
                    key={icon.name}
                    component={Link}
                    to={icon.link}
                  >
                    <ListItemIcon>
                      <Icon
                        className={classNames(classes.icon, icon.name)}
                        color="action"
                      />
                    </ListItemIcon>
                    <ListItemText primary={icon.primary} />
                  </ListItem>
                );
              })
            : icons.map((icon, index) => {
                return (
                  !icon.protected && (
                    <ListItem
                      button
                      key={icon.name}
                      component={Link}
                      to={icon.link}
                    >
                      <ListItemIcon>
                        <Icon
                          className={classNames(classes.icon, icon.name)}
                          color="action"
                        />
                      </ListItemIcon>
                      <ListItemText primary={icon.primary} />
                    </ListItem>
                  )
                );
              })}
        </List>
      </Drawer>
    );
  }
}

export default withAuth(withStyles(styles)(SideNav));
