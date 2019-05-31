import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import LayoutBody from './LayoutBody';
import Typography from '@material-ui/core/Typography';
import logo from '../../img/CliqueLogo.png';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(1) * 9,
    marginBottom: theme.spacing(1) * 9
  },
  button: {
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: `${theme.spacing(1) * 2}px ${theme.spacing(1) * 5}px`
  },
  link: {
    marginTop: theme.spacing(1) * 3,
    marginBottom: theme.spacing(1) * 3
  },
  buoy: {
    width: 60
  }
});

function Questions(props) {
  const { classes } = props;

  return (
    <LayoutBody className={classes.root} component="section">
      <Button className={classes.button}>
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link}>
        We are here to help. Get in touch!
      </Typography>
      <img
        src={logo}
        className={classes.logo}
        alt="buoy"
        style={{ height: 100 }}
      />
    </LayoutBody>
  );
}

Questions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Questions);
