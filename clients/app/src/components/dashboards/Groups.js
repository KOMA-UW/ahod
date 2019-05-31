import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import GroupCard from './GroupCard';
import { Container, Row, Col } from 'react-grid-system';

import CardHeading from './CardHeading';
import GroupsList from './GroupsList';
import JoinGroup from '../onboarding/JoinGroup';

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
    margin: theme.spacing(1)
  },
  editBtn: {
    marginLeft: 'auto'
  },
  form: {
    marginBottom: 10
  }
});

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGroupJoin: false
    };
  }

  handleJoinGroup = () => {
    this.setState({ showGroupJoin: true });
  };
  render() {
    const { classes, isAdmin } = this.props;
    const { showGroupJoin } = this.state;
    const JoinGroupLink = props => <Link to="/joingroup" {...props} />;
    return (
      <div>
        <CardHeading
          title="Your Cliques"
          btnText="Join Group"
          subTitle=""
          extraInfo=""
          showNeWComponent={this.handleJoinGroup}
        />
        {showGroupJoin && (
          <div className={classes.form}>
            <JoinGroup />
          </div>
        )}
        <GroupsList isAdmin={isAdmin} handleEdit={this.props.handleEdit} />
      </div>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
