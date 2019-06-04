import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import LayoutBody from "./LayoutBody";
import Typography from "@material-ui/core/Typography";
import logo from "../../img/CliqueLogo.png";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/src/styles/styles.scss";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(1) * 9,
    marginBottom: theme.spacing(1) * 9
  },
  button: {
    height: "100px",
    width: "500px"
  },
  link: {
    marginTop: theme.spacing(1) * 3,
    marginBottom: theme.spacing(1) * 3
  },
  buoy: {
    width: 60
  }
});

function Questions(props) {
  const { classes } = props;

  return (
    <LayoutBody className={classes.root} component="section">
      <AwesomeButton
        type="primary"
        className={classes.button}
        ripple
        size="large"
      >
        <Typography variant="h6" className={classes.link}>
          Got questions? Let us know!
        </Typography>
      </AwesomeButton>
      <Typography variant="subtitle1" className={classes.link}>
        We are here to help. Get in touch!
      </Typography>
      <img
        src={logo}
        className={classes.logo}
        alt="buoy"
        style={{ height: 100 }}
      />
    </LayoutBody>
  );
}

Questions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Questions);
