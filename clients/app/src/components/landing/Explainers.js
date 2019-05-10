import React from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import { Container, Row, Col } from 'react-grid-system';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  root: {
    display: 'flex',
    padding: 20
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    padding: `0px ${theme.spacing.unit * 5}px`
  },
  image: {
    height: 80
  },
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  },
  number: {
    widht: 2,
    margin: 20
  }
});
class Explainers extends React.Component {
  render() {
    const { classes, title, items, background, iconClass } = this.props;

    const itmesElems = items.map((item, index) => {
      let component = (
        <Col key={index} className={classes.item} xs={12} sm={6} md={3} lg={3}>
          {item.number && (
            <Avatar className={classes.number}>{item.number}</Avatar>
          )}
          <img
            className={iconClass || classes.image}
            src={item.icon}
            alt={item.alt}
          />
          <Typography variant="body1" className={classes.title}>
            {item.text}
          </Typography>
        </Col>
      );
      return component;
    });
    return (
      <section className={classNames(classes.root, this.props.background)}>
        <Container>
          <Row>
            <Col>
              <Typography
                variant="h4"
                align="center"
                className={classes.title}
                component="h2"
              >
                {this.props.title}
              </Typography>
            </Col>
          </Row>
          <Row justify={'center'}>
            {itmesElems}
            {this.props.children}
          </Row>
        </Container>
      </section>
    );
  }
}

export default withStyles(styles)(Explainers);
