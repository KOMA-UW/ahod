import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GroupCard from './GroupCard';
import { Container, Row, Col } from 'react-grid-system';

import CardHeading from './CardHeading';
import GroupsList from './GroupsList';

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

const Groups = props => {
  const { classes, isAdmin } = props;
  return (
    <React.Fragment>
      <Row align="center" className={classes.root}>
        <Col sm={8}>
          <CardHeading title="Your Cliques" />
        </Col>

        <Col sm={4} align="right">
          <Button variant="contained" color="secondary">
            Add Member
          </Button>
        </Col>
      </Row>

      <GroupsList isAdmin={isAdmin} handleEdit={props.handleEdit} />
    </React.Fragment>
  );
};

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
