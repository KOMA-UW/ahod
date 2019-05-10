import React from 'react';
import { withAuth } from '../Context';
import Loader from './Loader';
import Landing from './landing/Landing';
import Dashboard from './dashboards/Dashboard';

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
          <Dashboard
            isAdmin={isAdmin}
            isEdit={isEdit}
            currentUser={currentUser}
            handleEdit={this.props.handleEdit}
          />
        )}
        )
      </div>
    );
  }
}

export default withAuth(MainView);
