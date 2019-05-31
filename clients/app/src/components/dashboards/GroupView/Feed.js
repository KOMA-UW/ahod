import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import { Avatar, Divider, Typography } from '@material-ui/core';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
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
  },
  button: {
    // margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  icon: {
    alignSelf: 'center'
  },
  badge: {
    paddingLeft: 10
  }
});
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: true,
      likes: [1]
    };
  }

  handleLike = () => {
    this.setState({
      liked: false,
      likes: ['', ...this.state.likes]
    });
  };
  render() {
    const { liked } = this.state;
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
          <Col xs={6} sm={6} className={classes.padding}>
            <Typography variant="h6">{this.props.author}</Typography>

            <Typography variant="body1" display="inline">
              {this.props.time}
            </Typography>
            <Badge
              className={classes.badge}
              badgeContent={this.state.likes.length}
              color="secondary"
            >
              <ThumbUpIcon color="action" />
            </Badge>
            <Typography variant="body2">{this.props.description}</Typography>
          </Col>
          <Col xs={3} sm={3} className={classes.icon}>
            {liked && (
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleLike}
              >
                Like
                <ThumbUpIcon className={classes.rightIcon} />
              </Button>
            )}
          </Col>
        </Row>
        {this.props.elemNum && <Divider />}
      </div>
    );
  }
}

export default withStyles(styles)(Feed);
