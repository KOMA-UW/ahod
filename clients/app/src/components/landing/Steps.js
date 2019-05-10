import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import team from '../../img/team.svg';
import saving from '../../img/piggy-bank.svg';
import share from '../../img/share.svg';
import Explainers from './Explainers';

const items = [
  {
    number: 1,
    icon: team,
    alt: 'Create a group',
    text:
      'Create a group with your close friends and family that will accompany you on this financialy journey.'
  },
  {
    number: 2,
    icon: saving,
    alt: 'Give money to the pool',
    text:
      'Pay your share, every month, of the total money pool, helping your friends and family.'
  },
  {
    number: 3,
    icon: share,
    alt: 'Win sharings',
    text: 'Collect your share of the circle, and repeat!'
  }
];
const styles = theme => ({
  background: {
    backgroundColor: 'white'
  },

  image: {
    height: 150,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  }
});

function Steps(props) {
  const { classes } = props;

  return (
    <Explainers
      title="How it works"
      items={items}
      background={classes.background}
      iconClass={classes.image}
    />
  );
}

export default withStyles(styles)(Steps);
