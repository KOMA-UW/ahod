import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import MakePayment from '../../payment/MakePayment';
import SimpleCard from '../../SimpleCard';
import { Paper } from '@material-ui/core';
import classNames from 'classnames';
import NextCycle from './NextCycle';
import PaymentStatus from './PaymentStatus';

const styles = theme => ({
  padding: {
    padding: 25,
    margin: 0,
    borderRadius: 0
  },
  background: {
    background: theme.palette.primary.dark,
    color: '#fff',
    margin: 0,
    borderRadius: 0
  }
});
class CardPairs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <SimpleCard noPadding={true}>
        <Row style={{ margin: 0 }}>
          <Col sm={6} style={{ padding: 0, minHeight: 80 }}>
            <SimpleCard noMargin={true} square={true}>
              <PaymentStatus />
            </SimpleCard>
          </Col>
          <Col sm={6} style={{ padding: 0 }}>
            <SimpleCard
              noPadding={true}
              noMargin={true}
              backgroundClass={classes.background}
            >
              <NextCycle />
            </SimpleCard>
          </Col>
        </Row>

        {/* <Col xs={12} sm={6} style={{ padding: 0 }}>
            <SimpleCard noPadding={true} backgroundClass={classes.background}>
              <NextCycle />
            </SimpleCard>
            <Paper
              rounded={0}
              elevation={0}
              className={classNames(classes.padding, classes.background)}
            >
              <NextCycle />
            </Paper>
          </Col> */}
      </SimpleCard>
    );
  }
}

export default withStyles(styles)(CardPairs);
