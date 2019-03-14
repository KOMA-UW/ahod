import React, { Component } from "react";

import SimpleCard from "../SimpleCard";
import AddMemberForm from "./AddMemberForm";
const members = [1, 2, 3, 4, 5];

class AddMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: []
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

  render() {
    return (
      <div>
        {members.map((member, index) => (
          <AddMemberForm key={index} index={index} addMember={this.addMember} />
        ))}
      </div>
    );
  }
}

export default AddMembers;
