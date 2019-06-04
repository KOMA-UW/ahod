import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GroupCard from './GroupCard';
import { Container, Row, Col } from 'react-grid-system';
import CardHeading from './CardHeading';
import { API_URL } from '../../constants';

import group_1 from '../../img/group_1.jpg';
import group_2 from '../../img/group_2.jpg';
import group_3 from '../../img/group_3.jpg';
import group_4 from '../../img/group_4.jpg';

const groups = [
  {
    name: 'Group AHOD',
    image: group_1,
    dateJoined: 'Mar. 18, 2019',
    users: [1, 2, 3]
  },
  {
    name: 'Group KOMA',
    image: group_2,
    dateJoined: 'Jan. 11, 2019',
    users: [4, 5, 6]
  },
  {
    name: 'Group Students',
    image: group_3,
    dateJoined: 'Dec. 12, 2018',
    users: [7, 1, 3]
  },
  {
    name: 'Grannies United',
    image: group_4,
    dateJoined: 'Mar. 2, 2019',
    users: [2, 4, 6]
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
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }
  /*
  componentDidMount() {
    this.setState({
      loading: true
    });
    const { data } = this.state;
    const sessionToken = window.localStorage.getItem('auth');
    const id = window.localStorage.getItem('id');

    fetch(`${API_URL}/members/${id}/groups`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionToken
      }
    })
      .then(res => {
        if (res.status < 300) {
          return res.json();
        }

        //if response not ok
        return res.text();
      })
      .then(data => {
        this.setState({
          loading: false,
          // groups: data,
          groupID: data['groups'][0]
        });

        fetch(`${API_URL}/groups/${this.state.groupID}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: sessionToken
          }
        })
          .then(res => {
            if (res.status < 300) {
              return res.json();
            }

            //if response not ok
            return res.text();
          })
          .then(data => {
            this.setState({
              loading: false,
              groups: data
            });
            if (typeof data === 'string') {
              throw Error(data);
            }
          })
          .catch(err => {
            this.setState({
              error: true,
              errorMessage: err.message
            });
          });
        if (typeof data === 'string') {
          throw Error(data);
        }
      })
      .catch(err => {
        this.setState({
          error: true,
          errorMessage: err.message
        });
      });
  }
  */
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
              users={group.users}
            />
          </Col>
        ))}
      </Row>
    );
  }
}

export default withStyles(styles)(GroupsList);
