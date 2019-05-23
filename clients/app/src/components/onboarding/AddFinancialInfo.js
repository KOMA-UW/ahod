import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },

  textField: {
    flexBasis: 200
  }
});

class AddFinancialInfo extends Component {
  state = {
    name: '',
    numberOfParticipants: '',
    multiline: ''
  };

  handleChange = name => event => {
    if (name === 'numberOfParticipants') {
      this.props.handleNumberOfParticipants(event.target.value);
    }

    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Container>
          <Row justify="center">
            <Col sm={6}>
              <form>
                <FormControl fullWidth className={classes.margin}>
                  <InputLabel htmlFor="adornment-amount">
                    Group Capital
                  </InputLabel>
                  <Input
                    id="adornment-amount"
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
                <br />
                <FormControl fullWidth className={classes.margin}>
                  <InputLabel htmlFor="adornment-amount">
                    Individual Contribution/Month
                  </InputLabel>
                  <Input
                    id="adornment-amount"
                    value={this.state.amount}
                    onChange={this.handleChange('amount')}
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </FormControl>
              </form>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(AddFinancialInfo);
