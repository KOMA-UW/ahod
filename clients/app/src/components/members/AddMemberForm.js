import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
class AddMemberForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleChange = event => {
    this.setState({
      email: event.target.value
    });
    // this.props.addMember(this.state.email);
  };

  render() {
    return (
      <TextField
        id="standard-full-width"
        label={`Member ${this.props.index + 1}`}
        style={{ margin: 8 }}
        placeholder="Member Email"
        fullWidth
        margin="normal"
        value={this.state.email}
        onChange={this.handleChange}
        InputLabelProps={{
          shrink: true
        }}
      />
    );
  }
}

export default AddMemberForm;
