import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Feed from "./Feed";
import MembersTable from "./Members";

const styles = theme => ({
  btnContainer: {
    display: "flex"
  },
  button: {
    marginLeft: "auto",
    marginTop: 10
  }
});

class ViewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plea: ""
    };
  }

  handleChange = e => {
    this.setState({
      plea: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log("your plea " + this.state.plea + " was submitted");
    this.setState({
      plea: ""
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col sm={8}>
              <MembersTable />
            </Col>

            <Col sm={4}>
              <Row>
                <Col>
                  <SimpleCard title="Make a plea">
                    <p>Make a plea to get paid this month!</p>
                    <form onSubmit={this.handleSubmit}>
                      <TextField
                        id="standard-full-width"
                        label="Plea"
                        style={{ margin: 8 }}
                        placeholder="Enter your plea here!"
                        fullWidth
                        margin="normal"
                        value={this.state.plea}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <div className={classes.btnContainer}>
                        <Button
                          variant="contained"
                          color="secondary"
                          className={classes.button}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </SimpleCard>
                </Col>
              </Row>
              <Row>
                <Col>
                  <SimpleCard title="Feed">
                    <Feed />
                  </SimpleCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ViewGroup);
