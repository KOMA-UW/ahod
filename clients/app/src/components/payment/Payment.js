import React, { Component } from "react";
import SimpleCard from "../SimpleCard";
import { Container, Row, Col } from "react-grid-system";
import MakePayment from "./MakePayment";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ImageIcon from "@material-ui/icons/Image";
import Avatar from "@material-ui/core/Avatar";
const payments = [
  {
    month: "January",
    status: "paid"
  },
  {
    month: "Feburary",
    status: "paid"
  },
  {
    month: "March",
    status: "paid"
  },
  {
    month: "April",
    status: "pending"
  }
];
class Payment extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col sm={8}>
              <SimpleCard title="Payment History">
                <List>
                  {payments.map((payment, index) => {
                    return (
                      <ListItem>
                        <Avatar
                          style={{ backgroundColor: "#purple !important" }}
                        >
                          Jan
                        </Avatar>
                        <ListItemText
                          primary={payment.month}
                          secondary={payment.status}
                        />
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
      </div>
    );
  }
}

export default Payment;
