import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../Context';
import Typography from '@material-ui/core/Typography';
import { Container, Row, Col } from 'react-grid-system';

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon
} from 'react-share';
import logo from '../img/ischool_log.png';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  },
  label: {
    textTransform: 'capitalize'
  },
  footers: {
    background: '#37517e',
    height: '200px',
    position: 'fixed',
    bottom: 0,
    left: 0,
    marginBottom: 0,
    width: '100%',
    color: '#FFF',
    padding: 15
    // paddingTop: theme.spacing.unit * 2,
    // paddingBottom: theme.spacing.unit * 2
  },
  footer: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.text,
    marginTop: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 6}px 0`
  },
  footerShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    padding: `${theme.spacing.unit * 6}px 0`
  },
  marginLeft: {
    marginLeft: theme.spacing.unit * 7 + 10
  }
});

const Footer = props => {
  const { classes } = props;
  const footerStyle = props.drawerOpen
    ? [classes.footerShift, classes.footer].join(' ')
    : props.iconSpace
    ? [classes.footer, classes.marginLeft].join(' ')
    : classes.footer;
  return (
    <footer className={footerStyle}>
      <Container fluid>
        <Row>
          <Col sm={3} className="Clique">
            <Typography variant="h4" color="inherit">
              CLIQUE
            </Typography>
          </Col>

          <Col sm={3} className="Contact">
            <Typography variant="h6" color="inherit">
              Contact
            </Typography>
            <Row>
              <FacebookShareButton url="">
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url="">
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <EmailShareButton url="">
                <EmailIcon size={32} round />
              </EmailShareButton>
            </Row>
          </Col>

          <Col sm={3} className="Legal">
            <Typography color="inherit" variant="h6">
              Legal
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              T&C
            </Typography>
            <Typography color="inherit" variant="subtitle1">
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
