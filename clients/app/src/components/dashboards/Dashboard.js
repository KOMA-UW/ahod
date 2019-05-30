import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../../Context';
import { Container, Row, Col } from 'react-grid-system';
import Groups from './Groups';

const styles = theme => ({
  root: {
    marginTop: 100
  }
});

class Dashboard extends React.Component {
  render() {
    const { isAdmin, isEdit, currentUser, drawerOpen, classes } = this.props;
    const { firstName, lastName } = currentUser | '';

    return (
      <div>
        <Groups
          isAdmin={isAdmin}
          isEdit={isEdit}
          drawerOpen={drawerOpen}
          handleEdit={this.props.handleEdit}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
