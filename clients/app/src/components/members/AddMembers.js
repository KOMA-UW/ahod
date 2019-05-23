import React, { Component } from 'react';
import AddMemberForm from './AddMemberForm';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class AddMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: Array.from({ length: this.props.numberOfParticipants }, () => 0)
    };
  }

  addMember = member => {
    if (member) {
      this.setState(prevState => {
        const members = [...prevState.members, member];
        return {
          members
        };
      });
    }
  };

  handleEmailAdd = member => {
    this.addMember(member);
  };

  render() {
    return (
      <div>
        {this.state.members.map((member, index) => (
          <AddMemberForm key={index} index={index} />
        ))}

        <Fab
          size="small"
          color="primary"
          aria-label="Add"
          onClick={this.handleEmailAdd}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default AddMembers;
