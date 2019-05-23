import React from 'react';
// import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../SimpleCard';
import StepperOnBoard from './StepperOnBoard';
import JoinGroup from './JoinGroup';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  },
  iconSmall: {
    fontSize: 15
  },
  margin: {
    margin: theme.spacing.unit
  }
});

class OnBoardingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      join: false,
      create: true,
      numberOfParticipants: 0
    };
  }
  handleClick = (a, b) => {
    this.setState({ [a]: true, [b]: false });
  };

  handleNumberOfParticipants = num => {
    this.setState({
      numberOfParticipants: Number.parseInt(num)
    });
  };
  render() {
    const { classes } = this.props;
    const { join, create, numberOfParticipants } = this.state;

    return (
      <div>
        <Container align="center">
          <Row>
            <Col>
              <SimpleCard>
                <div>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => this.handleClick('join', 'create')}
                  >
                    Join a Group
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    onClick={() => this.handleClick('create', 'join')}
                  >
                    Create a Group
                  </Button>

                  {create && (
                    <div>
                      <Divider style={{ margin: 20 }} />
                      <StepperOnBoard
                        numberOfParticipants={numberOfParticipants}
                        handleNumberOfParticipants={
                          this.handleNumberOfParticipants
                        }
                      />
                    </div>
                  )}

                  {join && (
                    <div>
                      <JoinGroup />
                    </div>
                  )}
                </div>
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(OnBoardingView);
