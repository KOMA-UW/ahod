import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GroupCard from './GroupCard';
import { Container, Row, Col } from 'react-grid-system';
import CardHeading from './CardHeading';

import group_1 from '../../img/group_1.jpg';
import group_2 from '../../img/group_2.jpg';
import group_3 from '../../img/group_3.jpg';
import group_4 from '../../img/group_4.jpg';

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
    margin: theme.spacing(1)
  },
  editBtn: {
    marginLeft: 'auto'
  }
});

class GroupsList extends Component {
  render() {
    const { classes, isAdmin, drawerOpen } = this.props;
    return (
      <Row>
        {groups.map((group, index) => (
          <Col
            key={index}
            xs={12}
            sm={12}
            md={6}
            lg={4}
            style={{ marginBottom: 25 }}
          >
            <GroupCard
              title={group.name}
              groupImage={group.image}
              adminAvatar={`https://material-ui.com/static/images/avatar/${index +
                1}.jpg`}
              className={classes.card}
              dateCreated={`Member since: ${group.dateJoined}`}
              id={index + 1}
              isAdmin={isAdmin}
              drawerOpen={drawerOpen}
              handleEdit={this.props.handleEdit}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

export default withStyles(styles)(GroupsList);
