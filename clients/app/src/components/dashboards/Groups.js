import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GroupCard from './GroupCard';
import { Container, Row, Col } from 'react-grid-system';

import CardHeading from './CardHeading';
import GroupsList from './GroupsList';
import AddMemberDialog from '../members/AddMember';

const styles = theme => ({
  root: {
    marginTop: 100,
    marginBottom: 20
  },
  card: {
    margin: 20
  },
  a: {
    textDecoration: 'none',
    color: 'inherent'
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  button: {
    margin: theme.spacing.unit
  },
  editBtn: {
    marginLeft: 'auto'
  }
});

class Groups extends React.Component {
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
    const { classes, isAdmin } = this.props;
    return (
      <React.Fragment>
        <Row align="center" className={classes.root}>
          <Col sm={8}>
            <CardHeading title="Your Cliques" />
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

        <GroupsList isAdmin={isAdmin} handleEdit={this.props.handleEdit} />
        <AddMemberDialog
          open={this.state.open}
          handleClose={this.handleClose}
        />
      </React.Fragment>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
