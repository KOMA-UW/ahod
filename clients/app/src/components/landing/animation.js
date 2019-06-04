import React, { Component } from "react";
import SvgLines from "react-mt-svg-lines";
import SvgSignature from "./svgFont";

// The component which handles the animation in the navbar, the top left corner
export class Animation extends React.Component {
  render() {
    return (
      <div>
        {
          <SvgLines
            animate={true}
            duration={2000}
            stagger={100}
            timing="ease-in-out"
            fade={true}
          >
            <SvgSignature />
          </SvgLines>
        }
      </div>
    );
  }
}
