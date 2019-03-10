import React from "react";
import { withAuth } from "../../Context";
import { Row, Col } from "react-grid-system";
import Hero from "./Hero";

const Landing = props => {
  return (
    <Row>
      <Col sm={4}>
        <Hero />
      </Col>
    </Row>
  );
};

export default withAuth(Landing);
