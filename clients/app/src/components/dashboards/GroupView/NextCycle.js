import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-grid-system';
import DateRange from '@material-ui/icons/DateRange';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {},
  iconContainer: {
    width: 60,
    height: 60,
    background: theme.palette.secondary.light //'#d2d2d29e',

    // borderRadius:
  },
  icon: {
    width: 60,
    height: 60,
    padding: 3,
    color: '#fff'
  },
  text: {
    color: '#fff'
  },
  card: {
    padding: '20px 25px',
    marginTop: 0,
    marginBottom: 0,
    minHeight: 100
  }
});

class NextCycle extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Row className={classes.card}>
        <Col xs={3} sm={3} md={3} lg={3}>
          <div className={classes.iconContainer}>
            <DateRange className={classes.icon} />
          </div>
        </Col>
        <Col xs={1} sm={1} lg={1} xl={1} />
        <Col xs={7} sm={7} md={7} lg={7}>
          <Typography variant="h6" className={classes.text}>
            Next Draw
          </Typography>
          <Typography variant="body1" className={classes.text}>
            Sunday, June 1
          </Typography>
        </Col>
      </Row>
    );
  }
}

export default withStyles(styles)(NextCycle);
