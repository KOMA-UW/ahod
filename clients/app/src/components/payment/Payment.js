import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../../Context';
import SimpleCard from '../SimpleCard';
import { Container, Row, Col } from 'react-grid-system';
import MakePayment from './MakePayment';
import deepOrange from '@material-ui/core/colors/deepOrange';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ImageIcon from '@material-ui/icons/Image';
import Avatar from '@material-ui/core/Avatar';
import CenteredLeftPadding from '../CenteredLeftPadding';
import Divider from '@material-ui/core/Divider';
const payments = [
  {
    month: 'January',
    status: 'paid'
  },
  {
    month: 'Feburary',
    status: 'paid'
  },
  {
    month: 'March',
    status: 'paid'
  },
  {
    month: 'April',
    status: 'paid'
  },
  {
    month: 'May',
    status: 'paid'
  },
  {
    month: 'June',
    status: 'pending'
  }
];

const styles = theme => ({
  orangeAvatar: {
    margin: 10,
    width: 50,
    height: 50,
    color: '#fff',
    backgroundColor: deepOrange[500]
  }
});
class Payment extends Component {
  render() {
    const { classes, drawerOpen } = this.props;
    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <Container>
          <Row>
            <Col sm={8}>
              <SimpleCard title="Payment History">
                <List>
                  {payments.map((payment, index) => {
                    return (
                      <ListItem key={index}>
                        <Avatar className={classes.orangeAvatar}>
                          {payment.month.substring(0, 3)}
                        </Avatar>
                        <ListItemText
                          primary={payment.month}
                          secondary={payment.status}
                          style={{
                            paddingLeft: 10
                          }}
                        />
                        <Divider />
                      </ListItem>
                    );
                  })}
                </List>
              </SimpleCard>
            </Col>
            <Col sm={4}>
              <SimpleCard title="Make a Payment">
                <MakePayment />
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </CenteredLeftPadding>
    );
  }
}

export default withAuth(withStyles(styles)(Payment));
