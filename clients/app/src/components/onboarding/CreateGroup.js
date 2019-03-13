import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import TextField from "@material-ui/core/TextField";

class CreateGroup extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form>
              <TextField
                id="standard-uncontrolled"
                label="Group Name"
                margin="normal"
              />
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateGroup;
