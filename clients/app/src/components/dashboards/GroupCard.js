import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Col } from 'react-grid-system';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
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
    //backgroundColor: red[500]
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
      <Col sm={10}>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                aria-label="Administered By"
                className={classes.avatar}
                alt=""
                src={this.props.adminAvatar}
              >
                R
              </Avatar>
            }
            title={this.props.title}
            subheader={this.props.dateCreated}
          />
          <CardMedia
            className={classes.media}
            image={this.props.image}
            title={this.props.imageTitle}
          />
          <CardContent>{this.props.children}</CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <Button
              color="primary"
              component={Link}
              to={`/groups:${this.props.id}`}
              onClick={() => this.props.handleEdit(false)}
            >
              View
            </Button>
            {isAdmin && (
              <Button
                variant="outlined"
                color="secondary"
                className={classes.btnRight}
                component={Link}
                to={`/groups:${this.props.id}`}
                onClick={() => this.props.handleEdit(true)}
              >
                Edit
              </Button>
            )}
          </CardActions>
        </Card>
      </Col>
    );
  }
}

GroupCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GroupCard);
