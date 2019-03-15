import React, { Component } from "react";
import SimpleCard from "../SimpleCard";
import { Avatar } from "@material-ui/core";

const styles = {
  container: {
    display: "flex"
  },
  avatar: {
    marginLeft: "auto",
    width: 60,
    height: 60
  },
  padding: {
    padding: "0px !important",
    margin: 0
  }
};
class Feed extends Component {
  render() {
    return (
      <div>
        <SimpleCard style={styles.padding}>
          <p style={styles.padding}>
            {this.props.author} <small> —— {this.props.time}</small>
          </p>
          <div style={styles.container}>
            <h3 style={styles.padding}>{this.props.title}</h3>
            <Avatar style={styles.avatar} src={this.props.authorImg} />
          </div>
          <p style={styles.padding}>{this.props.description}</p>
        </SimpleCard>
      </div>
    );
  }
}

export default Feed;
