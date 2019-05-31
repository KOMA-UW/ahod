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
const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});
class CreateGroup extends Component {
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
      <Container>
        <Row justify="center">
          <Col sm={6}>
            <form>
              <TextField
                id="standard-uncontrolled"
                label="Name"
                margin="normal"
                fullWidth
                variant="outlined"
                value={this.state.name}
                onChange={this.handleChange('name')}
              />

              <FormControlLabel
                value="Image"
                control={
                  <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                  >
                    Upload
                    <CloudUploadIcon className={classes.rightIcon} />
                  </Button>
                }
                label="Image"
                labelPlacement="start"
              />

              <TextField
                id="standard-uncontrolled"
                label="Description"
                margin="normal"
                fullWidth
                variant="outlined"
                multiline={true}
                rows={2}
                rowsMax={6}
              />

              <TextField
                id="standard-uncontrolled"
                label="Location"
                margin="normal"
                fullWidth
                variant="outlined"
              />
              <TextField
                id="outlined-number"
                label="Number of Participants"
                value={this.state.numberOfParticipants}
                onChange={this.handleChange('numberOfParticipants')}
                type="number"
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withStyles(styles)(CreateGroup);
