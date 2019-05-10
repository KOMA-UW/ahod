import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from '../SimpleCard';
import { Container, Row, Col } from 'react-grid-system';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Feed from './Feed';
import MembersTable from './Members';
import MakePayment from '../payment/MakePayment';
import GroupDetais from './GroupDetais';
import CircleView from '../circles/Circles';

const feeds = [
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '25 min ago',
    author: 'John Smith',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/remy.jpg'
  },
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '50 min ago',
    author: 'Sam Lou',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/uxceo-128.jpg'
  }
];
const styles = theme => ({
  btnContainer: {
    display: 'flex'
  },
  button: {
    marginLeft: 'auto',
    marginTop: 10
  }
});

class ViewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plea: ''
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
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container style={{ marginTop: 10 }}>
          <Row>
            <Col>
              <SimpleCard title="Make Payment" style={{ display: 'flex' }}>
                <MakePayment />
              </SimpleCard>
            </Col>
          </Row>
          <Row>
            <Col>
              <SimpleCard title="Your Clique" style={{ display: 'flex' }}>
                <CircleView />
              </SimpleCard>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <SimpleCard title="Group Details">
                <GroupDetais />
              </SimpleCard>

              <MembersTable />
            </Col>

            <Col sm={4} style={{ paddingTop: 0, marginTop: 0 }}>
              <Row style={{ paddingTop: 0, marginTop: 0 }}>
                <Col style={{ paddingTop: 0, marginTop: 0 }}>
                  {feeds.map((feed, index) => {
                    return (
                      <Feed
                        title={feed.title}
                        description={feed.description}
                        author={feed.author}
                        time={feed.time}
                        authorImg={feed.authorImg}
                      />
                    );
                  })}
                </Col>
              </Row>
              <Row>
                <Col>
                  <SimpleCard title="Make a request">
                    <p>Make a request to get paid this month!</p>
                    <form onSubmit={this.handleSubmit}>
                      <TextField
                        id="standard-full-width"
                        label="Request"
                        style={{ margin: 8 }}
                        placeholder="Enter your plea here!"
                        fullWidth
                        margin="normal"
                        value={this.state.plea}
                        onChange={this.handleChange}
                        InputLabelProps={{
                          shrink: true
                        }}
                      />
                      <div className={classes.btnContainer}>
                        <Button
                          variant="contained"
                          color="primary"
                          className={classes.button}
                          type="submit"
                        >
                          Submit
                        </Button>
                      </div>
                    </form>
                  </SimpleCard>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ViewGroup);
