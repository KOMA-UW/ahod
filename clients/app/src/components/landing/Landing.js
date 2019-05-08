import React from "react";
import { withAuth } from "../../Context";
import { Row, Col } from "react-grid-system";
import Questions from "../new_landing/Questions";
import ProductHero from "../new_landing/ProductHero";
import History from "../new_landing/History";
import Steps from "../new_landing/Steps";
import Testimonials from "../new_landing/Testimonials";
import HomePage from "../new_landing/MainPage";
import withRoot from "../new_landing/withRoot";

const Landing = props => {
  return (
    <div>
      <ProductHero />
      <History />
      <Steps />
      <Testimonials />
      <Questions />
    </div>
  );
};

export default withRoot(Landing);
