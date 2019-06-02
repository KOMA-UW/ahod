import React, { Component } from 'react';
import SimpleCard from '../../SimpleCard';
import CircleView from '../../circles/Circles';
import Button from '@material-ui/core/Button';
import ReplayIcon from '@material-ui/icons/Replay';
import { Typography } from '@material-ui/core';
import _ from 'lodash';

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
      winner: undefined,
      centerText: 'Drawing'
    });

    setTimeout(() => {
      this.setState({
        startDraw: false,
        winner: _.random(0, 15)
      });
    }, 4000);
  };
  render() {
    return (
      <div style={{ marginTop: 30, textAlign: 'center' }}>
        <SimpleCard>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleDraw}
            style={{ marginBottom: 20 }}
            className={this.state.startDraw ? 'pulse' : ''}
          >
            Draw Winner
            <ReplayIcon />
          </Button>
          <CircleView
            rotate={this.state.startDraw}
            winner={this.state.winner}
            centerText={this.state.centerText}
          />
        </SimpleCard>
      </div>
    );
  }
}

export default DrawPanel;
