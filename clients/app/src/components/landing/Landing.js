import React from 'react';
import { Row, Col, Container } from 'react-grid-system';
import { withStyles } from '@material-ui/core/styles';
import Questions from './Questions';
import History from './History';
import Steps from './Steps';
import Testimonials from './Testimonials';
import Hero from '../landing/Hero';

const styles = {
  root: {
    margin: 0,
    padding: 0
  },
  row: {
    paddingLeft: '0px !important',
    paddingRight: 0
  }
};

const Landing = props => {
  const { classes } = props;
  return (
    <div>
      <Container fluid style={styles.root}>
        <Row style={styles.row} debug>
          <Col md={12}>
            <Hero />
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <History />
          </Col>
        </Row>

        <Steps />
        <Testimonials />
        <Questions />
      </Container>
    </div>
  );
};

export default withStyles(styles)(Landing);
