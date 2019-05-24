import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../SimpleCard';
import JoinGroupForm from './JoinGroupForm';

class JoinGroup extends Component {
  render() {
    console.log(this.props.match.params);
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <SimpleCard>
                <JoinGroupForm groupID={this.props.match.params.groupID} />
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default JoinGroup;
