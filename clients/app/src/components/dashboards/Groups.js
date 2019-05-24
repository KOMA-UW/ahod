import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

    const JoinGroupLink = props => <Link to="/joingroup" {...props} />;
    return (
      <div>
        <CardHeading
          title="Your Cliques"
          btnText="Join Group"
          subTitle=""
          extraInfo=""
          btnLinkComponent={JoinGroupLink}
        />

        <GroupsList isAdmin={isAdmin} handleEdit={this.props.handleEdit} />
      </div>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
