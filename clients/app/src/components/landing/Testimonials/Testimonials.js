import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Circles from "./circles/Circles";
import Testimonial from "./Testimonial";
import { Container, Row, Col } from "react-grid-system";
import SimpleCard from "../../SimpleCard";

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  }
});

class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "Kidus", age: "22", testimonial: "Awesome" }
    };
  }

  handleClick = user => {
    this.setState({
      user
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Typography
              variant="h4"
              align="center"
              className={classes.title}
              component="h2"
            >
              Testimonials
            </Typography>
          </Row>

          <Row>
            <Col>
              <Testimonial user={this.state.user} />
            </Col>
            <Col>
              <Circles handleImageClick={this.handleClick} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Testimonials);
