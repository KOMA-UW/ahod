import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CreateGroup from './CreateGroup';
import AddMembers from '../members/AddMembers';
import FinalizeGroupCreation from './FinalizeGroupCreation';
import AddFinancialInfo from './AddFinancialInfo';
import { Container, Row, Col } from 'react-grid-system';

const styles = theme => ({
  root: {
    marginTop: 100
  },
  button: {
    marginTop: 20,
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

function getSteps() {
  return ['Select a group name', 'Add Members', 'Add Financial Info', 'Submit'];
}

function getStepContent(step, props) {
  console.log(props);
  switch (step) {
    case 0:
      return (
        <CreateGroup
          handleNumberOfParticipants={props.handleNumberOfParticipants}
        />
      );
    case 1:
      return <AddMembers numberOfParticipants={props.numberOfParticipants} />;
    case 2:
      return <AddFinancialInfo />;
    case 3:
      return <FinalizeGroupCreation />;
    default:
      return 'Unknown step';
  }
}

class StepperOnBoard extends React.Component {
  state = {
    activeStep: 0,
    skipped: new Set()
  };

  // isStepOptional = step => step === 1;

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Container>
          <Row>
            <Col>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const props = {};
                  const labelProps = {};
                  // if (this.isStepOptional(index)) {
                  //   labelProps.optional = (
                  //     <Typography variant="caption">Optional</Typography>
                  //   );
                  // }
                  if (this.isStepSkipped(index)) {
                    props.completed = false;
                  }
                  return (
                    <Step key={label} {...props}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      component={Link}
                      to="/dashboard"
                      className={classes.button}
                    >
                      Go to Admin Dashboard
                    </Button>
                  </div>
                ) : (
                  <div>
                    {getStepContent(activeStep, this.props)}
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      {/* {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )} */}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

StepperOnBoard.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(StepperOnBoard);
