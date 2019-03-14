import React from "react";
import { withAuth } from "../../Context";
import { Row, Col } from "react-grid-system";
import Hero from "./Hero";
import Steps from "./Steps";
import Testimonials from "./Testimonials";
import StepExplain from "./StepExplain";
const Landing = props => {
  return (
    <div>
      <Hero />
      <Steps />
      <Testimonials />
      <StepExplain />
    </div>
  );
};

export default withAuth(Landing);
