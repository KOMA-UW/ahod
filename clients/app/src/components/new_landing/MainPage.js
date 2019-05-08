import withRoot from "../new_landing/withRoot";
import React from "react";
import ProductCategories from "./Testimonials";
import Questions from "./Questions";
import ProductHero from "../new_landing/ProductHero";
import History from "./History";
import Steps from "./Steps";
import Testimonials from "./Testimonials";

function MainPage() {
  return (
    <React.Fragment>
      <ProductHero />
      <History />
      <Steps />
      <Testimonials />
      <Questions />
    </React.Fragment>
  );
}

export default withRoot(MainPage);
