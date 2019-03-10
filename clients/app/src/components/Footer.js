import React from "react";

const styles = {
  background: "#000",
  height: "200px",
  position: "absolute",
  bottom: 0,
  width: "100%",
  color: "#fff",
  textAlign: "center"
};
const Footer = ({ props }) => {
  return (
    <div style={styles}>
      <h1>AHOD</h1>
    </div>
  );
};

export default Footer;
