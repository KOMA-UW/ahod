import React, { Component } from 'react';
import SimpleCard from '../../SimpleCard';
import { withStyles, Button, TextField } from '@material-ui/core/';

const styles = theme => ({
  btnContainer: {
    display: 'flex'
  },
  button: {
    marginLeft: 'auto',
    marginTop: 10,
    margin: 20
  }
});
class Plea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plea: ''
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <SimpleCard title="Make a request">
          <p>Make a request to get paid this month!</p>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="standard-full-width"
              label="Request"
              style={{ margin: 8 }}
              placeholder="Enter your plea here!"
              fullWidth
              margin="normal"
              value={this.state.plea}
              onChange={this.handleChange}
              InputLabelProps={{
                shrink: true
              }}
            />
            <div className={classes.btnContainer}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </SimpleCard>
      </div>
    );
  }
}

export default withStyles(styles)(Plea);
