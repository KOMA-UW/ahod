import React, { Component } from 'react';
import MembersList from '../../members/MembersList';
import CenteredLeftPadding from '../../CenteredLeftPadding';
import Profile from '../../profile/Profile';

class AdminMemberView extends Component {
  render() {
    const { drawerOpen } = this.props;
    console.log(this.props);
    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <Profile />
      </CenteredLeftPadding>
    );
  }
}

export default AdminMemberView;
