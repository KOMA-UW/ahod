import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { withAuth } from "../Context";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 240;

const styles = theme => ({
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

  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

const icons = [
  {
    name: "fas fa-user-circle",
    primary: "My Profile",
    link: "/profile"
  },
  {
    name: "fas fa-users",
    primary: "My Cliques",
    link: "/groups"
  },
  {
    name: "fas fa-home",
    primary: "Dashboard",
    link: "/"
  },

  {
    name: "fas fa-money-bill-alt",
    primary: "Make A Payment",
    link: "/payment"
  }
];

class SideNav extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Drawer
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
          <IconButton onClick={this.props.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <List>
          {icons.map((icon, index) => {
            return (
              <ListItem button key={icon.name} component={Link} to={icon.link}>
                <ListItemIcon>
                  <Icon
                    className={classNames(classes.icon, icon.name)}
                    color="action"
                  />
                </ListItemIcon>
                <ListItemText primary={icon.primary} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    );
  }
}

export default withAuth(withStyles(styles)(SideNav));
