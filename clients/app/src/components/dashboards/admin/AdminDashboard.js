import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withAuth } from '../../../Context';
import CardHeading from '../CardHeading';
import MembersList from '../../members/MembersList';
import CenteredLeftPadding from '../../CenteredLeftPadding';
import AddMember from './AddMember';
import NextCycle from '../GroupView/NextCycle';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../../SimpleCard';
import CardPairs from '../GroupView/CardPairs';
import Draw from './Draw';
import DrawPanel from './DrawPanel';

const styles = theme => ({
  root: {
    marginTop: 100
  }
});
class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMemberAdd: false,
      showDraw: false
    };
  }

  handleMemberAdd = () => {
    this.setState({ showMemberAdd: true });
  };

  handleDraw = () => {
    this.setState({ showDraw: true });
  };

  render() {
    const { classes, drawerOpen } = this.props;
    const { showMemberAdd, showDraw } = this.state;
    const AddMemberLink = props => <Link to="/add-member" {...props} />;
    // const JoinGroupLink = props => <Link to="/joingroup" {...props} />;

    return (
      <CenteredLeftPadding drawerOpen={drawerOpen}>
        <CardHeading
          title="Participants: 6"
          btnText="Add Member"
          subTitle="Group ID: 2592952"
          extraInfo="Location: Seattle, WA"
          showNeWComponent={this.handleMemberAdd}
        />
        {showMemberAdd && <AddMember />}
        {/* <NextCycle /> add a draw feature */}
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <CardPairs>
              <Draw handleDraw={this.handleDraw} showDraw={showDraw} />
            </CardPairs>
            {showDraw && <DrawPanel />}
            <CardHeading title="Your Clique" subTitle="" />
          </Col>
        </Row>

        <MembersList />
      </CenteredLeftPadding>
    );
  }
}
AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withAuth(withStyles(styles)(AdminDashboard));
