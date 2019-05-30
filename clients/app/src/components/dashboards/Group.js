import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import AdminDashoard from './admin/AdminDashboard';
import ViewGroup from './GroupView/ViewGroup';
import { withAuth } from '../../Context';
import CenteredLeftPadding from '../CenteredLeftPadding';

class GroupView extends React.Component {
  render() {
    const { isEdit, drawerOpen } = this.props;

    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <Row>
          <Col>
            <ViewGroup />
          </Col>
        </Row>
      </CenteredLeftPadding>
    );
  }
}

export default withAuth(GroupView);
