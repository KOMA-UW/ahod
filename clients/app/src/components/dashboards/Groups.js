import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GroupCard from "./GroupCard";
import { Container, Row, Col } from "react-grid-system";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import group_1 from "../../img/group_1.jpg";

const styles = theme => ({
  root: {
    marginTop: 40
  },
  card: {
    margin: 20
  },
  a: {
    textDecoration: "none",
    color: "inherent"
  },
  btnContainer: {
    display: "flex",
    justifyContent: "space-between"
  },
  button: {
    margin: theme.spacing.unit
  },
  editBtn: {
    marginLeft: "auto"
  }
});
const groups = [1, 2, 3, 4];
const Groups = props => {
  const { classes, isAdmin } = props;
  return (
    <Container className={classes.root}>
      <Row>
        {groups.map((group, index) => (
          <Col key={index} sm={4} style={{ marginBottom: 25 }}>
            <GroupCard
              title={`Group ${index + 1}`}
              image={group_1}
              adminAvatar={"https://material-ui.com/static/images/avatar/2.jpg"}
              className={classes.card}
              dateCreated={`Member since: Sep. 10, 2018`}
              id={index + 1}
              isAdmin={isAdmin}
              handleEdit={props.handleEdit}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

Groups.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Groups);
