import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Avatar, Divider, Typography } from '@material-ui/core';

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
    padding: '10px 25px',
    margin: 0
  }
};
class Feed extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col sm={2} style={styles.padding}>
            <Avatar style={styles.avatar} src={this.props.authorImg} />
          </Col>
          <Col sm={8} style={styles.padding}>
            <Typography variant="h6">{this.props.author}</Typography>
            <Typography variant="body1">{this.props.time}</Typography>
            <Typography variant="body2">{this.props.description}</Typography>
          </Col>

          <Col sm={2} style={styles.padding}>
            {/* <Arrows */}
          </Col>
        </Row>
        {this.props.elemNum && <Divider />}
      </div>
    );
  }
}

export default Feed;
