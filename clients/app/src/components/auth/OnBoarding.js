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
  constructor(props) {
    super(props);
    this.state = {
      join: false,
      create: false
    };
  }
  handleClick = name => {
    this.setState({ [name]: !this.state.name });
  };
  render() {
    const { classes } = this.props;
    const { join, create } = this.state;
    return (
      <Container>
        <Row debug>
          <Col>
            <SimpleCard>
              <div>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => this.handleClick("join")}
                >
                  Join a Group
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => this.handleClick("create")}
                >
                  Create a Group
                </Button>
              </div>
            </SimpleCard>
          </Col>
        </Row>
        {create && (
          <Row debug>
            <Col>
              <SimpleCard>Join a group</SimpleCard>
            </Col>
          </Row>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(OnBoardingView);
