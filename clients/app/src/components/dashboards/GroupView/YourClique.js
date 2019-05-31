import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import CircleView from '../../circles/Circles';
import SimpleCard from '../../SimpleCard';
class YourClique extends Component {
  render() {
    return (
      <SimpleCard>
        <CircleView />
      </SimpleCard>
    );
  }
}

export default YourClique;
