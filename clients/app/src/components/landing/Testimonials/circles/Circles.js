import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Circle from "./Circle";
import classNames from "classnames";
import aMember from "../../../../img/group_1.jpg";
import { Container, Row, Col } from "react-grid-system";
import { Typography, Divider } from "@material-ui/core";

const members = [
  {
    name: "John",
    photoUrl: "https://material-ui.com/static/images/avatar/1.jpg",
    text:
      "With Clique, I have paid my student debt off much faster. And now I can finally relax and spend money on things I will enjoy. "
  },
  {
    name: "Sam",
    photoUrl: "https://material-ui.com/static/images/avatar/2.jpg",
    text: "I was planning for a vacation and Clique helped me save up for it!"
  },
  {
    name: "Tammy",
    photoUrl: "https://material-ui.com/static/images/avatar/3.jpg",
    text:
      "Clique acted like a saving account for me, and helped me actually save instead of spending it on things I didn't need."
  },
  {
    name: "Wendy",
    photoUrl: "https://material-ui.com/static/images/avatar/4.jpg",
    text: "Clique helped me plan for my dream wedding!"
  },
  {
    name: "Jarvis",
    photoUrl: "https://material-ui.com/static/images/avatar/5.jpg",
    text: "I am finally student-debt free! All thanks to Clique!"
  },
  {
    name: "Stuart",
    photoUrl: "https://material-ui.com/static/images/avatar/6.jpg",
    text:
      "Clique was a way for me to connect with my distant family. It really brought us together!"
  },
  {
    name: "Anita",
    photoUrl: "https://material-ui.com/static/images/avatar/7.jpg",
    text:
      "I needed to pay off my car loans for my new Mercedes. Clique helped me pay them off in the most efficient way possible. "
  },
  {
    name: "Akram",
    photoUrl: "https://material-ui.com/static/images/avatar/2.jpg",
    text:
      "I just needed a quick, big chunk of money, and by using Clique I was able to get it, and then helped my other Clique members get their payouts."
  },
  {
    name: "Nick",
    photoUrl: "https://material-ui.com/static/images/avatar/6.jpg",
    text: "I am debt free!"
  },
  {
    name: "Ada",
    photoUrl: aMember,
    text:
      "I wanted to buy my parents a home, and had a little bit left. Clique helped me get that tiny amount to buy the house!"
  }
];

const styles = {
  root: {
    position: "relative",
    width: 240,
    height: 240,
    // border: '2px solid black',
    borderRadius: "150px",
    margin: 150,
    backgroundColor: "#cfc8c16b"
    // backgroundImage: `url(${aMember})`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'auto',
    // backgroundPosition: '50% 50%',
    // bbackgroundClip: 'padding-box'
  },
  text: {
    padding: 20
  }
};

const mainCircle = 360 / members.length;
const radius = 190;
const offsetToParentCenter = 240 / 2.0;
const offsetToChildren = 30;

const totalOffset = offsetToParentCenter - offsetToChildren;
class CircleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    // this.handleHover = this.handleHover.bind(this);
  }

  // handleHover(event) {
  //   console.log(event);
  //   this.setState({
  //     text: event
  //   });
  // }

  render() {
    const { classes } = this.props;

    const cliqueMembers = members.map((member, i) => {
      const y = Math.sin(mainCircle * i * (Math.PI / 180)) * radius;
      const x = Math.cos(mainCircle * i * (Math.PI / 180)) * radius;
      const top = (y + totalOffset).toString() + "px";
      const left = (x + totalOffset).toString() + "px";

      const item = (
        <Circle
          key={i}
          image={member.photoUrl}
          top={top}
          left={left}
          handleImageClick={this.props.handleImageClick}
          user={member}
        />
      );
      return item;
    });

    return (
      <div>
        <Container>
          <Row>
            <Col md={7}>
              <div className={classes.root}>{cliqueMembers}</div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(CircleView);
