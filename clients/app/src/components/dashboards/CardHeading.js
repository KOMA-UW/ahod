import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import { Button, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    marginBottom: 20
  }
});
class CardHeading extends Component {
  render() {
    const {
      classes,
      title,
      subTitle,
      btnText,
      extraInfo,
      btnLinkComponent
    } = this.props;
    return (
      <div>
        <Row className={classes.root}>
          <Col sm={8}>
            <Typography variant="h6">{title}</Typography>
          </Col>
          <Col sm={4} align="right">
            {btnText && (
              <Button
                variant="contained"
                color="secondary"
                component={btnLinkComponent}
              >
                {btnText}
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <Typography variant="body1" style={{ color: '#a6a5a5' }}>
              {subTitle}
            </Typography>
          </Col>
          <Col sm={5}>
            <Typography variant="body1" style={{ color: '#a6a5a5' }}>
              {extraInfo}
            </Typography>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(CardHeading);
