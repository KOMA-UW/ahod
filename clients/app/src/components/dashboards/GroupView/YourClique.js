import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import CircleView from '../../circles/Circles';
import SimpleCard from '../../SimpleCard';
class YourClique extends Component {
  render() {
    return (
      <div>
        <SimpleCard>
          <CircleView />
        </SimpleCard>
      </div>
    );
  }
}

export default YourClique;
