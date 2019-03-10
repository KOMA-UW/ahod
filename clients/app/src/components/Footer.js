import React from "react";
import Grid from "@material-ui/core/Grid";
import { withTheme } from "@material-ui/core/styles";

const Footer = props => {
  const { theme } = props;
  const primaryColor = theme.palette.primary.dark;

  const styles = {
    background: primaryColor,
    height: "200px",
    position: "absolute",
    bottom: 0,
    width: "100%",
    color: "#fff",
    textAlign: "center"
  };

  return (
    <Grid style={styles}>
      <footer>
        <div className="container">
          <div className="columns">
            <div className="column Clique">
              <h1> CLIQUE </h1>
            </div>

            <div className="column Contact" />

            <div className="column Legal" />

            <div className="column iSchool" />
          </div>
        </div>
      </footer>
    </Grid>
  );
};

export default withTheme()(Footer);
