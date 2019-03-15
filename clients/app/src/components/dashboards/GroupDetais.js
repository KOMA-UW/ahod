import React, { Component } from "react";
import Icon from "@material-ui/core/Icon";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-grid-system";
import Divider from "@material-ui/core/Divider";
const styles = theme => ({
  root: {},
  //   container: {
  //     display: "flex"
  //   },
  icon: {
    color: "#000"
  },
  typography: {
    marginBottom: 20
  },
  text: {
    color: theme.palette.secondary.main
  }
});
class GroupDetais extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Container>
            <Row>
              <Col sm={12}>
                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.typography}
                >
                  <Icon
                    className={classNames(classes.icon, "fas fa-dollar-sign")}
                    color="action"
                  />
                  Capital: <span className={classes.text}> $10,000</span>
                </Typography>

                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.typography}
                >
                  <Icon
                    className={classNames(classes.icon, "fas fa-dollar-sign")}
                    color="action"
                  />
                  Individual Monthly Contribution:
                  <span className={classes.text}> $1,000 / month</span>
                </Typography>

                <Typography
                  variant="h5"
                  gutterBottom
                  className={classes.typography}
                >
                  <Icon
                    className={classNames(classes.icon, "fas fa-dollar-sign")}
                    color="action"
                  />
                  Winner Potential:{" "}
                  <span className={classes.text}> $10,000 / month</span>
                </Typography>
              </Col>
              <Col sm={4} />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(GroupDetais);
