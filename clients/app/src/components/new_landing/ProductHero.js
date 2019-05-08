import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ProductHeroLayout from "./ProductHeroLayout";

const backgroundImage = "https://source.unsplash.com/PGnqT0rXWLs/1600x900";

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: "#7fc7d9", // Average color of the background image.
    backgroundPosition: "center"
  },
  button: {
    minWidth: 200
  },
  h5: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 4,
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing.unit * 10
    }
  },
  more: {
    marginTop: theme.spacing.unit * 2
  }
});

function ProductHero(props) {
  const { classes } = props;

  return (
    <ProductHeroLayout backgroundClassName={classes.background}>
      <img style={{ display: "none" }} src={backgroundImage} alt="" />
      <Typography color="inherit" align="center" variant="h2" marked="center">
        Clique
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        className={classes.h5}
      >
        Pay. Borrow. Save.
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        className={classes.button}
        component={linkProps => (
          <Link
            {...linkProps}
            href="/premium-themes/onepirate/sign-up"
            variant="button"
          />
        )}
      >
        Register
      </Button>
      <Typography variant="body2" color="inherit" className={classes.more}>
        Start saving today!
      </Typography>
    </ProductHeroLayout>
  );
}

ProductHero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProductHero);
