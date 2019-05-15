import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import MembersTable from './Members';
import ViewGroup from './GroupView/ViewGroup';
import { withAuth } from '../../Context';

class GroupView extends React.Component {
  render() {
    const { isEdit } = this.props;

    return (
      <Row style={{ margin: 80 }}>
        <Col>{this.props.isEdit ? <MembersTable /> : <ViewGroup />}</Col>
      </Row>
    );
  }
}

export default withAuth(GroupView);
