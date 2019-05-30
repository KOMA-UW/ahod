import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../../SimpleCard';
import AddMemberForm from '../../members/AddMemberForm';
import AddMembers from '../../members/AddMembers';

class AddMember extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <SimpleCard>
              <AddMembers numberOfParticipants={1} />
            </SimpleCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddMember;
