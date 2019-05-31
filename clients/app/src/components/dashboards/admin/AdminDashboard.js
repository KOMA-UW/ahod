import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../../../Context';
import CardHeading from '../CardHeading';
import MembersList from '../../members/MembersList';
import CenteredLeftPadding from '../../CenteredLeftPadding';
import AddMember from './AddMember';
import NextCycle from '../GroupView/NextCycle';

const styles = theme => ({
  root: {
    marginTop: 100
  }
});
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMemberAdd: false
    };
  }

  handleMemberAdd = () => {
    this.setState({ showMemberAdd: true });
  };

  render() {
    const { classes, drawerOpen } = this.props;
    const { showMemberAdd } = this.state;
    const AddMemberLink = props => <Link to="/add-member" {...props} />;
    // const JoinGroupLink = props => <Link to="/joingroup" {...props} />;

    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <CardHeading
          title="Participants: 6"
          btnText="Add Member"
          subTitle="Group ID: 2592952"
          extraInfo="Location: Seattle, WA"
          showNeWComponent={this.handleMemberAdd}
        />
        {showMemberAdd && <AddMember />}
        {/* <NextCycle /> add a draw feature */}
        <MembersList />
      </CenteredLeftPadding>
    );
  }
}
AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withAuth(withStyles(styles)(AdminDashboard));
