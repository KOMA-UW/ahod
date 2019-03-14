import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";
import { green700, amber300 } from "@material-ui/core/colors";
import blue from "@material-ui/core/colors/blue";
import account from "../../img/account.svg";
import group from "../../img/group.svg";
import payment from "../../img/payment.svg";
import money from "../../img/money.svg";
import { withTheme } from "@material-ui/core/styles";

const icons = [
  {
    image: account,
    title: "Register",
    desc: "Create an account"
  },
  {
    image: group,
    title: "Create/Join a Group",
    desc: "Some description"
  },
  {
    image: payment,
    title: "Make Payments",
    desc: "Some description"
  },
  {
    image: money,
    title: "Win the Prize",
    desc: "Some description"
  }
];

const styles = theme => ({
  root: {
    height: 1
  }
});

class Hero extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };
  render() {
    const slideBackground = this.props.theme.palette.primary.light;
    const descBackground = this.props.theme.palette.primary.dark;
    console.log(slideBackground);
    return (
      <AutoRotatingCarousel
        label="Get Started"
        open
        mobile
        interval={5000}
        onStart={() => this.context.router.history.push(`/signup`)}
        style={{ position: "relative", top: -60, zIndex: 99 }}
      >
        {icons.map((item, index) => (
          <Slide
            key={index}
            media={<img src={item.image} alt={item.title} />}
            mediaBackgroundStyle={{
              background: slideBackground,
              backgroundImage: `linear-gradient(to top, ${green700} 10%, ${amber300} 140%)`
            }}
            contentStyle={{ backgroundColor: slideBackground }}
            title={item.title}
            subtitle={item.desc}
            style={{ background: descBackground }}
          />
        ))}
      </AutoRotatingCarousel>
    );
  }
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTheme()(withStyles(styles)(Hero));
