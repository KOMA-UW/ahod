import React from "react";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import MembersTable from "./Members";
import ViewGroup from "./ViewGroup";
import { withAuth } from "../../Context";

class GroupView extends React.Component {
  render() {
    const { isEdit } = this.props;
    console.log(this.props);
    return (
      <Container>
        <Row>
          <Col>{this.props.isEdit ? <MembersTable /> : <ViewGroup />}</Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth(GroupView);
