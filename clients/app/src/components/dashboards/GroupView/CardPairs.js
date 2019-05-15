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
    margin: 0
  }
});
class CardPairs extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Row>
          <Col sm={12}>
            <SimpleCard noPadding={true}>
              <Row style={{ padding: 0 }}>
                <Col sm={6} style={{ padding: 0 }}>
                  <Paper
                    elevation={0}
                    rounded={0}
                    color="primary"
                    className={classes.padding}
                  >
                    <PaymentStatus />
                  </Paper>
                </Col>
                <Col sm={6} style={{ padding: 0 }}>
                  <Paper
                    rounded={0}
                    elevation={0}
                    className={classNames(classes.padding, classes.background)}
                  >
                    <NextCycle />
                  </Paper>
                </Col>
              </Row>
            </SimpleCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(CardPairs);
