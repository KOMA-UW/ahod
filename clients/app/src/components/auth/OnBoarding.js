import React from "react";
// import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
// import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from "@material-ui/icons/Navigation";
import Button from "@material-ui/core/Button";
import { Container, Row, Col } from "react-grid-system";
import SimpleCard from "../SimpleCard";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  },
  iconSmall: {
    fontSize: 15
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class OnBoardingView extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container>
        <Row debug>
          <Col>
            <SimpleCard />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withStyles(styles)(OnBoardingView);
