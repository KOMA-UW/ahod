import React from 'react';
import { Row, Col, Container } from 'react-grid-system';
import { withStyles } from '@material-ui/core/styles';
import Questions from './Questions';
import History from './History';
import Steps from './Steps';
import Testimonials from './Testimonials/Testimonials';
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
      <Hero />
      <History />
      <Steps />
      <Testimonials />
      <Questions />
    </div>
  );
};

export default withStyles(styles)(Landing);
