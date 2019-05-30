import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../Context';
import Loader from './Loader';
import Landing from './landing/Landing';
import Dashboard from './dashboards/Dashboard';
import classNames from 'classnames';
import { Container } from 'react-grid-system';

const styles = theme => ({
  root: {
    marginTop: 100
  },
  content: {
    transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)'
  },
  marginLeft: {
    marginLeft: 250
  },
  marginNone: {
    margin: 75,
    marginLeft: 150
  }
});

class CenteredLeftPadding extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container fluid className={classes.root}>
        <div
          className={classNames(classes.content, {
            [classes.marginLeft]: this.props.drawerOpen,
            [classes.marginNone]: !this.props.drawerOpen
          })}
        >
          {this.props.children}
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(CenteredLeftPadding);
