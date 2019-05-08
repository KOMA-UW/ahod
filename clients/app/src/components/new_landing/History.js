import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import LayoutBody from "./LayoutBody";
import Typography from "@material-ui/core/Typography";
import fastForward from "../../img/fast-forward.png";
import loan from "../../img/debt.png";
import friend from "../../img/friendship.png";

const styles = theme => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: theme.palette.secondary.light
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 15,
    marginBottom: theme.spacing.unit * 30,
    display: "flex",
    position: "relative"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `0px ${theme.spacing.unit * 5}px`
  },
  image: {
    height: 55
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180
  }
});

function History(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <LayoutBody className={classes.layoutBody} width="large">
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Why use Clique?
        </Typography>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img className={classes.image} src={loan} alt="debt" />
              <Typography variant="h5" className={classes.title}>
                Securely send money
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img className={classes.image} src={fastForward} alt="faster" />
              <Typography variant="h5" className={classes.title}>
                Pay off loans faster
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              <img className={classes.image} src={friend} alt="clock" />
              <Typography variant="h5" className={classes.title}>
                Mutually support your friends, no matter the distance
              </Typography>
            </div>
          </Grid>
        </Grid>
      </LayoutBody>
    </section>
  );
}

History.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(History);
