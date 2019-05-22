import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import { Avatar, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    margin: 25
  },
  userName: {},
  avatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  text: {
    color: '#8ca4b0'
  }
});

class CurrentUser extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container className={classes.root}>
          <Row align="center">
            <Col align="center">
              <Avatar
                src="https://material-ui.com/static/images/avatar/2.jpg"
                className={classes.avatar}
              />
              <Typography variant="h5" className={classes.text}>
                Username
              </Typography>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(CurrentUser);
