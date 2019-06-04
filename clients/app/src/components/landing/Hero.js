import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../img/here_friends.jpeg";
import { Button, Typography } from "@material-ui/core";
import { withStyles, withTheme } from "@material-ui/core/styles";
import { ROUTES } from "../../constants";
import { Animation } from "./animation";

const styles = theme => ({
  root: {
    height: "100vh",
    background: theme.palette.primary.dark,
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative"
  },
  center: {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  textContainer: {
    color: "white"
  },
  text: {
    padding: 5
  },
  button: {
    margin: 20
  }
});

class Hero extends React.Component {
  render() {
    const GetStartedLink = props => <Link to={ROUTES.signUp} {...props} />;

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.center}>
          <div className={classes.textContainer}>
            {/*             <Typography className={classes.text} color="inherit" variant="h3">
              Clique
            </Typography> */}
            <Animation />
            <Typography className={classes.text} color="inherit" variant="h5">
              Pay. Borrow. Save.
            </Typography>
            <Typography
              className={classes.text}
              color="inherit"
              variant="body2"
            >
              A community-based financial system where students help one another
              to pay off student debt
            </Typography>
          </div>

          <Button
            className={classes.button}
            variant="contained"
            component={GetStartedLink}
          >
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(Hero);
