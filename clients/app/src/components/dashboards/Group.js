import React from "react";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import MembersTable from "./Members";

export default class GroupView extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <MembersTable />
          </Col>
        </Row>
      </Container>
    );
  }
}
