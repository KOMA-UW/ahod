import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import { Typography } from '@material-ui/core';

class CardHeading extends Component {
  render() {
    const { title, subTitle } = this.props;
    return (
      <div>
        <Row style={{ marginTop: 25 }}>
          <Col sm={12}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1" style={{ color: '#a6a5a5' }}>
              {subTitle}
            </Typography>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CardHeading;
