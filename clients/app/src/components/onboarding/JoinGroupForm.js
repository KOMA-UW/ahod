import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import { withAuth } from '../../Context';

class JoinGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupID: ''
    };
  }

  componentDidMount() {
    const groupID = this.props.groupID;

    // this.setState({
    //   groupID: Number.parseInt(groupID)
    // });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  render() {
    const { groupJoined } = this.props;
    console.log(groupJoined);
    if (groupJoined) {
      return <Redirect to="/" />;
    } else {
    }

    return (
      <div>
        <Container align="center">
          <Row>
            <Col sm={8}>
              <form onSubmit={this.props.joinGroup}>
                <TextField
                  id="filled-full-width"
                  label="Group Invite Code"
                  style={{ margin: 8 }}
                  placeholder="Code"
                  helperText="Enter the group code sent to you by the group admin!"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true
                  }}
                  value={this.state.groupID}
                  onChange={this.handleChange('groupID')}
                />
                <Button variant="contained" color="secondary" type="submit">
                  Join
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withAuth(JoinGroup);
