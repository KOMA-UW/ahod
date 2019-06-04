import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import LayoutBody from "./LayoutBody";
import Typography from "@material-ui/core/Typography";
import logo from "../../img/CliqueLogo.png";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/src/styles/styles.scss";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
  const [open, setOpen] = React.useState(false);
  const { classes } = props;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <LayoutBody className={classes.root} component="section">
      <AwesomeButton
        type="primary"
        className={classes.button}
        ripple
        size="large"
        onPress={handleClickOpen}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contact Us!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let us know your concern and we will try to get to you as soon as
            possible.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Content"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </LayoutBody>
  );
}

Questions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Questions);
