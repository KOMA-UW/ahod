import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-grid-system';
import DateRange from '@material-ui/icons/DateRange';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {},
  icon: {
    width: 100,
    height: 100,
    background: '#d2d2d29e',
    padding: 5,
    borderRadius: 10,
    color: theme.palette.primary.dark
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
            <DateRange className={classes.icon} />
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
