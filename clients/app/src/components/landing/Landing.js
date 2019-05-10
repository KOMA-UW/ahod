import React from 'react';
import { Row, Col, Container } from 'react-grid-system';
import Questions from './Questions';
import History from './History';
import Steps from './Steps';
import Testimonials from './Testimonials';
import Hero from '../landing/Hero';

const styles = {
  root: {
    margin: 0,
    padding: 0
  }
};

const Landing = props => {
  return (
    <div>
      <Container fluid style={styles.root}>
        <Row>
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

export default Landing;
