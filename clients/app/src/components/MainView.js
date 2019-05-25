import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../Context';
import Loader from './Loader';
import Landing from './landing/Landing';
import Dashboard from './dashboards/Dashboard';
import classNames from 'classnames';

const styles = theme => ({
  content: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
  },
  marginLeft: {
    marginLeft: 240
  },
  marginNone: {
    margin: 75
  }
});
class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }
  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const { token, isAdmin, isEdit, currentUser } = this.props;
    const authenticated = token != null;
    return (
      <div>
        {loading ? (
          <Loader />
        ) : !authenticated ? (
          <Landing />
        ) : (
          <div
            className={classNames(classes.content, {
              [classes.marginLeft]: this.props.drawerOpen,
              [classes.marginNone]: !this.props.drawerOpen
            })}
          >
            <Dashboard
              isAdmin={isAdmin}
              isEdit={isEdit}
              currentUser={currentUser}
              handleEdit={this.props.handleEdit}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(withStyles(styles)(MainView));
