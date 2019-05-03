//@ts-check
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { Container, Row, Col } from 'react-grid-system';
import SimpleCard from '../SimpleCard';
import { withAuth } from '../../Context';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 80
  }
});

class Auth extends Component {
  render() {
    if (this.props.token) {
      return <Redirect to={ROUTES.onboarding} />;
    }
    return (
      <main>
        <Container>
          <Row style={{ justifyContent: 'center' }}>
            <Col xs={10} sm={8} md={6} lg={5}>
              <SimpleCard
                title={this.props.title}
                titleColor={this.props.titleColor}
              >
                {this.props.children}
              </SimpleCard>
            </Col>
          </Row>
        </Container>
      </main>
    );
  }
}

export default withAuth(Auth);
