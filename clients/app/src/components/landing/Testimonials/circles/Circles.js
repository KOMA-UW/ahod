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
    text: "Some details about John"
  },
  {
    name: "Sam",
    photoUrl: "https://material-ui.com/static/images/avatar/2.jpg",
    text: "Some details about John"
  },
  {
    name: "Tom",
    photoUrl: "https://material-ui.com/static/images/avatar/3.jpg",
    text: "Some details about John"
  },
  {
    name: "Wendy",
    photoUrl: "https://material-ui.com/static/images/avatar/4.jpg",
    text: "Some details about John"
  },
  {
    name: "Melody",
    photoUrl: "https://material-ui.com/static/images/avatar/5.jpg",
    text: "Some details about John"
  },
  {
    name: "Stuart",
    photoUrl: "https://material-ui.com/static/images/avatar/6.jpg",
    text: "Some details about John"
  },
  {
    name: "Anita",
    photoUrl: "https://material-ui.com/static/images/avatar/7.jpg",
    text: "Some details about John"
  },
  {
    name: "Mary",
    photoUrl: "https://material-ui.com/static/images/avatar/2.jpg",
    text: "Some details about John"
  },
  {
    name: "Nina",
    photoUrl: "https://material-ui.com/static/images/avatar/6.jpg",
    text: "Some details about John"
  },
  {
    name: "Ada",
    photoUrl: aMember,
    text: "Some details about John"
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
