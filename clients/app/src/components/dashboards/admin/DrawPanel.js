import React, { Component } from 'react';
import SimpleCard from '../../SimpleCard';
import CircleView from '../../circles/Circles';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import { Typography } from '@material-ui/core';

class DrawPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDraw: false
    };
  }
  handleDraw = () => {
    this.setState({
      startDraw: true,
      winner: undefined
    });

    setTimeout(() => {
      this.setState({
        startDraw: false,
        winner: 3
      });
    }, 4000);
  };
  render() {
    return (
      <SimpleCard>
        <Button variant="contained" color="primary" onClick={this.handleDraw}>
          Draw
          <ReplayIcon />
        </Button>
        <CircleView rotate={this.state.startDraw} winner={this.state.winner} />
      </SimpleCard>
    );
  }
}

export default DrawPanel;
