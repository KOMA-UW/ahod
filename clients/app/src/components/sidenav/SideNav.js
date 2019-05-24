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
import { ROUTES } from '../../constants';

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
    ...theme.mixins.toolbar,
    color: '#8ca4b0'
  },
  toolbarIconsOnly: {
    marginTop: 100
  },
  logo: {
    marginTop: 10
  },
  icon: {
    color: theme.palette.grey.text
  },
  text: {
    color: '#8ca4b0 !important'
  }
});

const icons = [
  {
    icon: 'group',
    primary: 'My Cliques',
    link: ROUTES.home
  },
  {
    icon: 'payment',
    primary: 'Make A Payment',
    link: ROUTES.payment
  },
  {
    icon: 'date_range',
    primary: 'Calendar',
    link: ROUTES.calendar
  },
  {
    icon: 'person',
    primary: 'My Profile',
    link: ROUTES.profile
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
        {this.props.drawerOpen && (
          <div>
            <Container className={classes.logo}>
              <Row justify="center" align="center">
                <Col sm={8} align="center">
                  <Logo />
                </Col>
                <Col sm={4}>
                  <IconButton onClick={this.props.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </Col>
              </Row>
              <Row>
                <Col>
                  <CurrentUser />
                </Col>
              </Row>
            </Container>
          </div>
        )}

        <List
          className={!this.props.drawerOpen ? classes.toolbarIconsOnly : ''}
        >
          {icons.map((item, index) => {
            return (
              <ListItem button key={index} component={Link} to={item.link}>
                <ListItemIcon className={classes.icon}>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  className={classes.icon}
                  primary={item.primary}
                  color="textSecondary"
                  disableTypography={true}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

export default withAuth(withStyles(styles)(SideNav));
