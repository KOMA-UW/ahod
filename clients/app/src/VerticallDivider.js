import React, { Component } from 'react';

const styles = {
  root: {
    height: '100%',
    width: 1,
    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
  }
};
class VerticallDivider extends Component {
  render() {
    return <div style={styles.root} />;
  }
}

export default VerticallDivider;
