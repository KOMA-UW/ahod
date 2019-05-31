import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import { Avatar, Divider, Typography } from '@material-ui/core';
import classNames from 'classnames';
const styles = theme => ({
  container: {
    display: 'flex',
    padding: '0px 10px'
  },
  avatar: {
    marginLeft: 'auto',
    width: 60,
    height: 60
  },
  padding: {
    padding: '10px 25px',

    margin: 0
  },
  avatarContainer: {
    alignSelf: 'center',
    marginRight: 20
  }
});
class Feed extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Row className={classes.container}>
          <Col
            xs={2}
            sm={2}
            className={classNames(classes.avatarContainer, classes.padding)}
          >
            <Avatar className={classes.avatar} src={this.props.authorImg} />
          </Col>
          <Col xs={8} sm={8} className={classes.padding}>
            <Typography variant="h6">{this.props.author}</Typography>
            <Typography variant="body1">{this.props.time}</Typography>
            <Typography variant="body2">{this.props.description}</Typography>
          </Col>
        </Row>
        {this.props.elemNum && <Divider />}
      </div>
    );
  }
}

export default withStyles(styles)(Feed);
