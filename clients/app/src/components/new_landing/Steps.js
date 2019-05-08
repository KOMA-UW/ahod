import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LayoutBody from "./LayoutBody";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Group from "../../img/team.png";
import Saving from "../../img/piggy-bank.png";
import Win from "../../img/team-leader.png";

const styles = theme => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.primary,
    overflow: "hidden"
  },
  layoutBody: {
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 15,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `0px ${theme.spacing.unit * 5}px`
  },
  title: {
    marginBottom: theme.spacing.unit * 14
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium
  },
  image: {
    height: 55,
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.7
  },
  button: {
    marginTop: theme.spacing.unit * 8
  }
});

function Steps(props) {
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
          How it works
        </Typography>
        <div>
          <Grid container spacing={40}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <img
                  src={Group}
                  alt="Create a group"
                  className={classes.image}
                  style={{ height: 100 }}
                />
                <Typography variant="h5" align="center">
                  Create a group with your close friends and family that will
                  accompany you on this financialy journey.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src={Saving}
                  alt="Give money to the pool"
                  className={classes.image}
                  style={{ height: 100 }}
                />
                <Typography variant="h5" align="center">
                  Pay your share, every month, of the total money pool, helping
                  your friends and family.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src={Win}
                  alt="Win sharings"
                  className={classes.image}
                  style={{ height: 100 }}
                />
                <Typography variant="h5" align="center">
                  {"Collect your share of the circle, and repeat!"}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component={linkProps => (
            <Link
              {...linkProps}
              href="/premium-themes/onepirate/sign-up"
              variant="button"
            />
          )}
        >
          Get started
        </Button>
      </LayoutBody>
    </section>
  );
}

Steps.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Steps);
