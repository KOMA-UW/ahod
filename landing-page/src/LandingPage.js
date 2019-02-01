import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './index.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.danger,  
  }
});

function LandingPage(props) {
  const classes = props;
  console.log(classes);
      return (
        <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography position="" className={classes.paper} variant="h6" color="inherit">Grow your Dough, GYD</Typography>
          </Toolbar>
        </AppBar>
    </div>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
