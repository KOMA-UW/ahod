import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};
const Loader = () => {
  return (
    <div style={styles.loader}>
      <CircularProgress disableShrink size={80} />
    </div>
  );
};

export default Loader;
