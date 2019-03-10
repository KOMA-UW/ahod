import React from "react";
import { withAuth } from "../Context";
import { Container, Row, Col } from "react-grid-system";
import Loader from "./Loader";
import Landing from "./landing/Landing";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    const { loading } = this.state;
    const { token } = this.props;
    const authenticated = token != null;
    return (
      <div>
        <Container>
          {!authenticated ? (
            <Landing />
          ) : (
            <Row>
              <Col sm={4}>One of three columns</Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}

export default withAuth(MainView);
