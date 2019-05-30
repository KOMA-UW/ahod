import React, { Component } from 'react';
import Members from './admin/Members';
import CenteredLeftPadding from '../CenteredLeftPadding';
class EditGroup extends Component {
  render() {
    const { drawerOpen } = this.props;
    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <Members />
      </CenteredLeftPadding>
    );
  }
}

export default EditGroup;
