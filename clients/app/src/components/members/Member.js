import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import { Avatar, Typography, Button, Fab } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  button: {
    backgroundColor: '#acbec5',
    color: '#fff'
  },
  avatar: {
    width: 60,
    height: 60
  },
  padding: {
    padding: 5,
    margin: 0
  }
});
class Member extends Component {
  render() {
    const { classes, memberID } = this.props;
    const AdminViewMemberLink = props => (
      <Link to={`/members/member/${memberID + 1}`} {...props} />
    );

    return (
      <div>
        <Row align="center">
          <Col sm={1} style={{ paddingLeft: 25 }}>
            <Avatar style={styles.avatar} src={this.props.authorImg} />
          </Col>
          <Col sm={7} style={{ paddingLeft: 5 }}>
            <Typography variant="body1">{this.props.author}</Typography>
            <Typography variant="body2">{this.props.description}</Typography>
          </Col>

          <Col sm={4} align="right">
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              component={AdminViewMemberLink}
            >
              View
            </Button>
            {/* <IconButton>
              <MoreVertIcon />
            </IconButton> */}
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(Member);
