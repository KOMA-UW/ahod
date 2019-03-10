import React from "react";

export const AuthContext = React.createContext();

export const withAuth = WrappedComponent => {
  return class Authenticated extends React.Component {
    render() {
      return (
        <AuthContext.Consumer>
          {value => <WrappedComponent {...value} {...this.props} />}
        </AuthContext.Consumer>
      );
    }
  };
};
