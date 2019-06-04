import React, { Component } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { withAuth } from '../../../Context';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import SimpleCard from '../../SimpleCard';
import { Container, Row, Col } from 'react-grid-system';
import events from './events';
import CenteredLeftPadding from '../../CenteredLeftPadding';

const localizer = BigCalendar.momentLocalizer(moment);

const style = {
  height: '80vh',
  cursor: 'pointer'
};
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    };
  }

  onChangeDate = (date: Date) => {
    console.log('Date: ', date);
    this.setState({ date });
  };
  onChangeTime = (time: Date) => {
    console.log('Time: ', time);
    this.setState({ time });
  };
  render() {
    const { date, time } = this.state;
    const { drawerOpen } = this.props;

    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <Container>
          <Row>
            <Col>
              <SimpleCard>
                <BigCalendar
                  style={style}
                  selectable
                  views={['month']}
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                />
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </CenteredLeftPadding>
    );
  }
}

export default withAuth(Calendar);
