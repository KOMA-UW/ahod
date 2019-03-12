import React from "react";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";

export default class GroupView extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <SimpleCard>Single Group</SimpleCard>
          </Col>
        </Row>
      </Container>
    );
  }
}
