import React from 'react';
import { withAuth } from '../../Context';
import SimpleCard from '../SimpleCard';
import { Container, Row, Col } from 'react-grid-system';
import Groups from './Groups';

const Dashboard = props => {
  const { isAdmin, isEdit, currentUser } = props;
  const { firstName, lastName } = currentUser | '';
  console.log(isAdmin);
  return (
    <div>
      <Container>
        {/* <SimpleCard title={`Welcome ${currentUser}`} /> */}
        <Row>
          <Col>
            <Groups
              isAdmin={isAdmin}
              isEdit={isEdit}
              handleEdit={props.handleEdit}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
