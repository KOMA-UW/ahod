import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../SimpleCard';
import JoinGroupForm from './JoinGroupForm';

class JoinGroup extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <SimpleCard>
              <JoinGroupForm />
            </SimpleCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default JoinGroup;
