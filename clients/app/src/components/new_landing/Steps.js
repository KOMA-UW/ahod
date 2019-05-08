import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import LayoutBody from "./LayoutBody";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
                  src="https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80"
                  alt="suitcase"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <img
                  src="https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80"
                  alt="graph"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  Ac turpis egestas integer eget aliquet nibh praesent tristique
                  magna. Gravida arcu ac tortor dignissim.
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <img
                  src="https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400&q=80"
                  alt="clock"
                  className={classes.image}
                />
                <Typography variant="h5" align="center">
                  {"Sit amet tellus cras adipiscing enim eu turpis egestas. "}
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
