import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Avatar, Divider, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import NotDoneIcon from '@material-ui/icons/NotInterested';

const styles = {
  container: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    width: 60,
    height: 60
  },
  padding: {
    padding: '20px 40px',
    margin: 0
  }
};
class Member extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm={2} style={styles.padding}>
            <Avatar style={styles.avatar} src={this.props.authorImg} />
          </Col>
          <Col sm={6} style={styles.padding}>
            <Typography variant="h5">{this.props.author}</Typography>
            <Typography variant="body2">{this.props.description}</Typography>
          </Col>

          <Col sm={3} push={{ md: 1 }} style={styles.padding}>
            <Typography variant="caption" inline>
              Payment Status:
            </Typography>
            <DoneIcon style={{ textAlign: 'center' }} />
          </Col>
        </Row>
        {this.props.elemNum && <Divider />}
      </div>
    );
  }
}

export default Member;
