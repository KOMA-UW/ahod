import React from "react";
import { Link } from "react-router-dom";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import Typography from "@material-ui/core/Typography";

const styles = {
  a: {
    textDecoration: "none",
    color: "inherent"
  }
};
const groups = [1, 2, 3, 4];
const Groups = props => {
  return (
    <Container>
      <Row>
        {groups.map((group, index) => (
          <Col sm={4}>
            <Link to={`/groups:${index + 1}`} style={styles.a}>
              <SimpleCard title={`Group ${index + 1}`}>
                <Typography variant="h6" gutterBottom>
                  h5. Heading
                </Typography>
              </SimpleCard>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Groups;
