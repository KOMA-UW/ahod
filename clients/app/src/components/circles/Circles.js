import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Circle from './Circle';
import aMember from '../../img/group_1.jpg';
import { Container, Row, Col } from 'react-grid-system';
import classNames from 'classnames';
import { Avatar, Typography } from '@material-ui/core';

let members = [
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
  },
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
  },
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
  }
];

members = members.splice(0, 15);

const circleWidth = members.length * 15;

const groupDetails = {
  capital: '$10,000',
  individualMonthly: '$1,000 / month',
  winnerPotential: '$10,000 / month'
};

const styles = theme => ({
  root: {
    // display: 'flex',
    padding: circleWidth - 150
  },
  bigCircle: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      width: circleWidth - 30,
      height: circleWidth - 30
    },
    [theme.breakpoints.up('md')]: {
      width: circleWidth - 15,
      height: circleWidth - 15
    },
    [theme.breakpoints.up('lg')]: {
      width: circleWidth - 15,
      height: circleWidth - 15
    },

    borderRadius: '50%',
    margin: 5,
    //backgroundColor: '#cfc8c16b',//theme.palette.primary.light,
    cursor: 'pointer'
  },
  text: {
    padding: 20
  },
  circleInner: {
    backgroundColor: '#cfc8c16b',
    borderRadius: '50%',
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
});

const mainCircle = 360 / members.length;
const radius = circleWidth / 3 + 80;
const offsetToParentCenter = circleWidth / 2;
const offsetToChildren = (circleWidth * 2) / members.length;

const totalOffset = offsetToParentCenter - offsetToChildren;
class CircleView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      userDetails: false,
      userImage: ''
    };
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleHover(image) {
    console.log(image);
    this.setState({
      text: 'event',
      userDetails: true,
      userImage: image
    });
  }

  handleMouseLeave(event) {
    this.setState({
      userDetails: false,
      userImage: ''
    });
  }

  render() {
    console.log('members', members.length);
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
          className="hvr-bounce-in"
        />
      );
      return item;
    });

    return (
      <Row>
        <Col align="center">
          <div className={classes.root}>
            <div className={classNames(classes.bigCircle)}>
              <div
                className={classNames(
                  classes.circleInner,
                  'hvr-bounce-in',
                  'pulse'
                )}
              >
                <div className={classes.centerWrapper}>
                  <div className={classNames(classes.center)}>
                    {this.state.userDetails ? (
                      <React.Fragment>
                        <Avatar
                          src={this.state.userImage}
                          className={classNames(classes.centerWrapper)}
                        />
                        {/*                         

                        <Typography
                          variant="body2"
                          display="inline"
                          color="textSecondary"
                          className={classes.titles}
                        >
                          {this.state.text}
                        </Typography>

                        <Typography variant="body1" display="inline">
                          : Paid
                        </Typography> */}
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography
                          variant="body1"
                          display="inline"
                          color="primary"
                          className={classes.titles}
                        >
                          Capital:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          {groupDetails.capital}
                        </Typography>
                        <div />
                        <Typography
                          variant="body1"
                          display="inline"
                          color="primary"
                          className={classes.titles}
                        >
                          Contribution:
                        </Typography>
                        <Typography variant="body2" display="inline">
                          {groupDetails.individualMonthly}
                        </Typography>
                        <div />
                        <Typography
                          variant="body1"
                          display="inline"
                          color="primary"
                          className={classes.titles}
                        >
                          Winnings:
                        </Typography>
                        <Typography variant="body2" display="inline">
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
    );
  }
}

export default withStyles(styles)(CircleView);
