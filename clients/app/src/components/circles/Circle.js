import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Typography } from '@material-ui/core';
import classNames from 'classnames';

const styles = {
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  circ: {
    position: 'absolute',
    width: 60,
    height: 60,

    borderRadius: 100,
    border: '2px solid #2d3644',
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
};

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
  handleMouseLeave = () => {
    this.setState({
      mouseIn: false
    });
  };
  render() {
    const { classes } = this.props;
    const { text } = this.props;
    const mouseClass = this.state.mouseIn ? classes.hover : '';
    return (
      <div>
        <Avatar
          src={this.props.image}
          className={classNames(classes.circ, mouseClass)}
          style={{ top: this.props.top, left: this.props.left }}
          data={this.props.text}
          onMouseEnter={() => this.handleMouseEnter(text)}
          onMouseLeave={this.handleMouseLeave}
        />

        {/* <Typography
          className={classes.month}
          style={{ top: this.props.top, left: this.props.left }}
        >
          Month
        </Typography> */}
      </div>
    );
  }
}

export default withStyles(styles)(Circle);
