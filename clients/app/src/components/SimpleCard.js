import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    marginBottom: 20,
    marginTop: 20
  },
  card: {
    margin: '0 0',
    // padding: 20,
    borderRadius: 5,
    boxShadow:
      '0 1px 1px 0 rgba(60,64,67,.02), 0 1px 3px 1px rgba(60,64,67,.1)',
    border: 0
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  padding: {
    padding: 20
  },
  noPadding: {
    padding: 0,
    paddingBottom: '0px !important'
  },
  colored: {
    background: theme.palette.primary.dark,
    color: '#fff'
  }
});

function SimpleCard(props) {
  const { classes, title, noPadding, colored } = props;

  return (
    <div className={classes.root}>
      <Card
        className={classNames(classes.card, noPadding ? '' : classes.padding)}
        elevation={0}
        raised
      >
        <CardContent
          className={noPadding ? classes.noPadding : classes.padding}
        >
          {title && (
            <Typography
              variant="h5"
              component="h2"
              color={props.titleColor ? props.titleColor : 'primary'}
              style={{ marginBottom: 20, color: props.color }}
            >
              {props.title}
            </Typography>
          )}
          {props.children}
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
