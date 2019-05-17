import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-grid-system';
import DateRange from '@material-ui/icons/DateRange';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {},
  iconContainer: {
    width: 80,
    height: 80,
    background: theme.palette.secondary.light, //'#d2d2d29e',

    borderRadius: 10
  },
  icon: {
    width: 80,
    height: 80,
    padding: 5,
    color: '#fff'
  },
  text: {
    color: '#fff'
  }
});

class NextCycle extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Row>
          <Col sm={3}>
            <div className={classes.iconContainer}>
              <DateRange className={classes.icon} />
            </div>
          </Col>
          <Col sm={9}>
            <Typography variant="h4" className={classes.text}>
              Next Draw
            </Typography>
            <Typography variant="body1" className={classes.text}>
              Sunday, June 1
            </Typography>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(NextCycle);
