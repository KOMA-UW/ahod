import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import AddMemberForm from './AddMemberForm';
import { Container, Row, Col } from 'react-grid-system';

class AddMemberDialog extends React.Component {
  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Container fluid>
          <Row>
            <Col sm={12}>
              <Dialog
                fullWidth
                fullScreen={fullScreen}
                open={this.props.open}
                onClose={this.props.handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  Add a Maember
                </DialogTitle>
                <DialogContent>
                  <DialogContentText />
                  <AddMemberForm />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.props.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={this.props.handleClose}
                    color="primary"
                    autoFocus
                  >
                    Save
                  </Button>
                </DialogActions>
              </Dialog>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

AddMemberDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export default withMobileDialog()(AddMemberDialog);
