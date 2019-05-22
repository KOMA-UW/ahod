import React from 'react';
import { withAuth } from '../../Context';
import { Container, Row, Col } from 'react-grid-system';
import Groups from './Groups';

const Dashboard = props => {
  const { isAdmin, isEdit, currentUser } = props;
  const { firstName, lastName } = currentUser | '';
  console.log(isAdmin);

  return (
    <div>
      <Container fluid style={{ margin: 60 }}>
        <Row>
          <Col>
            <Groups
              isAdmin={true}
              isEdit={true}
              handleEdit={props.handleEdit}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
