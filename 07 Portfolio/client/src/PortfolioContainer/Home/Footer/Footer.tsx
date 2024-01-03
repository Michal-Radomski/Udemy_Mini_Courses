import React from "react";

import "./Footer.scss";

export default function Footer(): JSX.Element {
  return (
    <React.Fragment>
      <div className="footer-container">
        <div className="footer-parent">
          {/* //* Can be import img from ... */}
          <img src={require("../../../assets/Home/shape-bg.png")} alt="Problem loading file" />
        </div>
      </div>
    </React.Fragment>
  );
}
