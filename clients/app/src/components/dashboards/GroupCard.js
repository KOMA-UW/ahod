import React from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { ROUTES, API_URL } from '../../constants';
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Typography
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import GroupIcon from '@material-ui/icons/Group';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  media: {
    height: 150
  },
  text: {
    color: theme.palette.grey.text
  },
  flexContainer: {
    display: 'flex',
    flexGrow: 1,
    padding: 0,
    justifyContent: 'space-evenly',
    textAlign: 'center'
  },
  borderVertical: {
    height: 'inherit',
    width: 1,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
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
    marginLeft: -20,
    marginRight: 10
  },
  iconWithText: {
    padding: 15,
    color: theme.palette.grey.text
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1),
    padding: '8px 15px',
    color: theme.palette.grey.text
  },
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  noPaddingBottom: {
    paddingBottom: 0
  },
  noPaddingTop: {
    paddingTop: 0
  }
});

class GroupCard extends React.Component {
  render() {
    const EditLink = props => (
      <RouterLink to={ROUTES.adminMemberView} {...props} />
    );

    const ViewLink = props => <RouterLink to={ROUTES.group} {...props} />;
    const { classes, isAdmin, title, groupImage } = this.props;

    return (
      <Card className={classes.card} elevation={0} square={true}>
        <CardMedia className={classes.media} image={groupImage} title={title} />
        <CardContent className={classes.noPadding}>
          <Typography gutterBottom variant="h5" component="h5" align="center">
            {title}
          </Typography>

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
                $100 /mon
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
              <Typography className={classes.text}>+12 Participants</Typography>
            </div>
            {[1, 2, 3].map((a, b) => {
              return (
                <div key={b} className={classes.member}>
                  <Avatar className="shadow" src={this.props.adminAvatar} />
                </div>
              );
            })}
          </div>
          <Divider />
        </CardContent>

        <CardActions className={classes.noPaddingBottom}>
          <div className={classes.flexContainer}>
            <Button
              color="primary"
              className={classes.button}
              component={RouterLink}
              to={`/group/${this.props.id}`}
            >
              <GroupIcon className={classes.leftIcon} />
              View
            </Button>

            <div className={classes.borderVertical} />

            {isAdmin && (
              <Button
                color="primary"
                className={classes.button}
                component={RouterLink}
                to={`/members/${this.props.id}`}
              >
                <EditIcon className={classes.leftIcon} />
                Manage
              </Button>
            )}
          </div>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(GroupCard);
