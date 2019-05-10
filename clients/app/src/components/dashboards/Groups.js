import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GroupCard from './GroupCard';
import { Container, Row, Col } from 'react-grid-system';
import group_1 from '../../img/group_1.jpg';
import group_2 from '../../img/group_2.jpg';
import group_3 from '../../img/group_3.jpg';
import group_4 from '../../img/group_4.jpg';

const styles = theme => ({
  root: {
    marginTop: 40
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
const groups = [
  {
    name: 'Group AHOD',
    image: group_1,
    dateJoined: 'Mar. 18, 2019'
  },
  {
    name: 'Group KOMA',
    image: group_2,
    dateJoined: 'Jan. 11, 2019'
  },
  {
    name: 'Group Students',
    image: group_3,
    dateJoined: 'Dec. 12, 2018'
  },
  {
    name: 'Grannies United',
    image: group_4,
    dateJoined: 'Mar. 2, 2019'
  }
];
const Groups = props => {
  const { classes, isAdmin } = props;
  return (
    <Container className={classes.root}>
      <Row>
        {groups.map((group, index) => (
          <Col key={index} sm={4} style={{ marginBottom: 25 }}>
            <GroupCard
              title={group.name}
              image={group.image}
              adminAvatar={`https://material-ui.com/static/images/avatar/${index +
                1}.jpg`}
              className={classes.card}
              dateCreated={`Member since: ${group.dateJoined}`}
              id={index + 1}
              isAdmin={isAdmin}
              handleEdit={props.handleEdit}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
