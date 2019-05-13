import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Circle from './Circle';
import classNames from 'classnames';
import aMember from '../../img/group_1.jpg';
import { Container, Row, Col } from 'react-grid-system';
import { Typography, Divider } from '@material-ui/core';

const members = [
  {
    name: 'John',
    photoUrl: 'https://material-ui.com/static/images/avatar/1.jpg',
    details: 'Some details'
  },
  {
    name: 'Sam',
    photoUrl: 'https://material-ui.com/static/images/avatar/2.jpg'
  },
  {
    name: 'Tom',
    photoUrl: 'https://material-ui.com/static/images/avatar/3.jpg'
  },
  {
    name: 'Wendy',
    photoUrl: 'https://material-ui.com/static/images/avatar/4.jpg'
  },
  {
    name: 'Melody',
    photoUrl: 'https://material-ui.com/static/images/avatar/5.jpg'
  },
  {
    name: 'Stuart',
    photoUrl: 'https://material-ui.com/static/images/avatar/6.jpg'
  },
  {
    name: 'Anita',
    photoUrl: 'https://material-ui.com/static/images/avatar/7.jpg'
  },
  {
    name: 'Mary',
    photoUrl: 'https://material-ui.com/static/images/avatar/2.jpg'
  },
  {
    name: 'Nina',
    photoUrl: 'https://material-ui.com/static/images/avatar/6.jpg'
  },
  {
    name: 'Ada',
    photoUrl: aMember
  }
];

const groupDetails = {
  capital: '$10,000',
  individualMonthly: '$1,000 / month',
  winnerPotential: '$10,000 / month'
};

const styles = {
  root: {
    // display: 'flex'
  },
  bigCircle: {
    position: 'relative',
    width: 300,
    height: 300,

    borderRadius: '150px',
    margin: 150,
    backgroundColor: '#cfc8c16b'
  },
  text: {
    padding: 20
  },
  circleInner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  centerWrapper: {
    display: 'table',
    width: '100%',
    height: '100%'
  },
  center: {
    display: 'table-cell',

    textAlign: 'center',
    padding: '1em',
    verticalAlign: 'middle'
  },
  titles: {
    padding: 5
  }
};

const mainCircle = 360 / members.length;
const radius = 190;
const offsetToParentCenter = styles.bigCircle.height / 2.0;
const offsetToChildren = 30;

const totalOffset = offsetToParentCenter - offsetToChildren;
class CircleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      userDetails: false
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleHover(event) {
    console.log(event);
    this.setState({
      text: event,
      userDetails: true
    });
  }

  handleMouseLeave(event) {
    this.setState({
      userDetails: false
    });
  }

  render() {
    const { classes } = this.props;

    const cliqueMembers = members.map((member, i) => {
      const y = Math.sin(mainCircle * i * (Math.PI / 180)) * radius;
      const x = Math.cos(mainCircle * i * (Math.PI / 180)) * radius;
      const top = (y + totalOffset).toString() + 'px';
      const left = (x + totalOffset).toString() + 'px';

      const item = (
        <Circle
          key={i}
          image={member.photoUrl}
          top={top}
          left={left}
          handleImageHover={this.handleHover}
          handleMouseLeave={this.handleMouseLeave}
          text={member.name}
        />
      );
      return item;
    });

    return (
      <div>
        <Container>
          <Row justify="center">
            <Col md={8}>
              <div className={classes.root}>
                <div className={classes.bigCircle}>
                  <div className={classes.circleInner}>
                    <div className={classes.centerWrapper}>
                      <div className={classes.center}>
                        {this.state.userDetails ? (
                          <p>{this.state.text}</p>
                        ) : (
                          <React.Fragment>
                            <Typography
                              variant="title"
                              inline
                              color="textSecondary"
                              className={classes.titles}
                            >
                              Capital:
                            </Typography>
                            <Typography variant="body1" inline>
                              {groupDetails.capital}
                            </Typography>
                            <div />
                            <Typography
                              variant="title"
                              inline
                              color="textSecondary"
                              className={classes.titles}
                            >
                              Contribution:
                            </Typography>
                            <Typography variant="body1" inline>
                              {groupDetails.individualMonthly}
                            </Typography>
                            <div />
                            <Typography
                              variant="title"
                              inline
                              color="textSecondary"
                              className={classes.titles}
                            >
                              Winnings:
                            </Typography>
                            <Typography variant="body1" inline>
                              {groupDetails.winnerPotential}
                            </Typography>
                          </React.Fragment>
                        )}
                      </div>
                    </div>
                  </div>

                  {cliqueMembers}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(CircleView);
