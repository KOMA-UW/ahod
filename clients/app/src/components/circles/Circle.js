import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 50,
    height: 50
  },
  circ: {
    position: 'absolute',
    [theme.breakpoints.down('sm')]: {
      width: 40,
      height: 40
    },
    [theme.breakpoints.up('md')]: {
      width: 40,
      height: 40
    },
    [theme.breakpoints.up('lg')]: {
      width: 40,
      height: 40
    },
    margin: 0,
    padding: 0,

    borderRadius: '50%',
    // border: '1px solid #7d7272a6',
    '&::after': {
      content: `''`,
      position: 'absolute',
      left: '-50px',
      top: '50px',
      width: '0',
      height: '0',
      border: '50px solid transparent'
    }
  },
  triangle: {
    width: 2,
    height: 2,
    borderLeft: '50px solid transparent',
    borderRight: '50px solid transparent',
    borderBottom: '100px solid red'
  },

  month: {
    position: 'absolute',
    textAlign: 'center'
  },
  hover: {
    opacity: 0.5,
    cursor: 'pointer'
  }
});

class Circle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseIn: false
    };
  }

  handleMouseEnter = text => {
    this.setState({
      mouseIn: true
    });
    this.props.handleImageHover(text);
  };
  handleMouseLeave = text => {
    this.setState({
      mouseIn: false
    });
    this.props.handleMouseLeave(text);
  };
  render() {
    const { classes } = this.props;
    const { text, image } = this.props;

    const mouseClass = this.state.mouseIn ? classes.hover : '';
    return (
      <Avatar
        src={this.props.image}
        className={classNames(
          classes.circ,
          mouseClass,
          'hvr-bounce-in',
          'pulse'
        )}
        style={{ top: this.props.top, left: this.props.left }}
        data={this.props.text}
        onMouseEnter={() => this.handleMouseEnter(image)}
        onMouseLeave={this.handleMouseLeave}
      />
    );
  }
}

export default withStyles(styles)(Circle);
