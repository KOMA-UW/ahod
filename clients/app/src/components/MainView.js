import React from "react";
import { withAuth } from "../Context";
import Loader from "./Loader";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
  render() {
    const { loading } = this.state;
    return <div>{loading ? <Loader /> : ""}</div>;
  }
}

export default withAuth(MainView);
