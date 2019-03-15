import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "react-grid-system";
import SimpleCard from "../SimpleCard";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const styles = {
  container: {
    display: "flex"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    marginRight: 10,
    width: 60,
    height: 60
  },
  button: {
    marginLeft: "auto",
    width: 100,
    height: 45
  }
};

class Profile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col>
              <SimpleCard title="User Profile">
                <div className={classes.container}>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://material-ui.com/static/images/avatar/1.jpg"
                    className={classes.bigAvatar}
                  />

                  <Typography variant="h5">John Smith</Typography>

                  <Button
                    size="medium"
                    variant="outlined"
                    color="secondary"
                    className={classes.button}
                  >
                    Edit
                  </Button>
                </div>
                <br />
                <Divider />
                <br />
                <Typography variant="body1">Email: abc@test.com</Typography>
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Profile);
