import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardHeading from '../CardHeading';
import MembersList from '../../members/MembersList';
import { Container, Row, Col } from 'react-grid-system';
import { Button } from '@material-ui/core';
import AddMemberDialog from '../../members/AddMember';

const styles = theme => ({
  root: {
    marginTop: 100
  }
});
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container className={classes.root} fluid>
          <Row align="center">
            <Col sm={8}>
              <CardHeading title="Admin Dashboard" />
            </Col>

            <Col sm={4} align="right">
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handleClickOpen}
              >
                Add Member
              </Button>
            </Col>
          </Row>
          <MembersList />
          <AddMemberDialog
            open={this.state.open}
            handleClose={this.handleClose}
          />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
