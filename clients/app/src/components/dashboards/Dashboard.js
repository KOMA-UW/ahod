import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../../Context';
import { Container, Row, Col } from 'react-grid-system';
import Groups from './Groups';

const styles = theme => ({
  root: {
    marginLeft: '100px !important',
    marginRight: '100px !important',
    paddingLeft: '100px !important'
  }
});

class Dashboard extends React.Component {
  render() {
    const { isAdmin, isEdit, currentUser, classes } = this.props;
    const { firstName, lastName } = currentUser | '';

    return (
      <div>
        <Container fluid className={classes.root}>
          <Groups
            isAdmin={isAdmin}
            isEdit={isEdit}
            handleEdit={this.props.handleEdit}
          />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
