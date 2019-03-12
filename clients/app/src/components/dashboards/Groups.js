import React from "react";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
const members = [1, 2, 3, 4];
const Groups = props => {
  return (
    <Container>
      <Row>
        {members.map(member => (
          <Col>
            <SimpleCard>Group Single</SimpleCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Groups;
