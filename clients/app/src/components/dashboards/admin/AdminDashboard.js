import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardHeading from '../CardHeading';
import MembersList from './MembersList';
import { Container, Row, Col } from 'react-grid-system';
import { Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    marginTop: 100
  }
});
class AdminDashboard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container className={classes.root}>
          <Row align="center">
            <Col sm={8}>
              <CardHeading title="Admin Dashboard" />
            </Col>

            <Col sm={4} align="right">
              <Button variant="contained" color="secondary">
                Add Member
              </Button>
            </Col>
          </Row>

          <MembersList />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
