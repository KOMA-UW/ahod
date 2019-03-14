import React from "react";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import Groups from "./Groups";

const Dashboard = props => {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Groups />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
