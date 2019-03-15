import React, { Component } from "react";
import SimpleCard from "../SimpleCard";

class ViewGroup extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <SimpleCard title="Group 1">
          <h1>Welcome to your group</h1>
        </SimpleCard>
      </div>
    );
  }
}

export default ViewGroup;
