import React, { Component } from 'react';
import { Row, Col } from 'react-grid-system';
import { Calendar } from 'material-ui-next-pickers';

class SmallCalendar extends Component {
  render() {
    return (
      <div>
        <Row align="center" justify="center" style={{ padding: 15 }}>
          <Col sm={10}>
            <Calendar renderDay={() => <h1>one</h1>} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SmallCalendar;
