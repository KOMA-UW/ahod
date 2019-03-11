import React from "react";
import Grid from "@material-ui/core/Grid";
import { withTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container, Row, Col } from "react-grid-system";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from "react-share";
import logo from "../img/ischool_log.png";

const Footer = props => {
  const { theme } = props;
  const primaryColor = theme.palette.primary.dark;

  const styles = {
    background: primaryColor,
    textColor: "white",
    height: "200px",
    position: "fixed",
    bottom: 0,
    left: 0,
    color: "white",
    marginBottom: 0,
    width: "100%",
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  };

  return (
    <Container fluid style={styles}>
      <Row>
        <Col sm={3} className="Clique">
          <Typography variant="h4"> Clique </Typography>{" "}
        </Col>

        <Col sm={3} className="Contact">
          <Typography variant="h6"> Contact </Typography>{" "}
          <Row>
            <FacebookShareButton>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <EmailShareButton>
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Row>
        </Col>

        <Col sm={3} className="Legal">
          <Typography variant="h6"> Legal </Typography>{" "}
          <Typography variant="subtitle1"> T&C </Typography>
          <Typography variant="subtitle1"> Privacy </Typography>
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
      </Row>{" "}
    </Container>
  );
};

export default withTheme()(Footer);
