import React from 'react';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  }
};
const Logo = props => {
  const { classes } = props;
  return (
    <Typography
      variant="h6"
      color="inherit"
      className={classNames(classes.grow, classes.menuButton)}
    >
      CLIQUE
    </Typography>
  );
};

export default withStyles(styles)(Logo);
