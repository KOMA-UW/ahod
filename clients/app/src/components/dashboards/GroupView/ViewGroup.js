import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from '../../SimpleCard';
import { Container, Row, Col } from 'react-grid-system';
import GroupDetais from './GroupDetais';
import { Typography, Divider } from '@material-ui/core';
import TopButtons from './TopButtons';
import CardHeading from '../CardHeading';
import CardPairs from './CardPairs';
import YourClique from './YourClique';
import FeedList from './FeedList';
import MembersList from '../../members/MembersList';
import SmallCalendar from './SmallCalendar';
import Plea from './Plea';
import Payment from './Payment';

const styles = theme => ({
  btnContainer: {
    display: 'flex'
  },
  button: {
    marginLeft: 'auto',
    marginTop: 10,
    margin: 20
  }
});

class ViewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPayment: false,
      showPlea: false
    };
  }
  handleChange = e => {
    this.setState({
      plea: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log('your plea ' + this.state.plea + ' was submitted');
    this.setState({
      plea: ''
    });
  };

  handlePleaShow = () =>
    this.setState({
      showPlea: true,
      showPayment: false
    });
  handlePaymentShow = () =>
    this.setState({
      showPlea: false,
      showPayment: true
    });
  render() {
    const { classes } = this.props;
    const { showPayment, showPlea } = this.state;
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <TopButtons
              showPayment={this.handlePaymentShow}
              showPlea={this.handlePleaShow}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {showPayment && <Payment />}
            {showPlea && <Plea />}
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12} lg={8}>
            <CardPairs />
            <CardHeading title="Your Clique" subTitle="" />
            <YourClique />
          </Col>
          <Col md={12} lg={4}>
            <SimpleCard noPadding={true}>
              <SmallCalendar />
              <Divider />
              <FeedList />
            </SimpleCard>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(styles)(ViewGroup);
