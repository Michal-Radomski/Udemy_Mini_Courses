import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import PortfolioContainer from "./PortfolioContainer/PortfolioContainer";

function App(): JSX.Element {
  return (
    <React.Fragment>
      <PortfolioContainer />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
