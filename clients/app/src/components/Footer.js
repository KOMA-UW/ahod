import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { withAuth } from "../Context";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-grid-system";
import LogoSVG from "./LogoSVG";
import logo from "../img/ischool_log.png";
import { AwesomeButtonSocial } from "react-awesome-button";
import "react-awesome-button/src/styles/styles.scss";

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";

const black = "#000";
// const logoClass = css`
//   height: 24px;
//   width: 24px;

//   @media (min-width: 800px) {
//     height: 48px;
//     width: 48px;
//   }
// `;

const drawerWidth = 240;

const styles = theme => ({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
  },
  label: {
    textTransform: "capitalize"
  },
  footers: {
    background: "#37517e",
    height: "200px",
    position: "fixed",
    bottom: 0,
    left: 0,
    marginBottom: 0,
    width: "100%",
    color: "#FFF",
    padding: 15
    // paddingTop: theme.spacing(1) * 2,
    // paddingBottom: theme.spacing(1) * 2
  },
  footer: {
    backgroundColor: theme.palette.dark.main,
    color: theme.palette.primary.text,
    marginTop: theme.spacing(1) * 8,
    padding: `${theme.spacing(1) * 6}px 0`
  },
  logo: {
    height: 24,
    width: 24
  },
  flexContainer: {
    display: "flex"
  },
  social: {
    paddingLeft: 10
  },
  button: {
    height: "30px",
    width: "10px",
    paddingRight: 30
  }
});

const Footer = props => {
  const { classes } = props;
  const footerStyle = classes.footer;
  return (
    <footer className={footerStyle}>
      <Container>
        <Row>
          <Col sm={3} className="Clique">
            {/* <LogoSVG fill={black} className={classes.logo} /> */}
            <Typography variant="h5" color="inherit">
              CLIQUE
            </Typography>
          </Col>

          <Col sm={3} className="Contact">
            <Typography variant="body1" color="inherit">
              Contact
            </Typography>

            <div>
              <div className={classes.flexContainer}>
                <AwesomeButtonSocial
                  type="facebook"
                  size="icon"
                  className={classes.button}
                />
                <Typography
                  variant="body2"
                  color="inherit"
                  style={{ color: "#697A89" }}
                  className={classes.social}
                >
                  Facebook
                </Typography>
              </div>
            </div>
            <div>
              <div className={classes.flexContainer}>
                <AwesomeButtonSocial
                  type="twitter"
                  size="icon"
                  className={classes.button}
                />
                <Typography
                  variant="body2"
                  color="inherit"
                  style={{ color: "#697A89" }}
                  className={classes.social}
                >
                  Twitter
                </Typography>
              </div>
            </div>
            <div>
              <div className={classes.flexContainer}>
                <AwesomeButtonSocial
                  type="gplus"
                  size="icon"
                  className={classes.button}
                />
                <Typography
                  variant="body2"
                  color="inherit"
                  style={{ color: "#697A89" }}
                  className={classes.social}
                >
                  Email
                </Typography>
              </div>
            </div>
          </Col>

          <Col sm={3} className="Legal">
            <Typography color="inherit" variant="body1">
              Legal
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              style={{ color: "#697A89" }}
            >
              T&C
            </Typography>
            <Typography
              color="inherit"
              variant="body2"
              style={{ color: "#697A89" }}
            >
              Privacy
            </Typography>
          </Col>

          <Col sm={3} className="iSchool">
            <img
              src={logo}
              vspace="10"
              width="250"
              height="50"
              alt="Informatics Logo"
            />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAuth(withStyles(styles)(Footer));
