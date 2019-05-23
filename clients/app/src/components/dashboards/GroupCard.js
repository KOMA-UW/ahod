import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Paper, Typography, Divider } from '@material-ui/core';
import VerticallDivider from '../../VerticallDivider';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import GroupIcon from '@material-ui/icons/Group';
import AttachMoney from '@material-ui/icons/AttachMoney';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import AccessTime from '@material-ui/icons/AccessTime';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
  root: {
    // padding: 15
    color: theme.palette.grey.text
  },
  text: {
    color: theme.palette.grey.text
  },
  padding: {
    padding: 8
  },
  paddingTopBottom: {
    paddingTop: 25,
    paddingBottom: 25
  },
  card: {
    // maxWidth: 400,
    paddingBottom: 10
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  actions: {
    display: 'flex'
  },
  btnRight: {
    marginLeft: 'auto'
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  members: {
    display: 'flex',
    flexDirection: 'row-reverse',
    padding: 15,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  member: {
    padding: 0,
    marginLeft: -15,
    marginRight: 10
    // position: 'absolute'
  },
  button: {
    margin: theme.spacing.unit,
    padding: '8px 15px',
    color: theme.palette.grey.text
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconWithText: {
    padding: 15
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    textAlign: 'center'
  },
  borderVertical: {
    height: 'inherit',
    width: 1,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  },
  user: {
    paddingTop: 10,
    paddingBottom: 10
  },
  participants: {
    color: theme.palette.grey.text
  }
});

class GroupCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes, isAdmin } = this.props;

    return (
      <Paper className={classes.root} elevation={0}>
        <div className={classes.flexContainer}>
          <div className={classes.paddingTopBottom}>
            <Avatar className={classes.avatar} src={this.props.adminAvatar} />
            <div className={classes.user}>
              <Typography variant="body1">Name of Admin</Typography>
              <Typography variant="body2" className={classes.text}>
                Name of Admin
              </Typography>
            </div>
          </div>
        </div>
        <Divider />
        <div className={classes.flexContainer}>
          <div className={classes.iconWithText}>
            <Icon>access_time</Icon>
            <Typography variant="body2" className={classes.text}>
              12 months
            </Typography>
          </div>
          <div className={classes.borderVertical} />

          <div className={classes.iconWithText}>
            <Icon>attach_money</Icon>
            <Typography variant="body2" className={classes.text}>
              $100/mon
            </Typography>
          </div>

          <div className={classes.borderVertical} />

          <div className={classes.iconWithText}>
            <Icon>people_outline</Icon>
            <Typography variant="body2" className={classes.text}>
              15 members
            </Typography>
          </div>
        </div>
        <Divider />
        <div className={classes.members}>
          <div className={classes.participants}>
            <Typography className={classes.participants}>
              +12 Participants
            </Typography>
          </div>
          {[1, 2, 3, 4].map((a, b) => {
            return (
              <div key={b} className={classes.member}>
                <Avatar className="shadow" src={this.props.adminAvatar} />
              </div>
            );
          })}
        </div>
        <Divider />

        <div className={classes.flexContainer}>
          <Button
            color="primary"
            className={classes.button}
            component={Link}
            to={`/groups:${this.props.id}`}
            onClick={() => this.props.handleEdit(false)}
          >
            <GroupIcon className={classes.leftIcon} />
            View
          </Button>

          <div className={classes.borderVertical} />

          {isAdmin && (
            <Button
              color="primary"
              className={classes.button}
              component={Link}
              to={`/groups:${this.props.id}`}
              onClick={() => this.props.handleEdit(true)}
            >
              <EditIcon className={classes.leftIcon} />
              Edit
            </Button>
          )}
        </div>
      </Paper>
    );
  }
}

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupCard);
