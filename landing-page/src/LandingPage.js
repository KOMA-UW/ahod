import React from 'react';
// import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import './index.css';
// import {Card, CardTitle, Row, Col, Navbar, NavItem, CardPanel} from 'react-materialize';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.danger,  
  }
});

function LandingPage(props) {
  const classes = props;
      return (
        <div className={classes.root}>
          <nav>
          <div className="nav-wrapper">
            <h2 className="title">Grow Your Dough, GYD</h2>
          </div>
        </nav>
        <div className="container">
          <section>
            <div>
              <h2 className="titles">What is this?</h2>
              <div className="content">
                <p>Content goes here..</p>
              </div>
            </div>
          </section>
  
          <section> 
            
            <div className="titles">
              <h2>Meet the Team</h2>
            </div>
            <div className="row">
              <div className="col-lg-2">
                <img className="bd-placeholder-img rounded-circle" alt="" src="https://www.gravatar.com/avatar/329c17c44c22a447870f4a44dc058b4d?s=1000" width="100" height="100" focusable="false" role="img" aria-label="Placeholder: 140x140"/><title>Placeholder</title>
                <h4>Kidus Sendeke</h4>
                <p>Senior, Informatics</p>
                <a href="mailto:kiduss@uw.edu">kiduss@uw.edu</a><br/>
                <a href="https://www.linkedin.com/in/kidus-sendeke/"><i className="fab fa-linkedin"></i></a>
              </div>
              <div className="col-lg-2">
                <img className="bd-placeholder-img rounded-circle" alt="" src="https://www.gravatar.com/avatar/50afbe369dcb2cd4ff4dee5c5e2efca1?s=1000" width="100" height="100" role="img" aria-label="Placeholder: 140x140"/><title>Placeholder</title>
                <h4>Omar Azeemi</h4>
                <p>Senior, Informatics</p>
                <a href="mailto:oazeemi@gmail.com">oazeemi@gmail.com</a><br/>   
                <a href="https://www.linkedin.com/in/omar-azeemi/"><i className="fab fa-linkedin"></i></a>
              
              </div>
              <div className="col-lg-2">
                <img className="bd-placeholder-img rounded-circle" alt="" src="https://www.gravatar.com/avatar/e2de7dff621ccfad3a32c5112984583d?s=1000" width="100" height="100" role="img" aria-label="Placeholder: 140x140"/><title>Placeholder</title>
                <h4>Muatasim Qazi</h4>
                <p>Senior, Informatics</p>
                <a href="mailto:mqazi@uw.edu">mqazi@uw.edu</a><br/>
                <a href="https://www.linkedin.com/in/muatasimqazi/"><i className="fab fa-linkedin"></i></a>
          
              </div>
              <div className="col-lg-2">
                <img className="bd-placeholder-img rounded-circle" alt="" src="https://www.gravatar.com/avatar/3e705eefc666716240cbaa8d57dcd8a1?s=1000" width="100" height="100" role="img" aria-label="Placeholder: 140x140"/><title>Placeholder</title>
                <h4>Alexis Lim</h4>
                <p>Senior, Informatics</p>
                <a href="mailto:alexisl@uw.edu">alexisl@uw.edu</a><br/>
                <a href="https://www.linkedin.com/in/calexlim/"><i className="fab fa-linkedin"></i></a>
              </div>
               </div>
            </section>


          <section>
            <div>
              <h2 className="titles">Contacts</h2>
              <div className="content">
                <p>Content goes here..</p>
              </div>
            </div>
          </section>

          <section>   
          <h2 className="titles">Sponsors</h2>      
            <div className="content">
            <div>
              <img className="uw_logo"  alt="uw" src="https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/98/2014/10/07214216/Signature_Left_Purple_RGB.png"/>
           </div>
           <div>
              <img className="ischool_logo"  alt="ischool"  src="./assets/iSchoolPrimary_RGB_Purple.jpg"/>
              <img className="ischool_logo"  alt="ischool"  src="./assets/Logo_UW_.jpg"/>
            </div>
            </div>
          </section>
          
            <footer className="page-footer fixed-bottom font-small bg-dark">  
              <div className="footer-copyright text-center py-3">© 2019 Copyright  
                <a href="https://github.com/orgs/KOMA-UW/dashboard"> KOMA Inc.</a>
              </div>
          </footer>
        </div>
</div>
  );
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
