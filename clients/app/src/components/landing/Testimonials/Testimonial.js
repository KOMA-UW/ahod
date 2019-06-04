import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Testimonial extends Component {
  render() {
    const { name, text } = this.props.user;
    return (
      <div>
        <Typography variant="h5">{name}</Typography>
        <Typography variant="h6">{text}</Typography>
      </div>
    );
  }
}

export default Testimonial;
