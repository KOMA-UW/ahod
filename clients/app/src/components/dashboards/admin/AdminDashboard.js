import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import CardHeading from '../CardHeading';
import MembersList from '../../members/MembersList';
import { Container, Row, Col } from 'react-grid-system';

const styles = theme => ({
  root: {
    marginTop: 100
  }
});
class AdminDashboard extends Component {
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
    const { classes } = this.props;
    const AddMemberLink = props => <Link to="/add-member" {...props} />;
    return (
      <div>
        <CardHeading
          title="Participants: 6"
          btnText="Add Member"
          subTitle="Group ID: 2592952"
          extraInfo="Location: Seattle, WA"
          btnLinkComponent={AddMemberLink}
        />
        <MembersList />
      </div>
    );
  }
}

export default withStyles(styles)(AdminDashboard);
